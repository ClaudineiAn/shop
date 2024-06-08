import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { makeLog, inputEffect } from '../main.js';

export const setusernameError = (v, username, setError) => {
  return setError(v, username);
};

export const validateUsername = (username, setError) => {
  if (!username) {
    return setusernameError('Required.', username, setError);
  } else if (username.length > 50) {
    return setusernameError('Max 50 characters.', username, setError);
  } else {
    return setusernameError('', username, setError);
  }
};

export const validation = async (router, username, setError) => {
  if (validateUsername(username, setError)) {
    return;
  }
  try {
    const response = await fetch('../../../UserAuth_compData.json');
    const abi = await response.json();
    const contractAddress = process.env.USERAUTH;
    const userAuthContract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();

    if (!accounts || accounts.length === 0) {
      await router.push('/access?error=No accounts found. Please login to MetaMask.'+'&username='+username);
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
          await router.push('/access?error=' + logged+'&username='+username);
        }
      } else {
        setusernameError('Invalid user.', setError);
      }
    }
  } catch (err) {
    await router.push('/access?error=An error occurred during authentication.'+'&username='+username);
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
