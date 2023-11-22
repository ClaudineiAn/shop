<script>
import { ref, watch } from 'vue'
import Cookies from 'js-cookie'

export const checkIfLogged = async () => {
    try {
        if (Cookies.get('id')!=='undefined'||Cookies.get('email')!=='undefined'||Cookies.get('name')!=='undefined'||Cookies.get('typeProfile')!=='undefined'){
          Account()
        } else {
          LoginRegisterButton()
        }
    } catch (error) {
      LoginRegisterButton()
    }
}
export const LoginRegisterButton = () => {

}
export const Account = () => {}
</script>

<template>
  <header>
    <nav class="d-flex align-center" >
      <Logo />
      <Language />
      <SearchBar />
      <Utils />
      <LoginRegisterButton style="display:none"/>
      <Account style="display:none"/>
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
import Utils from '../components/Utils.vue'
import LoginRegisterButton from '../components/LoginRegisterButton.vue'
import Account from '../components/Account.vue'
import {updateUser} from '../assets/main.js'

onMounted( () => {
  updateUser()
})
checkIfLogged()

</script>