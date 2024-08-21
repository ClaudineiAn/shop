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

export const validation = async (router, username, setError) => {
  validateUsername(username, setError);
  if (document.querySelector("#errorAccess").innerHTML !== "") {
    return;
  }
  
  console.log(0)
  if (typeof window.ethereum !== 'undefined') {
    try {
      console.log('Creating provider...');
      const provider = new ethers.BrowserProvider(window.ethereum);
  
      console.log('Getting signer...');
      const signer = await provider.getSigner();

      console.log('Checking network...');
      const network = await provider.getNetwork();
      console.log('Connected to network:', network.name);
      if (network.chainId !== 11155111) {  // Sepolia testnet chainId
        console.error('Incorrect network. Please switch to Sepolia.');
        await router.push('/access?error=Please switch to the Sepolia network.');
        return;
      }
  
      console.log('Checking contract deployment...');
      const contractAddress = "0x2f9Ce96F9A899363D061096BBA3e81B67d977aE8";
      const isContractDeployed = await checkContractDeployment(provider, contractAddress);
      
      if (!isContractDeployed) {
        console.error('Contract not deployed at this address.');
        await router.push('/access?error=Contract not deployed at this address.');
        return;
      }
      
      console.log('Requesting accounts...');
      await provider.send('eth_requestAccounts', []);
  
      console.log('Creating contract instance...');
      const userAuthContract = new ethers.Contract(contractAddress, abi, signer);
  
      console.log('Listing accounts...');
      const accounts = await provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        await router.push('/access?error=No accounts found. Please login to MetaMask.');
        return;
      }
      
      console.log('Getting registered username...');
      const registeredUsername = await userAuthContract.getUser();
      console.log('Registered username:', registeredUsername);
  
      if (!registeredUsername) {
        if (confirm('You are about to create a new account. Is this what you would like?')) {
          console.log('Registering new username...');
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
