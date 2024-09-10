<script setup>
import { isLoggedIn } from '../assets/main.js'
import Cookies from 'js-cookie'
import Logo from '../components/Logo.vue'
import Language from '../components/Language.vue'
import SearchBar from '../components/SearchBar.vue'
import LoginRegisterButton from '../components/LoginRegisterButton.vue'
import Account from '../components/Account.vue'
import PageColor from '../components/PageColor.vue'
</script>

<template>
  <header>
    <nav class="d-flex align-center">
      <Logo />
      <Language />
      <SearchBar />
	  <PageColor />
      <LoginRegisterButton v-if="!Cookies.get('name') || Cookies.get('name') === 'undefined'" />
      <Account v-else />
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
a {
  text-decoration: none;
}
header {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: black;
  top: 0;
  z-index: 2;
}
button {
  margin-right: 2vw;
}
</style>