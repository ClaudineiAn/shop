<script setup>
import exported from '../assets/js/login.js'
</script>
<template>
  <div id="login" class="d-flex align-center flex-column">
    <h1 data-title="Login">Login</h1>
    <form @submit="handleSubmit">
      <div class="error">
        {{exported.route.query.error}}
      </div>
      <div class="form-group">
        <input 
          @input="exported.validateEmail(exported.email)"
          v-model="email" 
          type="text"
          name="email" 
          label="Email"
          placeholder="Email"
          data-placeholder="Email"
        >
        <span class="error-message">{{ exported.emailError }}</span>
      </div>
      <div class="form-group">
        <input
          @input="validatePassword(exported.password)"
          type="password"
          label="Password"
          hint="At least 8 characters"
          ref="password"
          name="password"
          placeholder="Password"
          data-placeholder="Password"
        >
        <span class="error-message">{{ exported.passwordError }}</span>
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
  data(){
    exported.data()
  },
  mounted: exported.mounted,
  onMounted: exported.validation
}
</script>