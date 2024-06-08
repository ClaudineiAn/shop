<template>
  <div id="login" class="d-flex align-center flex-column">
    <h1 data-title="Login">Access</h1>
    <form @submit="handleSubmit">
      <div class="error">
        {{ route.query.error }}
      </div>
      <div class="form-group">
        <input 
          @input="validateUsername"
          v-model="username" 
          type="text"
          name="username" 
          label="username"
          placeholder="Username"
          data-placeholder="Username"
        >
        <span class="error-message">{{ usernameError }}</span>
      </div>
      <button type="submit" class="btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<style>
/* Your existing styles here */
</style>

<script>
import { dataAccess, mountedAccess, methodsAccess } from '../assets/js/access.js'

export default {
  data() {
    return dataAccess();
  },
  methods: {
    ...methodsAccess(),
    handleSubmit(event) {
      event.preventDefault();
      this.validateUsername(this.username);
      if (this.usernameError) {
        return;
      }
      this.authenticateUser();
    }
  },
  mounted() {
    mountedAccess.call(this);
  }
}
</script>
