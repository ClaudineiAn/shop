<script setup>
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

import {checkIfLogged} from './HeaderView.vue'

Cookies.set('name', undefined)

checkIfLogged()

const router = useRouter()

async function toHome() {
  await router.push('/')
}

toHome()
</script>
<template>
</template>
<style>
</style>
<script>
</script>