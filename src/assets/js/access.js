import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { makeLog, inputEffect } from '../main.js';

export const validateUsername = (username, usernameError) => {
  if (!username) {
    usernameError = ref('Required.');
  } else if (username.length > 50) {
    usernameError = ref('Max 50 characters.');
  } else {
    usernameError = ref('');
  }
};

export const validation = async (router, username, usernameError) => {
  validateUsername(username, usernameError);
  if (usernameError.value) return;

  try {
    const response = await fetch('../../../UserAuth_compData.json');
    const abi = await response.json();
    const contractAddress = process.env.USERAUTH;
    const userAuthContract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();

    if (!accounts || accounts.length === 0) {
      await router.push('/access?error=No accounts found. Please login to MetaMask.');
      return;
    }

    const registeredUsername = await userAuthContract.methods.getUser().call({ from: accounts[0] });

    if (!registeredUsername) {
      if (confirm('You are about to create a new account. Is this what you would like?')) {
        await userAuthContract.methods.register(username).send({ from: accounts[0] });
        const logged = await makeLog(username);
        if (logged === 200) {
          await router.push('/');
        } else {
          await router.push('/access?error=' + logged);
        }
      } else {
        usernameError = ref('Invalid user.');
      }
    }
  } catch (err) {
    await router.push('/access?error=An error occurred during authentication.');
  }
};

export const dataAccess = () => {
  return {
    route: useRoute(),
    router: useRouter(),
    username: ref(''),
    usernameError: ref('')
  };
};

export const mountedAccess = function () {
  inputEffect();
};
