import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import { makeLog,inputEffect } from '../main.js'

const validation = () => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        const infuraUrl = `https://sepolia.infura.io/v3/${process.env.INFURA}`;
        web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    }
    const form = document.querySelector('form')
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      this.validateUsername(this.username.value)
      if (this.usernameError.value) {
        return
      }
      fetch('../../UserAuth_compData.json')
      .then(response => response.json())
      .then(abi => {
          // Replace with your deployed contract address
          const contractAddress = process.env.USERAUTH;
  
          // Create the contract instance
          const userAuthContract = new web3.eth.Contract(abi, contractAddress);
  
          // Function to authenticate a user
          window.authenticateUser = async function() {
              try {
                  const username = this.username.value;
  
                  // Input validation
                  if (!username || typeof username !== 'string' || username.trim() === '') {
                    this.usernameError.value = 'Invalid input. Please enter a valid username.';
                      return;
                  }
  
                  const accounts = await web3.eth.getAccounts();
  
                  if (!accounts || accounts.length === 0) {
                    await router.push('/login?error=No accounts found. Please login to MetaMask.')
                      return;
                  }
  
                  // Check if the user is already registered
                  const registeredUsername = await userAuthContract.methods.getUser().call({ from: accounts[0] });
  
                  if (!registeredUsername) {
                      if (confirm('You are about to create a new account. Is this what you would like?')) {
                          await userAuthContract.methods.register(username).send({ from: accounts[0] });
                            const logged = await makeLog(username)
                            if(logged===200){
                                await router.push('/')
                            }else
                                await router.push('/login?error='+logged)
                      } else {
                        this.usernameError.value = 'Invalid user.'
                      }
                  }
              } catch (err) {
                await router.push('/login?error=An error occurred during authentication.')
              }
          }
      })
      .catch(err => {
          console.error('Error fetching ABI:', err);
          router.push('/login?error=Failed to load ABI')
      })
    })
}

const validateUsername = (value) => {
    if (!value) {
      this.usernameError.value = 'Required.';
    } else if (value.length > 50) {
      this.usernameError.value = 'Max 50 characters.';
    } else {
        this.usernameError.value = '';
    }
  }


export const dataAccess = () => {
    return {
        route: useRoute(),
        router: useRouter(),
        username: ref(''),
        usernameError: ref('')
    }
}

export const mountedAccess = () => {
    inputEffect()
}

export const onMountedAccess = () => {
    validation()
}