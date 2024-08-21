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

const switchToNetwork = async (chainId, chainName, rpcUrl, blockExplorerUrl) => {
  try {
    console.log(`Attempting to switch to ${chainName}...`);
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
    console.log(`Switched to ${chainName} successfully.`);
  } catch (switchError) {
    console.error(`Error switching to ${chainName}:`, switchError);

    if (switchError.code === 4902) {
      try {
        console.log(`Adding ${chainName} to MetaMask...`);
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId,
              chainName,
              nativeCurrency: {
                name: chainName,
                symbol: chainName.slice(0, 4).toUpperCase(), // Use the first 4 characters of the chain name as symbol
                decimals: 18,
              },
              rpcUrls: [rpcUrl],
              blockExplorerUrls: [blockExplorerUrl],
            },
          ],
        });

        console.log(`Added ${chainName}. Attempting to switch...`);
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
        console.log(`Switched to ${chainName} successfully.`);
      } catch (addError) {
        if (addError.code === -32002) {
          console.error(`A request to add or switch to ${chainName} is already pending. Please check MetaMask.`);
          alert(`A request to add or switch to ${chainName} is already pending in MetaMask. Please open MetaMask and complete the request.`);
        } else {
          console.error(`Failed to add ${chainName} to MetaMask:`, addError);
          alert(`Failed to add ${chainName} to MetaMask. Please try again.`);
        }
      }
    } else {
      console.error(`Failed to switch to ${chainName}:`, switchError);
      alert(`Failed to switch to ${chainName}. Please try again.`);
    }
  }
};

const switchToSepoliaThenAvalanche = async () => {
  // Chain details for Sepolia
  const sepoliaChainId = '0x5'; // 5 in hexadecimal
  const sepoliaChainName = 'Sepolia Testnet';
  const sepoliaRpcUrl = 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID';
  const sepoliaBlockExplorerUrl = 'https://sepolia.etherscan.io';

  // Chain details for Avalanche Fuji C-Chain
  const avalancheChainId = '0xa869'; // Avalanche Fuji C-Chain
  const avalancheChainName = 'Avalanche Fuji C-Chain';
  const avalancheRpcUrl = 'https://api.avax-test.network/ext/bc/C/rpc';
  const avalancheBlockExplorerUrl = 'https://testnet.snowtrace.io';

  // Switch to Sepolia
  await switchToNetwork(sepoliaChainId, sepoliaChainName, sepoliaRpcUrl, sepoliaBlockExplorerUrl);

  // Switch to Avalanche Fuji C-Chain
  await switchToNetwork(avalancheChainId, avalancheChainName, avalancheRpcUrl, avalancheBlockExplorerUrl);
};

export const validation = async (router, username, setError) => {
  validateUsername(username, setError);
  if (document.querySelector("#errorAccess").innerHTML !== "") {
    return;
  }

  console.log(0)
  if (typeof window.ethereum !== 'undefined') {
    await switchToSepoliaThenAvalanche();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = "0x2f9Ce96F9A899363D061096BBA3e81B67d977aE8";

    console.log(1)
    const isContractDeployed = await checkContractDeployment(provider, contractAddress);
    if (!isContractDeployed) {
      console.error('Contract not deployed at this address.');
      await router.push('/access?error=Contract not deployed at this address.');
      return;
    }
    
    console.log(2)

    try {
      await provider.send('eth_requestAccounts', []);

      const userAuthContract = new ethers.Contract(contractAddress, abi, signer);

      console.log(3)
      const accounts = await provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        await router.push('/access?error=No accounts found. Please login to MetaMask.');
        return;
      }
      
      console.log(4)

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
