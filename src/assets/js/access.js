import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { makeLog, inputEffect } from '../main.js'

const validateUsername = (username, usernameError) => {
  if (!username.value) {
    usernameError.value = 'Required.';
  } else if (username.value.length > 50) {
    usernameError.value = 'Max 50 characters.';
  } else {
    usernameError.value = '';
  }
}

const validation = (router, username, usernameError) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    validateUsername(username, usernameError);
    if (usernameError.value) {
      return;
    }
    try {
      const response = await fetch('../../UserAuth_compData.json');
      const abi = await response.json();
      const contractAddress = process.env.USERAUTH;
      const userAuthContract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await web3.eth.getAccounts();

      if (!accounts || accounts.length === 0) {
        await router.push('/login?error=No accounts found. Please login to MetaMask.');
        return;
      }

      const registeredUsername = await userAuthContract.methods.getUser().call({ from: accounts[0] });

      if (!registeredUsername) {
        if (confirm('You are about to create a new account. Is this what you would like?')) {
          await userAuthContract.methods.register(username.value).send({ from: accounts[0] });
          const logged = await makeLog(username.value);
          if (logged === 200) {
            await router.push('/');
          } else {
            await router.push('/login?error=' + logged);
          }
        } else {
          usernameError.value = 'Invalid user.';
        }
      }
    } catch (err) {
      await router.push('/login?error=An error occurred during authentication.');
    }
  });
}

export const dataAccess = () => {
  return {
    route: useRoute(),
    router: useRouter(),
    username: ref(''),
    usernameError: ref('')
  };
}

export const mountedAccess = function () {
  inputEffect();
}

export const methodsAccess = function () {
  return {
    validateUsername() {
      validateUsername(this.username, this.usernameError);
    },
    authenticateUser() {
      validation(this.router, this.username, this.usernameError);
    }
  };
}
