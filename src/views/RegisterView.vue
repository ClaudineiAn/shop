<template>
  <div id="register" class="d-flex align-center flex-column">
    <h1 data-title="Register">Register</h1>
    <form @submit="handleSubmit">
      <div class="error">
        {{ route.query.error }}
      </div>
      <div class="form-group">
        <label for="name">Username:</label>
        <input
          id="name"
          type="text"
          v-model="name"
          name="name"
          @input="exported.validateName(exported.name)"
          placeholder="Username"
          data-placeholder="Username"
        />
        <span class="error-message">{{ exported.nameError }}</span>
      </div>
      <button type="submit" class="btn-primary">Submit</button>
    </form>
  </div>
</template>

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
<script>
import {onMountedRegister, dataRegister} from '../assets/js/register.js'
import { ref, onMounted } from 'vue'

export default {
  data() {
    return dataRegister()
  },
  onMounted() {
    onMountedRegister.call(this)
  }
}
</script>