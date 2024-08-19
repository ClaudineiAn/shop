import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ethers } from 'ethers';
import { makeLog, inputEffect } from '../main.js';

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
  validateUsername(username, setError);
  if (document.querySelector("#errorAccess").innerHTML!=="") {
    return;
  }

  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    console.log("a");
    // Create a new Ethers provider using the MetaMask provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log("b");

    try {
      // Request account access if needed
      await provider.send('eth_requestAccounts', []);
      const abi = JSON.parse(fs.readFileSync('./abi.json', 'utf8'));
      console.log(0);
      const contractAddress = "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53";
      const userAuthContract = new ethers.Contract(contractAddress, abi, signer);
      console.log(1);

      const accounts = await provider.listAccounts();
      console.log(2);

      if (!accounts || accounts.length === 0) {
        await router.push('/access?error=No accounts found. Please login to MetaMask.');
        return;
      }
      console.log(3);
      console.log('Contract ABI:', abi);
      
      const registeredUsername = await userAuthContract.getUser();
      console.log(4);

      if (!registeredUsername) {
        if (confirm('You are about to create a new account. Is this what you would like?')) {
          const tx = await userAuthContract.register(username);
          await tx.wait(); // Wait for the transaction to be mined
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
      console.error(error);
      await router.push('/access?error=' + error.message);
    }
  } else {
    document.querySelector(".overlay").style.display="flex";
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