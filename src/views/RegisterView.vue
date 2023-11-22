<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import axios from "axios"

import { makeLog } from '../assets/main.js'

const route= useRoute()
const router= useRouter()
const name= ref('')
const email= ref('')
const password= ref('')
const confirm= ref('')
const nameError= ref('')
const emailError= ref('')
const passwordError= ref('')
const conError= ref('')

const validateConfirm = (value) => {
  if (!value) {
    conError.value = 'Required.'
  } else if (value !== password.value) {
    conError.value = 'Password is different.'
  } else {
    conError.value = '';
  }
}
const validateName = (value) => {
  if (!value) {
    nameError.value = 'Required.';
  } else {
    nameError.value = '';
  }
}
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
const validatePassword = (value) => {
  if (!value) {
    passwordError.value = 'Required.';
  } else if (value.length < 8) {
    passwordError.value = 'Min 8 characters.';
  } else {
    passwordError.value = '';
  }
  if (confirm.value !== password.value&&confirm.value) {
    conError.value = 'Password is different.'
  } else {
    conError.value = '';
  }
}
onMounted( async () => {
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
})
</script>
<template>
  <div id="register" class="d-flex align-center flex-column">
    <h1 data-title="Register">Register</h1>
    <form @submit="handleSubmit">
      <div class="error">
        {{ route.query.error }}
      </div>
      <div class="form-group">
        <label for="name">First Name:</label>
        <input
          id="name"
          type="text"
          v-model="name"
          name="name"
          @input="validateName(name)"
          placeholder="First Name"
          data-placeholder="First Name"
        />
        <span class="error-message">{{ nameError }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          @input="validateEmail(email)"
          id="email"
          type="text"
          v-model="email"
          name="email"
          placeholder="Email"
          data-placeholder="Email"
        />
        <span class="error-message">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          @input="validatePassword(password)"
          id="password"
          type="password"
          v-model="password"
          name="password"
          placeholder="Password"
          data-placeholder="Password"
        />
        <span class="error-message">{{ passwordError }}</span>
      </div>
      <div class="form-group">
        <label for="confirm">Confirm Password:</label>
        <input
          @input="validateConfirm(confirm)"
          id="confirm"
          type="password"
          v-model="confirm"
          name="confirm"
          placeholder="Confirm Password"
          data-placeholder="Confirm Password"
        />
        <span class="error-message">{{ conError }}</span>
      </div>
      <button type="submit" class="btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
</script>

<style scoped>
.error {
  color: red;
}

#register {
  height: 100vh;
  justify-content: center;
}

form {
  min-width: fit-content;
  width: 25%;
}

@media only screen and (max-width: 1000px) {
  form {
    width: 40%;
  }
}

@media only screen and (max-width: 760px) {
  form {
    width: 50%;
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 60%;
  }
}

@media only screen and (max-width: 500px) {
  form {
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
