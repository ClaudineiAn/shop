<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div id="addProduct" class="d-flex align-center flex-column">
    <h1>Add Product</h1>
    <v-form method="post" @submit.prevent="handleSubmitAddProduct">
      <div class="error">
        {{route.query.error}}
      </div>
      <v-text-field 
        :rules="emailRules" 
        v-model="email" 
        name="email" 
        label="Email"
      ></v-text-field>
      <v-text-field
        :rules="passwordRules"
        v-model="password"
        type="password"
        label="Password"
        hint="At least 8 characters"
        ref="password"
        name="password"
      ></v-text-field>
      <v-btn flat color="primary" type="submit">
        Submit
      </v-btn>
    </v-form>
  </div>
</template>

<style>
.error{
  color: red;
}
#addProduct{
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
</style>
<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  data() {
    return {
      route: this.$route,
      email: ref(''),
      password: ref(''),
      emailRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 50 || 'Max 50 characters',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
      passwordRules: [
        value => !!value || 'Required.',
        value => (value || '').length >= 8 || 'Min 8 characters',
      ],
    }
  },
  methods: {
    async handleSubmitAddProduct() {
        
    }
  }
}
</script>