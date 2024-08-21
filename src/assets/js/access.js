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

  try {
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(`Current chainId: ${currentChainId}`);

    if (currentChainId !== avalancheChainId) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: avalancheChainId }],
      });
      console.log('Switched to Avalanche Fuji C-Chain.');
    } else {
      console.log('Already on Avalanche Fuji C-Chain.');
    }
  } catch (error) {
    console.error('Error:', error);
    if (error.code === 4902) {
      // Add the chain if it's not present
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: avalancheChainId,
          chainName: 'Avalanche Fuji C-Chain',
          nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
          rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
          blockExplorerUrls: ['https://testnet.snowtrace.io'],
        }],
      });
    } else {
      console.error('Switching or adding chain error:', error);
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