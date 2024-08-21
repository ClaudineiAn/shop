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

const rpcUrls = [
  'https://api.avax-test.network/ext/bc/C/rpc',   // Primary RPC URL (Avalanche Fuji C-Chain)
  'https://avax.cobo.com',                       // Cobo RPC URL (Mainnet)
  'https://avax.network/ext/bc/C/rpc',           // Another RPC URL (Testnet)
  // Add more RPC URLs as needed
];

let currentRpcIndex = 0;

const switchRpcProvider = async () => {
  currentRpcIndex = (currentRpcIndex + 1) % rpcUrls.length;
  const newRpcUrl = rpcUrls[currentRpcIndex];
  console.log(`Switching to new RPC: ${newRpcUrl}`);

  try {
    const provider = new ethers.providers.JsonRpcProvider(newRpcUrl);
    return provider;
  } catch (error) {
    console.error('Failed to switch RPC:', error);
    if (currentRpcIndex < rpcUrls.length) {
      return switchRpcProvider();  // Retry with the next RPC
    } else {
      throw new Error('All RPCs failed.');
    }
  }
};

const checkContractDeployment = async (provider, address) => {
  const code = await provider.getCode(address);
  return code !== '0x';
};

const switchToAvalanche = async () => {
  const avalancheChainId = '0xa869'; // Avalanche Fuji C-Chain
  const avalancheChainName = 'Avalanche Fuji C-Chain';

  console.log(`Switching to ${avalancheChainName} with chainId ${avalancheChainId}...`);

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: avalancheChainId }],
    });
    console.log(`Switched to ${avalancheChainName} successfully.`);
  } catch (switchError) {
    console.error(`Error switching to ${avalancheChainName}:`, switchError);

    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: avalancheChainId,
            chainName: avalancheChainName,
            rpcUrls: [rpcUrls[0]], // Use the primary RPC URL for adding the chain
            blockExplorerUrls: ['https://testnet.snowtrace.io'],
            nativeCurrency: {
              name: 'Avalanche Fuji C-Chain',
              symbol: 'AVAX',
              decimals: 18,
            }
          }],
        });
        console.log(`Added and switched to ${avalancheChainName} successfully.`);
      } catch (addError) {
        if (addError.code === -32002) {
          console.error(`A request to add or switch to ${avalancheChainName} is already pending. Please check MetaMask.`);
          alert(`A request to add or switch to ${avalancheChainName} is already pending in MetaMask. Please open MetaMask and complete the request.`);
        } else {
          console.error(`Failed to add ${avalancheChainName} to MetaMask:`, addError);
          alert(`Failed to add ${avalancheChainName} to MetaMask. Please try again.`);
        }
      }
    } else {
      console.error(`Failed to switch to ${avalancheChainName}:`, switchError);
      alert(`Failed to switch to ${avalancheChainName}. Please try again.`);
    }
  }
};

export const validation = async (router, username, setError) => {
  validateUsername(username, setError);
  if (document.querySelector("#errorAccess").innerHTML !== "") {
    return;
  }

  console.log('Starting validation...');

  if (typeof window.ethereum !== 'undefined') {
    console.log('Ethereum is defined. Starting network switch...');
    await switchToAvalanche();

    let provider;
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
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
      await provider.send('eth_requestAccounts', []);

      const userAuthContract = new ethers.Contract(contractAddress, abi, signer);

      console.log('Fetching accounts...');
      const accounts = await provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        await router.push('/access?error=No accounts found. Please login to MetaMask.');
        return;
      }

      // **Switch RPC before fetching the username**
      try {
        provider = await switchRpcProvider();
        console.log('Switched RPC. Fetching registered username...');
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

        if (error.message.includes('Internal JSON-RPC error')) {
          console.log('Switching RPC due to error...');
          provider = await switchRpcProvider();
          // Retry fetching the registered username with the new provider
          return validation(router, username, setError);
        } else {
          await router.push('/access?error=' + error.message);
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
