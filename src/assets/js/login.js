import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import { makeLog,inputEffect } from '../assets/main.js'

const validation = () => {
    const form = document.querySelector('form')
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      this.validateEmail(this.email.value)
      this.validatePassword(this.password.value)
      if (this.emailError.value||this.passwordError.value) {
        return
      }
      const logged = await makeLog(this.email,this.password.value)
      if(logged===200){
        await router.push('/')
      }else
        await router.push('/login?error='+logged)
    })
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
  const validatePassword = (value) =>  {
    if (!value) {
        this.passwordError.value = 'Required.';
    } else if (value.length < 8) {
        this.passwordError.value = 'Min 8 characters.';
    } else {
        this.passwordError.value = '';
    }
  }
  export default {
    data() {
      return {
        route = useRoute(),
        router= useRouter(),
        email= ref(''),
        password= ref(''),
        emailError= ref(''),
        passwordError= ref('')
      }
    },
    validation,
    validateEmail,
    validatePassword,
    mounted() {
        inputEffect()
    },
    onMounted() {
        validation()
    }
  }