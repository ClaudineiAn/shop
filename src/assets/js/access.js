import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ethers } from 'ethers';
import { makeLog, inputEffect } from '../main.js';
import abi from './abi.json';

export const setusernameError = (v, setError) => {
  setError(v);
};

export const validateUsername = (username, setError) => {
  if (!username) {
    setusernameError('Required.', setError);
  } else if (username.length > 50) {
    setusernameError('Max 50 characters.', setError);
  } else {
    setusernameError('', setError);
  }
};

const checkContractDeployment = async (provider, address) => {
  const code = await provider.getCode(address);
  return code !== '0x';
};

// Define available networks
const networks = [
  {
    chainId: '0xa869', // Avalanche Fuji C-Chain
    chainName: 'Avalanche Fuji C-Chain',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://testnet.snowtrace.io'
  },
  {
    chainId: '0x5', // Goerli Testnet (as an example)
    chainName: 'Goerli Testnet',
    rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    blockExplorerUrl: 'https://goerli.etherscan.io'
  },
  // Add more networks as needed
];

// Function to switch to a network
const switchToNetwork = async (network) => {
  try {
    console.log(`Attempting to switch to ${network.chainName}...`);
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }],
    });
    console.log(`Switched to ${network.chainName} successfully.`);
    return true;
  } catch (switchError) {
    console.error(`Error switching to ${network.chainName}:`, switchError);

    if (switchError.code === 4902) {
      try {
        console.log(`Adding ${network.chainName} to MetaMask...`);
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: network.chainId,
              chainName: network.chainName,
              rpcUrls: [network.rpcUrl],
              blockExplorerUrls: [network.blockExplorerUrl],
            },
          ],
        });
        console.log(`Added and switched to ${network.chainName} successfully.`);
        return true;
      } catch (addError) {
        console.error(`Failed to add ${network.chainName} to MetaMask:`, addError);
        return false;
      }
    } else if (switchError.code === -32002) {
      console.error(`A request to add or switch to ${network.chainName} is already pending. Please check MetaMask.`);
      alert(`A request to add or switch to ${network.chainName} is already pending in MetaMask. Please open MetaMask and complete the request.`);
      return false;
    } else {
      console.error(`Failed to switch to ${network.chainName}:`, switchError);
      alert(`Failed to switch to ${network.chainName}. Please try again.`);
      return false;
    }
  }
};

// Function to switch to an available network if the current one fails
const switchToAvailableNetwork = async () => {
  for (const network of networks) {
    const success = await switchToNetwork(network);
    if (success) {
      return;
    }
  }
  console.error('No available networks could be switched to.');
  alert('Failed to switch to any available networks. Please check your MetaMask or network settings.');
};

export const validation = async (router, username, setError) => {
  validateUsername(username, setError);
  if (document.querySelector("#errorAccess").innerHTML !== "") {
    return;
  }

  console.log('Starting validation...');

  if (typeof window.ethereum !== 'undefined') {
    console.log('Ethereum is defined. Starting network switch...');
    await switchToAvailableNetwork(); // Attempt to switch to an available network

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = "0x2f9Ce96F9A899363D061096BBA3e81B67d977aE8";

    console.log('Checking contract deployment...');
    const isContractDeployed = await checkContractDeployment(provider, contractAddress);
    if (!isContractDeployed) {
      console.error('Contract not deployed at this address.');
      await router.push('/access?error=Contract not deployed at this address.');
      return;
    }

    console.log('Contract is deployed. Requesting accounts...');
    try {
      await provider.send('eth_requestAccounts', []);

      const userAuthContract = new ethers.Contract(contractAddress, abi, signer);

      console.log('Fetching accounts...');
      const accounts = await provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        await router.push('/access?error=No accounts found. Please login to MetaMask.');
        return;
      }

      console.log('Accounts found. Fetching registered username...');
      const registeredUsername = await userAuthContract.getUser();
      console.log('Registered username:', registeredUsername);

      if (!registeredUsername) {
        if (confirm('You are about to create a new account. Is this what you would like?')) {
          const tx = await userAuthContract.register(username);
          await tx.wait();
          const logged = await makeLog(username);
          if (logged === 200) {
            await router.push('/');
          } else {
            await router.push('/access?error=' + logged);
          }
        } else {
          setusernameError('Invalid user.', setError);
        }
      }
    } catch (error) {
      console.error('Validation error:', error);
      await router.push('/access?error=' + error.message);
    }
  } else {
    document.querySelector(".overlay").style.display = "flex";
  }
};

export const dataAccess = () => {
  return {
    route: useRoute(),
    router: useRouter(),
    username: ref('')
  };
};

export const mountedAccess = () => {
  inputEffect();
};
