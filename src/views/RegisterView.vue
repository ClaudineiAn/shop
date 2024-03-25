<script setup>
import exported from '../assets/js/register.js'
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
          @input="exported.validateName(exported.name)"
          placeholder="First Name"
          data-placeholder="First Name"
        />
        <span class="error-message">{{ exported.nameError }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          @input="exported.validateEmail(exported.email)"
          id="email"
          type="text"
          v-model="email"
          name="email"
          placeholder="Email"
          data-placeholder="Email"
        />
        <span class="error-message">{{ exported.emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          @input="exported.validatePassword(exported.password)"
          id="password"
          type="password"
          v-model="password"
          name="password"
          placeholder="Password"
          data-placeholder="Password"
        />
        <span class="error-message">{{ exported.passwordError }}</span>
      </div>
      <div class="form-group">
        <label for="confirm">Confirm Password:</label>
        <input
          @input="exported.validateConfirm(exported.confirm)"
          id="confirm"
          type="password"
          v-model="confirm"
          name="confirm"
          placeholder="Confirm Password"
          data-placeholder="Confirm Password"
        />
        <span class="error-message">{{ exported.conError }}</span>
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

export default {
  data(){
    exported.data()
  },
  onMounted: exported.validation
}
</script>