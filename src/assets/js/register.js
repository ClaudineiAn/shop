import { onMounted, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'

import { makeLog, inputEffect } from '../main.js'

const validateName = (value) => {
  if (!value) {
    this.nameError.value = 'Required.';
  } else {
    this.nameError.value = '';
  }
}

const route = useRoute()
const router = useRouter()
const name = ref('')
const nameError = ref('')

export const dataRegister = () => {
  return {
    route: useRoute(),
    router: useRouter(),
    name: ref(''),
    nameError: ref('')
  }
}

export const onMountedRegister = () => {
  const form = document.querySelector('form')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    validateName(name.value)
    if (nameError.value) {
      return
    }
    const abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "getUser",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_username",
                    "type": "string"
                }
            ],
            "name": "register",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "username",
                    "type": "string"
                }
            ],
            "name": "UserRegistered",
            "type": "event"
        }
    ];
    const contractAddress = '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47';
    const userAuthContract = new web3.eth.Contract(abi, contractAddress);
    try {
        const accounts = await web3.eth.getAccounts();
        await userAuthContract.methods.register(name.value).send({ from: accounts[0] });
        makeLog(name.value)
        await router.push('/')
    } catch (err) {
        return await router.push('/register?error=An error occurred while registering the user.')
    }
  })
  inputEffect()
}