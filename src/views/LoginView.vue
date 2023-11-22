<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import { makeLog } from '../assets/main.js'

const route = useRoute()
const router= useRouter()
const email= ref('')
const password= ref('')
const emailError= ref('')
const passwordError= ref('')

onMounted( () => {
  const form = document.querySelector('form')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    validateEmail(email.value)
    validatePassword(password.value)
    if (emailError.value||passwordError.value) {
      return
    }
    const logged = await makeLog(email,password.value)
    if(logged===200){
      await router.push('/')
    }else
      await router.push('/login?error='+logged)
  })
})
const validateEmail = (value) => {
  if (!value) {
    emailError.value = 'Required.';
  } else if (value.length > 50) {
    emailError.value = 'Max 50 characters.';
  } else {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(value)) {
      emailError.value = 'Invalid e-mail.';
    } else {
      emailError.value = '';
    }
  }
}
const validatePassword = (value) =>  {
  if (!value) {
    passwordError.value = 'Required.';
  } else if (value.length < 8) {
    passwordError.value = 'Min 8 characters.';
  } else {
    passwordError.value = '';
  }
}
</script>
<template>
  <div id="login" class="d-flex align-center flex-column">
    <h1 data-title="Login">Login</h1>
    <form @submit="handleSubmit">
      <div class="error">
        {{route.query.error}}
      </div>
      <div class="form-group">
        <input 
          @input="validateEmail(email)"
          v-model="email" 
          type="text"
          name="email" 
          label="Email"
          placeholder="Email"
          data-placeholder="Email"
        >
        <span class="error-message">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <input
          @input="validatePassword(password)"
          type="password"
          label="Password"
          hint="At least 8 characters"
          ref="password"
          name="password"
          placeholder="Password"
          data-placeholder="Password"
        >
        <span class="error-message">{{ passwordError }}</span>
      </div>
      <button type="submit" class="btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<style>
.error{
  color: red;
}
#login{
  height: 100vh;
  justify-content: center;
}
form{
  min-width: fit-content;
  width: 25%;
}
@media only screen and (max-width: 1000px) {
  form{
    width: 40%;
  }
}
@media only screen and (max-width: 760px) {
  form{
    width: 50%;
  }
}
@media only screen and (max-width: 600px) {
  form{
    width: 60%;
  }
}
@media only screen and (max-width: 500px) {
  form{
    width: 90%;
  }
}

h1{
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  margin-bottom: 5px;
}

.error-message {
  color: red;
  display: block;
  height: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.hint {
  font-size: 12px;
  color: #777;
}
</style>
<script>
export default {
  mounted() {
    const inputs = document.querySelectorAll("input[type='text'], input[type='password']")

    inputs.forEach(element => {
      element.addEventListener('focus', () => {
        if(element.value===""&&element.parentNode.lastChild.innerHTML===""){
          const newElement = document.createElement('div')
          const newHr = document.createElement('hr')
          newElement.textContent = element.getAttribute("placeholder")
          element.setAttribute("placeholder","")
          element.parentNode.insertBefore(newHr, element.parentNode.lastChild)
          element.parentNode.insertBefore(newElement, element.parentNode.lastChild)
        }
      })
    })

    inputs.forEach(element => {
      element.addEventListener('blur', async () => {
        if(element.value===""&&element.parentNode.lastChild.innerHTML===""){
          element.nextSibling.classList.add("out")
          element.nextSibling.nextSibling.classList.add("out")
          await new Promise(resolve => setTimeout(resolve, 300))
          element.setAttribute("placeholder",element.getAttribute("data-placeholder"))
          element.parentNode.removeChild(element.nextSibling)
          element.parentNode.removeChild(element.nextSibling)
        }
      })
    })
  }
}
</script>