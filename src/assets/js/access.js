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
  try {
    const code = await provider.getCode(address);
    console.log('Contract code:', code); // Log the code retrieved for debugging
    return code !== '0x';
  } catch (error) {
    console.error('Error checking contract deployment:', error);
    return false;
  }
};

const switchToAvalancheFuji = async () => {
  try {
    console.log('Attempting to switch to Avalanche Fuji C-Chain...');
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xA869' }], // 0xA869 is the chain ID for Avalanche Fuji C-Chain
    });
    console.log('Switched to Avalanche Fuji C-Chain successfully.');
  } catch (switchError) {
    console.error('Error switching network:', switchError);

    if (switchError.code === 4902) {
      try {
        console.log('Adding Avalanche Fuji C-Chain to MetaMask...');
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xA869',
              chainName: 'Avalanche Fuji C-Chain',
              nativeCurrency: {
                name: 'Avalanche',
                symbol: 'AVAX',
                decimals: 18,
              },
              rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
              blockExplorerUrls: ['https://testnet.snowtrace.io'],
            },
          ],
        });

        console.log('Added Avalanche Fuji C-Chain. Attempting to switch...');
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xA869' }],
        });
        console.log('Switched to Avalanche Fuji C-Chain successfully.');
      } catch (addError) {
        if (addError.code === -32002) {
          console.error('A request to add or switch to the network is already pending. Please check MetaMask.');
          alert('A request to add the Avalanche Fuji C-Chain is already pending in MetaMask. Please open MetaMask and complete the request.');
        } else {
          console.error('Failed to add Avalanche Fuji C-Chain to MetaMask:', addError);
          alert('Failed to add Avalanche Fuji C-Chain to MetaMask. Please try again.');
        }
      }
    } else {
      console.error('Failed to switch to Avalanche Fuji C-Chain:', switchError);
      alert('Failed to switch to Avalanche Fuji C-Chain. Please try again.');
    }
  }
};

export const validation = async (router, username, setError) => {
  validateUsername(username, setError);
  if (document.querySelector("#errorAccess").innerHTML !== "") {
    return;
  }

  console.log('Requesting accounts...');
  try {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Ensure the user is connected to the correct network
      await switchToAvalancheFuji();

      // Request user accounts
      await provider.send('eth_requestAccounts', []);
      console.log('Accounts requested successfully');

      const signer = await provider.getSigner();
      console.log('Signer obtained:', signer);

      const contractAddress = "0x2f9Ce96F9A899363D061096BBA3e81B67d977aE8";
      console.log('Checking contract deployment at address:', contractAddress);
      const isContractDeployed = await checkContractDeployment(provider, contractAddress);

      if (!isContractDeployed) {
        console.error('Contract not deployed at this address.');
        await router.push('/access?error=Contract not deployed at this address.');
        return;
      }

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
    } else {
      document.querySelector(".overlay").style.display = "flex";
    }
  } catch (error) {
    console.error('Error during validation:', error);
    await router.push('/access?error=Error during validation. ' + error.message);
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
