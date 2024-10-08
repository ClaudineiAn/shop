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

const switchToAvalanche = async () => {
  const avalancheChainId = '0xa869'; // Avalanche Fuji C-Chain
  const avalancheChainName = 'Avalanche Fuji C-Chain';
  
  const avalancheRpcUrls = [
    'https://api.avax-test.network/ext/bc/C/rpc',
    'https://rpc.ankr.com/avalanche_fuji',
    'https://avalanche-fuji-c-chain.publicnode.com',
  ];
  const avalancheBlockExplorerUrl = 'https://testnet.snowtrace.io';

  console.log(`Switching to ${avalancheChainName} with chainId ${avalancheChainId}...`);

  let rpcUrlIndex = 0;
  let successfulSwitch = false;

  while (rpcUrlIndex < avalancheRpcUrls.length && !successfulSwitch) {
    const avalancheRpcUrl = avalancheRpcUrls[rpcUrlIndex];

    try {
      console.log(`Attempting to switch to ${avalancheChainName} using RPC URL: ${avalancheRpcUrl}...`);
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: avalancheChainId }],
      });
      console.log(`Switched to ${avalancheChainName} successfully using RPC URL: ${avalancheRpcUrl}.`);
      successfulSwitch = true;
    } catch (switchError) {
      console.error(`Error switching to ${avalancheChainName} using RPC URL: ${avalancheRpcUrl}:`, switchError);

      if (switchError.code === 4902) {
        try {
          console.log(`Adding ${avalancheChainName} with RPC URL: ${avalancheRpcUrl}...`);
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: avalancheChainId,
              chainName: avalancheChainName,
              rpcUrls: [avalancheRpcUrl],
              blockExplorerUrls: [avalancheBlockExplorerUrl],
            }],
          });
          console.log(`Added ${avalancheChainName} successfully using RPC URL: ${avalancheRpcUrl}.`);
          successfulSwitch = true;
        } catch (addError) {
          console.error(`Failed to add ${avalancheChainName} to MetaMask using RPC URL: ${avalancheRpcUrl}:`, addError);
        }
      } else if (switchError.code === -32002) {
        console.error(`A request to add or switch to ${avalancheChainName} is already pending. Please check MetaMask.`);
        alert(`A request to add or switch to ${avalancheChainName} is already pending in MetaMask. Please open MetaMask and complete the request.`);
        return;
      }
    }

    rpcUrlIndex++;
  }

  if (!successfulSwitch) {
    alert(`Failed to switch to ${avalancheChainName}. Please try again.`);
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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = "0xf97d82fd7203d74Aa4a169F933992e350445D8fd"; // Update with your new contract address
    const userAuthContract = new ethers.Contract(contractAddress, abi, signer);

    console.log('Checking contract deployment...');
    try {
      const isContractDeployed = await checkContractDeployment(provider, contractAddress);
      if (!isContractDeployed) {
        console.error('Contract not deployed at this address.');
        await router.push('/access?error=Contract not deployed at this address.');
        return;
      }
    } catch (error) {
      console.error('Error during contract deployment check:', error);
      await router.push('/access?error=' + encodeURIComponent(error.message));
      return;
    }

    console.log('Contract is deployed. Requesting accounts...');
    try {
      await provider.send('eth_requestAccounts', []);
      
      console.log('Fetching accounts...');
      const accounts = await provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        await router.push('/access?error=No accounts found. Please login to MetaMask.');
        return;
      }

      console.log('Accounts found. Fetching or registering username...');
      let registeredUsername;

      try {
        registeredUsername = await userAuthContract.getUser(); // No argument needed
        console.log('Registered username:', registeredUsername);
      } catch (error) {
        if (error.data && error.data.message.includes('User not registered')) {
          console.log('User is not registered. Proceeding with registration...');
          if (confirm('You are about to create a new account. Is this what you would like?')) {
            const tx = await userAuthContract.register(username);
            await tx.wait();
            console.log('User registered successfully.');

            const logged = await makeLog(username);
            if (logged === 200) {
              await router.push('/');
            } else {
              await router.push('/access?error=' + encodeURIComponent(logged));
            }
          } else {
            setusernameError('Invalid user.', setError);
          }
        } else {
          throw error; // Re-throw if it's a different error
        }
      }
    } catch (providerError) {
      console.error('Error requesting accounts:', providerError);
      await router.push('/access?error=' + encodeURIComponent(providerError.message));
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
