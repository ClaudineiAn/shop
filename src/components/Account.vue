<script setup>
import AccontIcon from './icons/IconAccont.vue'
import UserLogOut from './icons/IconLogOutUser.vue'
import AdminAddProduct from './icons/IconAdminAddProduct.vue'
import CameraIcon from './icons/IconCamera.vue'

import api from "../services/api.ts"
import {showResponse,events} from "../assets/main.js"
import Cookies from 'js-cookie'
import { ref, onMounted } from 'vue'

const email = Cookies.get('email')
const name = Cookies.get('name')
let img = ref(null)

const setEmail = (value) => {
  email.value = value
}

const setName = (value) => {
  name.value = value
}

export const updateProfileImg = async () => {
  try {
    if (Cookies.get('imageName') === "null" || Cookies.get('imageName') === undefined) {
      img.value = require("@/assets/profileImg/default.png")
    } else {
      const res = await api.get("/getimgfromemail?e=" + email.value)
      img.value = `data:${res.data[0].imagem_perfil_tipo};base64,${res.data[0].imagem_perfil_data}`
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  events()
  updateProfileImg()
})
</script>

<template>
  <AccontIcon class="accont" />
  <div class="accountPopUp" style="display:none">
      <div class="accountData">
        <img :src="img" alt="Profile img">
          <CameraIcon class="cameraIcon" />
          <input id="upload" type="file" ref="fileInput" accept="image/*" style="display: none" />
          <div class="group">
              <span>{{ name }}</span>
              <span>{{ email }}</span>
          </div>
      </div>
      <RouterLink to="/addproduct" class="optionsBox">
          <AdminAddProduct class="options"/>New Prodct
      </RouterLink>
      <RouterLink to="/logout" class="optionsBox">
          <UserLogOut class="options"/>Log Out
      </RouterLink>
  </div>
</template>
<style>
.accont{
  margin: auto 3vw auto 5vw;
}
.accont > svg{
  display: flex;
}
.accountData > svg{
  position: absolute;
  top: 80px;
  left: 30px;
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 40px
}
.accountPopUp{
  position: absolute;
  top: 68px;
  left: calc(96.6vw - 352px);
  background: linear-gradient(to bottom right, #F8EB6B 20%, #453100 50%, #F8EB6B), #fff;
  padding: 12px;
  border-radius: 10px;
  width: 340px;
  background-size: 300% 300%;
  background-position: left;
  animation: popUpBackgrond 6s linear infinite;
}
@keyframes popUpBackgrond {
  0% {
    background-position: -120% 0;
  }
  50% {
    background-position: -100% 0;
  }
  100% {
    background-position: -120% 0;
  }
}
.accountPopUp > .accountData{
  background: rgb(0 0 0 / 20%);
  display: flex;
  padding: 10px;
  color: #F8EB6B;
}
.accountPopUp > .accountData > img{
  width: 80px;
  height: 80px;
  margin: auto 0;
  border-radius: 40px;
}
.group{
  display: flex;
  flex-direction: column;
  margin: auto auto auto 20px;
}
.optionsBox{
  display: flex;
  text-decoration: none;
  color: #F8EB6B;
  margin: 10px;
}
.options{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
<script>
</script>