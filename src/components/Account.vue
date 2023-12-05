<script setup>
</script>

<template>
  <AccontIcon class="accont" />
  <div class="accountPopUp" style="display:none">
      <div class="accountData">
        <img :src="updateProfileImg" alt="Profile img">
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
import AccontIcon from './icons/IconAccont.vue'
import UserLogOut from './icons/IconLogOutUser.vue'
import AdminAddProduct from './icons/IconAdminAddProduct.vue'
import CameraIcon from './icons/IconCamera.vue'

import api from "../services/api.ts"
import {showResponse,events} from "../assets/main.js"

import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from "axios"
import Cookies from 'js-cookie'

let email = Cookies.get('email')
let name = Cookies.get('name')

export const setEmail = (value) => {
  email=value
}
export const setName = (value) => {
  name=value
}
export const profileImg = async () => {
  if (Cookies.get('imageName') === "null" || Cookies.get('imageName') === undefined) {
    return Promise.resolve(require("@/assets/profileImg/default.png"));
  } else {
    try {
      const res = await api.get("/getimgfromemail?e=" + Cookies.get('email'));
      const imageData = `data:${res.data[0].imagem_perfil_tipo};base64,${res.data[0].imagem_perfil_data}`;
      console.log(imageData)
      console.log(Promise.resolve(`data:${res.data[0].imagem_perfil_tipo};base64,${res.data[0].imagem_perfil_data}`))
      return Promise.resolve(imageData);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}
export const updateProfileImg = await profileImg()
export default {
  components: { AccontIcon, UserLogOut, AdminAddProduct, CameraIcon },
  setup() {
    onMounted( () => {
      events()
    })
    return {
      CameraIcon,
      email,
      name,
      img,
    }
  },
  data() {
    return {
      selectedFile: null
    }
  },
}
</script>