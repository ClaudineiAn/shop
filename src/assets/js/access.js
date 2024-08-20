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

export const validation = async (router, username, setError) => {
  console.log('Starting validation...'); // Add this line
  validateUsername(username, setError);
  if (document.querySelector("#errorAccess").innerHTML !== "") {
    console.log('Validation error present. Exiting...');
    return;
  }

  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    try {
      console.log('Requesting accounts...');
      await provider.send('eth_requestAccounts', []);
      
      const contractAddress = "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53";
      const userAuthContract = new ethers.Contract(contractAddress, abi, signer);

      const accounts = await provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        console.log('No accounts found.');
        await router.push('/access?error=No accounts found. Please login to MetaMask.');
        return;
      }

      console.log('Fetching registered username...');
      const registeredUsername = await userAuthContract.getUser();

      if (!registeredUsername) {
        console.log('No registered username. Prompting for new account creation...');
        if (confirm('You are about to create a new account. Is this what you would like?')) {
          const tx = await userAuthContract.register(username);
          await tx.wait();
          const logged = await makeLog(username);
          if (logged === 200) {
            console.log('Account created successfully. Redirecting...');
            await router.push('/');
          } else {
            console.log('Error in account creation. Redirecting...');
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
    console.log('MetaMask is not available.');
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