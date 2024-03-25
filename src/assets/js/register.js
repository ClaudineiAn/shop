import { onMounted, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import axios from "axios"

import { makeLog, inputEffect } from '../main.js'

const validateConfirm = (value) => {
  if (!value) {
    this.conError.value = 'Required.'
  } else if (value !== password.value) {
    this.conError.value = 'Password is different.'
  } else {
    this.conError.value = '';
  }
}
const validateName = (value) => {
  if (!value) {
    this.nameError.value = 'Required.';
  } else {
    this.nameError.value = '';
  }
}
const validateEmail = (value) => {
  if (!value) {
    this.emailError.value = 'Required.';
  } else if (value.length > 50) {
    this.emailError.value = 'Max 50 characters.';
  } else {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(value)) {
        this.emailError.value = 'Invalid e-mail.';
    } else {
        this.emailError.value = '';
    }
  }
}
const validatePassword = (value) => {
  if (!value) {
    this.passwordError.value = 'Required.';
  } else if (value.length < 8) {
    this.passwordError.value = 'Min 8 characters.';
  } else {
    this.passwordError.value = '';
  }
  if (confirm.value !== password.value&&confirm.value) {
    this.conError.value = 'Password is different.'
  } else {
    this.conError.value = '';
  }
}
export default {
  data() {
    return {
        route: useRoute(),
        router: useRouter(),
        name: ref(''),
        email: ref(''),
        password: ref(''),
        confirm: ref(''),
        nameError: ref(''),
        emailError: ref(''),
        passwordError: ref(''),
        conError: ref('')
    }
  },
  validateConfirm,
  validateName,
  validateEmail,
  validatePassword,
  onMounted() {
    const form = document.querySelector('form')

    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      validateConfirm(confirm.value)
      validateName(name.value)
      validateEmail(email.value)
      validatePassword(password.value)
      if (
        nameError.value ||
        emailError.value ||
        passwordError.value ||
        conError.value
      ) {
        return
      }
      try {
        const cryptoPassword = await axios.get('https://cautious-puce-neckerchief.cyclic.app/registerVue?email='+email.value+'&password='+password.value+'&name='+name.value)
        password.value = cryptoPassword.data[0].password
      } catch (error) {
          if (error.response?.status === 301)
            return await router.push('/register?error='+error.response.data.error)
      }
      makeLog(email, password)
      await router.push('/')
    })
    inputEffect()
  }
}