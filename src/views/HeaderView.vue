<script>
import { ref, watch } from 'vue'
import Cookies from 'js-cookie'

const isLoggedIn = ref(false)

export const checkIfLogged = async () => {
    try {
        if (Cookies.get('id')!=='undefined'||Cookies.get('email')!=='undefined'||Cookies.get('name')!=='undefined'||Cookies.get('typeProfile')!=='undefined'){
            isLoggedIn.value = true
        } else {
            isLoggedIn.value = false
        }
    } catch (error) {
        isLoggedIn.value = false
    }
}
</script>

<template>
  <header>
    <nav class="d-flex align-center" >
      <Logo />
      <Language />
      <SearchBar />
      <LoginRegisterButton v-if="!isLoggedIn"/>
      <Account v-else/>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
a{
  text-decoration: none;
}
header{
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: black;
  top: 0;
  z-index: 2;
}
button{
  margin-right: 2vw;
}
</style>
<script setup>
import { onMounted } from 'vue'
import Logo from '../components/Logo.vue'
import Language from '../components/Language.vue'
import SearchBar from '../components/SearchBar.vue'
import LoginRegisterButton from '../components/LoginRegisterButton.vue'
import Account from '../components/Account.vue'

checkIfLogged()

</script>