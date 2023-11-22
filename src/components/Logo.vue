<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <RouterLink to="/" class="mainImg"><img :src="logo"/></RouterLink>
</template>
<style>
header > nav > a.mainImg{
  margin: 0 calc(1vw + 20px);
}
header > nav > a > img{
  width: 50px;
}
</style>
<script>
import Logo from "../assets/logo.svg"
export default {
    data: function () {
        return {
          logo: Logo
        }
    },      
}
</script>