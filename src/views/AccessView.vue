<script setup>
import MetaMaskNotice from '../components/MetaMaskNotice.vue';
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { validateUsername, validation, mountedAccess } from '../assets/js/access.js';

const route = useRoute();
const router = useRouter();
const username = ref('');
const usernameError = ref('');

const setusernameError = (v) => {
  document.querySelector("#errorAccess").innerHTML = v;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  await validateUsername(username.value, setusernameError);
  if (document.querySelector("#errorAccess").innerHTML !== "") {
    return;
  }
  await validation(router, username.value, setusernameError);
  await nextTick(() => {
    mountedAccess();
  });
};

const onUsernameInput = () => {
  setusernameError('');
  validateUsername(username.value, setusernameError);
};

onMounted(() => {
  mountedAccess();
});
</script>

<template>
  <div id="login" class="d-flex align-center flex-column">
    <h1 data-title="Access">Access</h1>
    <form @submit="handleSubmit">
      <div class="error">
        {{ $route.query.error }}
      </div>
      <div class="form-group">
        <input 
          @input="onUsernameInput"
          v-model="username" 
          type="text"
          name="username" 
          placeholder="Username"
          data-placeholder="Username"
        >
        <span id="errorAccess" class="error-message">{{ usernameError }}</span>
      </div>
      <button type="submit" class="btn-primary">
        Submit
      </button>
    </form>
    <div>
      <MetaMaskNotice />
    </div>
  </div>
</template>

<style>
.error {
  color: red;
}
#login {
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

h1 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
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
</style>