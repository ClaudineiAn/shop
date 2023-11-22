<script setup>
const books = ref([])
const getBooks = async() => {
  try {
    const response = await api.get("/getbooksvue")
    books.value = response.data
  } catch (error) {
    console.error(error)
  }
}
getBooks()
</script>

<template>
  <main>
    <div id="booksCat">
      <div>
        <template v-for="(book, index) in books" :key="index">
          <div v-if="category !== book.categoriaDescricao">
            <div style="display:none">
              {{ category = book.categoriaDescricao }}
            </div>
            <a :href="`/books/${book.categoriaDescricao.toLowerCase()}`" @click="cancelLink" class="subnav">
              <h2 :data-title="book.categoriaDescricao" >
                {{ book.categoriaDescricao }}
              </h2>
            </a>
          </div>
        </template>
      </div>
    </div>
    <div id="booksList"></div>
  </main>
</template>
<style>
main{
  height: 100vh;
}
#booksCat{
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
#booksCat > div:first-child{
  display: flex;
  height: fit-content;
}
#booksCat > div:first-child > div{
  margin: 0 auto;
}
#booksCat > div:first-child > div:first-child{
  order: 3;
  opacity: 1;
  transform: translateY(0);
  animation: loadfadeup 1s;
}
#booksCat > div:first-child > div:nth-child(2){
  order: 2;
}
#booksCat > div:first-child > div:nth-child(3){
  order: 4;
}
#booksCat > div:first-child > div:nth-child(4){
  order: 1;
}
#booksCat > div:first-child > div:last-child{
  order: 5;
}
#booksCat > div:first-child > div:nth-child(2), #booksCat > div:first-child > div:nth-child(3){
  opacity: 1;
  transform: translateY(0);
  animation: loadfadeupfase2 2s;
}
#booksCat > div:first-child > div:nth-child(4), #booksCat > div:first-child > div:last-child{
  opacity: 1;
  transform: translateY(0);
  animation: loadfadeupfase3 3s;
}
#booksCat > div:first-child > div > a > h2{
  margin: auto;
  font-size: 3vw;
  position: relative;
  color: transparent;
}
#booksCat > div:first-child > div:nth-child(4) > a > h2, #booksCat > div:first-child > div:last-child > a > h2{}
#booksCat > div:first-child > div:nth-child(2) > a > h2, #booksCat > div:first-child > div:nth-child(3) > a > h2{
  font-size: 4vw;
}
#booksCat > div:first-child > div:first-child > a > h2{
  font-size: 5vw;
}
#booksList{}
#booksList > div{
  display: none;
}
#booksList > div.active {
  display: flex;
}
#booksList > div > div{
  display: flex;
  margin: auto 5vw;
}
#booksList > div > div:nth-child(2) > img{
  max-width: 300px;
}
#booksList > div > div:first-child{
  display: flex;
  flex-direction: column;
  margin-right: 0;
  color: #F8EB6B;
}
#booksList > div > div:first-child > h2{
  font-size: 3vw;
  position: relative;
  opacity: 1;
  transform: translateX(0);
  animation: loadfadeleft 2s;
}
#booksList > div > div:first-child > h2.out{
  animation: onloadfadeleft 3s;
}
#booksList > div > div:first-child > div:nth-child(2){
  margin: 5vh 0;
  font-size: 1.6vw;
  overflow: auto;
  height: 12vw;
  opacity: 1;
  transform: translateX(0);
  animation: loadfadeleftfase2 2s;
}
#booksList > div > div:first-child > div.out:nth-child(2){
  animation: onloadfadeleftfase2 2s;
}
@keyframes loadfadeleft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
}
@keyframes loadfadeleftfase2 {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  50% {
    opacity: 0;
    transform: translateX(-100px);
  }
}
@keyframes loadfadeleftfase3 {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  66% {
    opacity: 0;
    transform: translateX(-100px);
  }
}
@keyframes loadfaderight {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes loadfadeup {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
@keyframes loadfadeupfase2 {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  50% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
@keyframes loadfadeupfase3 {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  66% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
@keyframes loadfadedown {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
}
@keyframes loadfadedownfase2 {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  50% {
    opacity: 0;
    transform: translateY(100px);
  }
}
@keyframes navBook1 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook2 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  50% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook3 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  66% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook4 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  75% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook5 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  80% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook6 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  83% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook7 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  85% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook8 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  87.5% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook9 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  88.8% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navBook10 {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  90% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes onloadfadeleft {
  33% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 0;
    transform: translateX(-100px);
  }
}
@keyframes onloadfadeleftfase2 {
  50% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(-100px);
  }
}
@keyframes onloadfadeleftfase3 {
  66% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(-100px);
  }
}
@keyframes onloadfaderight {
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes onloadfadeup {
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
@keyframes onloadfadeupfase2 {
  50% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
@keyframes onloadfadeupfase3 {
  66% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
@keyframes onloadfadedown {
  100% {
    opacity: 0;
    transform: translateY(100px);
  }
}
@keyframes onloadfadedownfase2 {
  50% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(100px);
  }
}
@keyframes navoutBook1 {
  3% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook2 {
  3% {
    opacity: 1;
    transform: translateX(0px);
  }
  6% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook3 {
  6% {
    opacity: 1;
    transform: translateX(0px);
  }
  9% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook4 {
  9% {
    opacity: 1;
    transform: translateX(0px);
  }
  12% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook5 {
  12% {
    opacity: 1;
    transform: translateX(0px);
  }
  15% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook6 {
  15% {
    opacity: 1;
    transform: translateX(0px);
  }
  18% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook7 {
  18% {
    opacity: 1;
    transform: translateX(0px);
  }
  21% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook8 {
  21% {
    opacity: 1;
    transform: translateX(0px);
  }
  24% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook9 {
  24% {
    opacity: 1;
    transform: translateX(0px);
  }
  27% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
@keyframes navoutBook10 {
  27% {
    opacity: 1;
    transform: translateX(0px);
  }
  30% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
#booksList > div > div:first-child > div:last-child{
  display: flex;
  margin: 1vw 0;
}
#booksList > div > div:first-child > div:last-child > div:first-child{
  font-size: 4vw;
  position: relative;
  animation: loadfadeleftfase3 3s;
}
#booksList > div > div:first-child > div:last-child > div:first-child:before {
  content: attr(data-price);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: gold;
  overflow: hidden;
  background: linear-gradient(to right, #F8EB6B, #453100, #0F0F02, #453100, #F8EB6B), #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: categoryAnime 3s ease-in-out infinite;
  background-size: 200% auto;
  background-position: left;
  cursor: pointer;
}
#booksList > div > div:first-child > div:last-child > div.out:first-child{
  animation: onloadfadeleftfase3 3s;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2){
  display: flex;
  margin: auto 2vw auto auto;
  border-radius: 20px;
  width: 45px;
  height: 45px;
  justify-content: center;
  background: #0000004d;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2) > button{
  display: flex;
  width: 45px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div{
  display: none;
  border-radius: 2vw;
  position: absolute;
  background: linear-gradient(to bottom left, #F8EB6B 20%, #453100e3 70%, #F8EB6B 150%), #fff;
  padding: 1vw;
  margin-top: -12vw;
  z-index: 1;
  font-size: 1.2vw;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div.show{
  display: block;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:first-child{
  display: flex;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:first-child > span{
  margin-left: auto;
  width: 3vw;
  height: 3vw;
  font-size: 1.9vw;
  cursor: pointer;
  background: black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  opacity: 0.9;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:last-child{
  display: flex;
  align-items: center;
  margin-top: 0.1vw;
}

#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:last-child > div:first-child{
  background: #00000094;
  padding: 8px 11px;
  border-radius: 10px;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:last-child > div:last-child{
  display: flex;
  border-radius: 20px;
  width: 6vw;
  height: 5vw;
  align-items: center;
  justify-content: center;
  margin-left: 0.3vw;
  cursor: pointer;
}
#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:last-child > div:last-child{
  width: 3.5vw;
}
#booksList > div > div:first-child > div:last-child > div:last-child{
  margin: auto 2vw auto 0;
  opacity: 1;
  transform: translateY(0);
  animation: loadfadedownfase2 2s;
}
#booksList > div > div:first-child > div:last-child > div.out:last-child{
  animation: onloadfadedownfase2 2s;
}
#booksList > div > div:first-child > div:last-child > div:last-child > a{}
#booksList > div > div:first-child > div:last-child > div:last-child > a > button{
  display: flex;
  align-items: center;
  color: #F8EB6B;
  background: transparent;
  border: 2px solid #F8EB6B;
  border-radius: 0;
  padding: 0 1vw 0 0;
  font-size: 1.4vw;
}
#booksList > div > div:first-child > div:last-child > div:last-child > a svg{
  width: 40px;
  height: 30px;
  position: relative;
  top: -3px;
  left: -5px;
}
#booksList > div > div:first-child > div:last-child > div:last-child > a hr{
  margin-left: -0.3vw;
}
#booksList > div > div:last-child{
  width: 24vw;
  height: 35vw;
}
#booksList > div > div:last-child > img{
  height: inherit;
}
#booksList > div > div:last-child > div{
  position: relative;
  top: -509px;
  left: -4px;
  overflow: hidden;
  width: calc(100% + 7px);
  height: 100%;
  z-index: -1;
}
#booksList > div > div:last-child > div:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 0;
    height: 3px;
    margin: 0;
    background: #F8EB6B;
    border-image-slice: 1;
    animation: imgBorder 10s linear infinite;
}
@keyframes imgBorder {
  14.2% {
    height: 6px;
    margin-left: 50%;
    width: 100%;
    margin-top: 0px;
  }
  28.4% {
    margin-top: 0;
    margin-left: calc(100% - 6px);
    width: calc(100% + 3px);
    height: calc(100% + -2px);
  }
  42.6% {
    margin-top: 70%;
    margin-left: 50%;
    width: 50%;
    height: calc(100% + 2px);
  }
  56.8% {
    margin-top: 151%;
    margin-left: calc(0% - 3px);
    width: calc(100% + 3px);
  }
  71% {
    margin-top: 50%;
    width: calc(50% + 3px);
    height: 100%;
    margin-left: 1px;
  }
  85.2% {
    height: 100%;
    margin-left: 1px;
    width: 6px;
    margin-top: -2px;
  }
  99.4% {
    height: 3px;
    margin-left: 1px;
    width: 6px;
    margin-top: 4px;
  }
}
#booksList > div:last-child{
  position: fixed;
  display: flex;
  top: 0;
  left: calc(98.3% - 24px);
  height: 100%;
}
#booksList > div > ul{
  margin: auto;
}
#booksList > div > ul > div{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 14px;
}
#booksList > div > ul > div > li{
  background: #F8EB6B;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  list-style-type: none;
  background: linear-gradient(to right, #F8EB6B, #453100, #F8EB6B), #fff;
  background-size: 200% auto;
  cursor: pointer;
  transition: .7s cubic-bezier(0, 0.74, 1, 1.45);
  opacity: 1;
  transform: translateX(0);
}
#booksList > div > ul > div > li.active{
  height: 60px;
}
#booksList > div > ul > div > li.active > span.show{
  opacity: 0;
}
#booksList > div > ul > div > li.active > span{
  display: block;
  position: relative;
  top: 17px;
  left: -15px;
  color: #F8EB6B;
  width: 20px;
}
#booksList > div > ul > div:first-child > li{
  animation: navBook1 .1s;
}
#booksList > div > ul > div:nth-child(2) > li{
  animation: navBook2 .2s;
}
#booksList > div > ul > div:nth-child(3) > li{
  animation: navBook3 .3s;
}
#booksList > div > ul > div:nth-child(4) > li{
  animation: navBook4 .4s;
}
#booksList > div > ul > div:nth-child(5) > li{
  animation: navBook5 .5s;
}
#booksList > div > ul > div:nth-child(6) > li{
  animation: navBook6 .6s;
}
#booksList > div > ul > div:nth-child(7) > li{
  animation: navBook7 .7s;
}
#booksList > div > ul > div:nth-child(8) > li{
  animation: navBook8 .8s;
}
#booksList > div > ul > div:nth-child(9) > li{
  animation: navBook9 .9s;
}
#booksList > div > ul > div:nth-child(10) > li{
  animation: navBook10 1s;
}
#booksList > div > ul > div:first-child > li.out{
  animation: navoutBook1 3s;
}
#booksList > div > ul > div:nth-child(2) > li.out{
  animation: navoutBook2 3s;
}
#booksList > div > ul > div:nth-child(3) > li.out{
  animation: navoutBook3 3s;
}
#booksList > div > ul > div:nth-child(4) > li.out{
  animation: navoutBook4 3s;
}
#booksList > div > ul > div:nth-child(5) > li.out{
  animation: navoutBook5 3s;
}
#booksList > div > ul > div:nth-child(6) > li.out{
  animation: navoutBook6 3s;
}
#booksList > div > ul > div:nth-child(7) > li.out{
  animation: navoutBook7 3s;
}
#booksList > div > ul > div:nth-child(8) > li.out{
  animation: navoutBook8 3s;
}
#booksList > div > ul > div:nth-child(9) > li.out{
  animation: navoutBook9 3s;
}
#booksList > div > ul > div:nth-child(10) > li.out{
  animation: navoutBook10 3s;
}
#booksList > div > ul > div > svg{
  display: none;
  position: absolute;
  left: -10px;
  width: 21px;
  cursor: pointer;
  z-index: 1;
}
#booksList > div > ul > div > svg.show{
  display: flex;
}
#booksList > div > ul > div > div{
  display: flex;
  position: absolute;
  margin: 1px 36px 1px 0;
  padding: 4px;
  background: white;
  opacity: 0;
}
#booksList > div > ul > div > div.show{
  opacity: 1;
}
#booksList > div > ul > div > div > img{
  width: 50px;
}
.fadeout{
  transform: translateX(100px);
  opacity: 0;
  transition: 1s;
}
.fadein{
  transform: translateX(-100px);
  opacity: 1;
  transition: 1s;
}
@media (max-width: 500px) {
  #booksList > div > div:first-child > div:last-child > div:last-child > a > button {
    font-size: 10px;
  }
}

@media (orientation: portrait) {
  #booksList > div {
    flex-direction: column-reverse;
  }
  #booksList > div > div:first-child {
    margin-right: 5vw;
  }
  #booksList > div > div:last-child {
    width: auto;
    height: 65vw;
    margin: 3vw auto;
    display: block;
  }
}
</style>
<script>
import { ref, onBeforeMount, onMounted, nextTick } from "vue"
import api from "../services/api.ts"
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import {events} from "../assets/main.js"

const currentPath = ref('')

const router = useRouter()

var category = ''
var first = true

var extIndex=-1
var playing = true

const counter = ref(10)

let intervalId, prevActiveNav, prevActive

export const clearintervalId = () => {
  clearInterval(intervalId)
}

export const setPlaying = (v) => {
  playing=v
}

export const getPlaying = () => {
  return playing
}

export const getCounter = () => {
  return counter
}

export const startIntervalBooks = () => {
  startInterval()
}

const startInterval = async () => {
  if (intervalId)
    clearInterval(intervalId)
  intervalId = setInterval(async() => {
    counter.value--;
    document.querySelectorAll("#booksList > div > ul > div > li.active")
    if (counter.value === -1)
      if(document.querySelector("#booksList > div > ul > div > li.active").nextSibling.classList.value===""&&document.querySelector("#booksList > div > ul > div > li.active").nextSibling.nextSibling.classList.value==="")
        document.querySelector('#booksList > div > ul > div > li.active').innerHTML = "<span>0</span>"
      else
        document.querySelector('#booksList > div > ul > div > li.active').innerHTML = ""
    else
      if(document.querySelector("#booksList > div > ul > div > li.active").nextSibling.classList.value===""&&document.querySelector("#booksList > div > ul > div > li.active").nextSibling.nextSibling.classList.value==="")
        document.querySelector('#booksList > div > ul > div > li.active').innerHTML = "<span>" + counter.value + "</span>"
      else
        document.querySelector('#booksList > div > ul > div > li.active').innerHTML = ""
    if (counter.value === -1) {
      stopInterval()
      document.querySelectorAll('#booksList > div > div:first-child > h2,#booksList > div > div:first-child > div:nth-child(2),#booksList > div > div:first-child > div:last-child > div:first-child,#booksList > div > div:first-child > div:last-child > div:last-child').forEach(element => {
        element.classList.add('out')
      })
      await new Promise(resolve => setTimeout(resolve, 2100))
      document.querySelectorAll('#booksList > div > div:first-child > h2,#booksList > div > div:first-child > div:nth-child(2),#booksList > div > div:first-child > div:last-child > div:first-child,#booksList > div > div:first-child > div:last-child > div:last-child').forEach(element => {
        element.classList.remove('out')
      })
      prevActiveNav = document.querySelector('#booksList > div > ul > div > li.active')
      prevActiveNav.innerHTML = ''
      if (prevActiveNav.parentNode.nextSibling === null)
        document.querySelector('#booksList > div > ul > div:first-child > li').classList.add("active")
      else
        prevActiveNav.parentNode.nextSibling.firstChild.classList.add("active")
      prevActiveNav.classList.remove("active")
      document.querySelectorAll('#booksList > div > ul > div > li').forEach(element => {
        element.classList.remove("show")
        element.nextSibling.classList.remove("show")
        element.nextSibling.nextSibling.classList.remove("show")
      })
      prevActive = document.querySelector('#booksList > div.active')
      if (prevActive.nextSibling === document.querySelector("#booksList > div:last-child"))
        document.querySelector('#booksList > div:first-child').classList.add("active")
      else
        prevActive.nextSibling.classList.add("active")
      prevActive.classList.remove("active")
      startInterval()
      counter.value = 10
    }
    if (counter.value < -1)
      stopInterval()
    playing=true
  }, 1000)
}

const stopInterval = () => {
  clearInterval(intervalId)
  counter.value=10
  playing=false
}
export default {
  data() {
    return {
      currentPath: ref(''),
      router: useRouter(),
      books: ref([]),
      category: '',
      first: true,
      actualCat: null,
      pathnameSplited: window.location.pathname.split('/'),
      extIndex: -1,
      playing: true,
      counter: ref(10),
      intervalId: null,
      prevActiveNav: null,
      prevActive: null,
    };
  },
  methods: {
    async getBooks() {
      try {
        const response = await api.get("/getbooksvue")
        this.books.value = response.data
      } catch (error) {
        console.error(error)
      }
    },
    capitalizeFirstLetter(str) {
      return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
    },
    getImageUrl(imageFileName) {
      const imageUrl = require(`@/assets/images/${imageFileName}`)
      return imageUrl
    },
    async generateBooksHTML() {
      let html = ''
      let extIndex = 0
      let first = true
      let booksNav = ''
      this.actualCat=this.capitalizeFirstLetter(this.pathnameSplited[this.pathnameSplited.length - 1])

      await this.getBooks()
      if(Object.prototype.toString.call(this.books)==='[object Object]')
        this.books=this.books._value
      this.books.value.forEach((book, index) => {
        if (this.actualCat === 'Books') {
          this.actualCat=book.categoriaDescricao
        }
        if (book.categoriaDescricao === this.actualCat) {
          if(first)
            html += `<div class='active'>`;
          else  
            html += '<div>';
          extIndex++
          if (extIndex < 10) {
            html += '<div>';
            if (first) {
              html += `<h2 data-title="${book.produtoNome}">${book.produtoNome}</h2>`;
              html += `<div>${book.descricao}</div>`;
              html += '<div>';
              html += `<div data-price="${book.coin}${book.preco}">${book.coin}${book.preco}</div>`;
              html += '<div>';
              html += '<button>';
              html += '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite" /></stop></linearGradient><path fill="url(#gradient)" d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"/></svg>';
              html += '</button>';
              html += '<div>';
              html += '<div>';
              html += '<span>x</span>';
              html += '</div>';
              html += '<div>';
              html += '<div>';
              html += `<div>${window.location.href}?w="${book.idproduto}"</div>`;
              html += '</div>';
              html += '<div>';
              html += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite"/></stop><stop offset="100%" stop-color="#F8EB6B"/></linearGradient><path fill-rule="evenodd" clip-rule="evenodd" d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="url(#gradient)"/><path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="url(#gradient)"/></svg>';
              html += '</div>';
              html += '</div>';
              html += '</div>';
              html += '</div>';
              html += '<div>';
              html += `<a href="/buynow?i=${book.idproduto}\">`;
              html += '<button>';
              html += '<svg xmlns="http://www.w3.org/2000/svg" width="75.321" height="76.046" viewBox="0 0 75.321 76.046"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite" /></stop></linearGradient><path id="fast-ship-svgrepo-com" fill="url(#gradient)" d="M44.837,57.55q-.9-.772-1.76-1.635c-6.581-6.579-9.133-14.694-5.7-18.123s11.541-.875,18.123,5.7q.836.836,1.584,1.7l-10.8-27.923L42.4,25.459c-3.989-8.547-9.157-19.552-9.157-19.552L36.62,27.23,10.42,1.037,1.148.912,1.02,10.437l26.8,26.792L5.46,33.691s10.835,5.083,19.352,9.059l-7.875,3.869L44.845,57.55Zm31.5,19.408-8.459-24.39,7.139,5.915-2.9-16.555L64.9,49.737l-3.931.981-5.592-3.053L47.047,56,50.1,61.585,49.122,65.5,41.46,72.585l16.555,2.9-5.28-6.717,23.606,8.187Zm-18.995-12.8,6.2-6.2C75.029,69.646,69.039,75.665,57.343,64.161Z" transform="translate(-1.02 -0.912)"/></svg>';
              html += '<hr>';
              html += 'Buy Now';
              html += '</button>';
              html += '</a>';
              html += '</div>';
              html += '</div>';
              html += '</div>';
              html += '<div>';
              html += `<img src="${this.getImageUrl(book.imagem.split(', ')[0])}" />`;
              html += '<div></div>';
              html += '</div>';
              booksNav+='<div>';
              booksNav+=`<li class='active' data-count="${extIndex}"></li>`;
              booksNav+=`<svg viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite"></animate></stop><stop offset="100%" stop-color="#F8EB6B"></stop></linearGradient><g fill="url(#gradient)" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g fill="url(#gradient)" id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-419.000000, -571.000000)" fill="#000000"><path fill="url(#gradient)" d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" id="play" sketch:type="MSShapeGroup"></path></g></g></svg>`
              booksNav+=`<svg viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite"></animate></stop><stop offset="100%" stop-color="#F8EB6B"></stop></linearGradient><g fill="url(#gradient)" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="url(#gradient)" id="Dribbble-Light-Preview" transform="translate(-227.000000, -3765.000000)" fill="#000000"><g fill="url(#gradient)" id="icons" transform="translate(56.000000, 160.000000)"><path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606" id="pause-[#1006]"></path></g></g></g></svg>`
              booksNav+='<div>';
              booksNav+=`<img src="${this.getImageUrl(book.imagem.split(', ')[0])}" />`;
              booksNav+='</div>';
              booksNav+='</div>';
              html += '</div>';
            } else {
              html += `<h2 data-title="${book.produtoNome}">${book.produtoNome}</h2>`;
              html += `<div>${book.descricao}</div>`;
              html += '<div>';
              html += `<div data-price="${book.coin}${book.preco}">${book.coin}${book.preco}</div>`;
              html += '<div>';
              html += '<button>';
              html += '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite" /></stop></linearGradient><path fill="url(#gradient)" d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"/></svg>';
              html += '</button>';
              html += '<div>';
              html += '<div>';
              html += '<span>x</span>';
              html += '</div>';
              html += '<div>';
              html += '<div>';
              html += `<div>${window.location.href}?w="${book.idproduto}"</div>`;
              html += '</div>';
              html += '<div>';
              html += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite"/></stop><stop offset="100%" stop-color="#F8EB6B"/></linearGradient><path fill-rule="evenodd" clip-rule="evenodd" d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="url(#gradient)"/><path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="url(#gradient)"/></svg>';
              html += '</div>';
              html += '</div>';
              html += '</div>';
              html += '</div>';
              html += '<div>';
              html += `<a href="/buynow?i=${book.idproduto}\">`;
              html += '<button>';
              html += '<svg xmlns="http://www.w3.org/2000/svg" width="75.321" height="76.046" viewBox="0 0 75.321 76.046"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite" /></stop></linearGradient><path id="fast-ship-svgrepo-com" fill="url(#gradient)" d="M44.837,57.55q-.9-.772-1.76-1.635c-6.581-6.579-9.133-14.694-5.7-18.123s11.541-.875,18.123,5.7q.836.836,1.584,1.7l-10.8-27.923L42.4,25.459c-3.989-8.547-9.157-19.552-9.157-19.552L36.62,27.23,10.42,1.037,1.148.912,1.02,10.437l26.8,26.792L5.46,33.691s10.835,5.083,19.352,9.059l-7.875,3.869L44.845,57.55Zm31.5,19.408-8.459-24.39,7.139,5.915-2.9-16.555L64.9,49.737l-3.931.981-5.592-3.053L47.047,56,50.1,61.585,49.122,65.5,41.46,72.585l16.555,2.9-5.28-6.717,23.606,8.187Zm-18.995-12.8,6.2-6.2C75.029,69.646,69.039,75.665,57.343,64.161Z" transform="translate(-1.02 -0.912)"/></svg>';
              html += '<hr>';
              html += 'Buy Now';
              html += '</button>';
              html += '</a>';
              html += '</div>';
              html += '</div>';
              html += '</div>';
              html += '<div>';
              html += `<img src="${this.getImageUrl(book.imagem.split(', ')[0])}" />`;
              html += '<div></div>';
              html += '</div>';
              booksNav+='<div>';
              booksNav+=`<li data-count="${extIndex}"></li>`;
              booksNav+=`<svg viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite"></animate></stop><stop offset="100%" stop-color="#F8EB6B"></stop></linearGradient><g fill="url(#gradient)" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g fill="url(#gradient)" id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-419.000000, -571.000000)" fill="#000000"><path fill="url(#gradient)" d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" id="play" sketch:type="MSShapeGroup"></path></g></g></svg>`
              booksNav+=`<svg viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite"></animate></stop><stop offset="100%" stop-color="#F8EB6B"></stop></linearGradient><g fill="url(#gradient)" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="url(#gradient)" id="Dribbble-Light-Preview" transform="translate(-227.000000, -3765.000000)" fill="#000000"><g fill="url(#gradient)" id="icons" transform="translate(56.000000, 160.000000)"><path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606" id="pause-[#1006]"></path></g></g></g></svg>`
              booksNav+='<div>';
              booksNav+=`<img src="${this.getImageUrl(book.imagem.split(', ')[0])}" />`;
              booksNav+='</div>';
              booksNav+='</div>';
              html += '</div>';
            }
          }
          if (first && book.categoriaDescricao === this.actualCat)
            first=false;
        }
      });
      first=true;
      html += '</div>';
      html += '<div>';
      html += '<ul>';
      html += booksNav;
      html += '</ul>';
      booksNav="";
      html += '</div>';
      document.querySelector("#booksList").innerHTML=html
    },
    startInterval,
    stopInterval,
    async cancelLink(event) {
      if(event!==null)
        event.preventDefault()
      this.stopInterval()
      document.querySelectorAll('#booksList > div > div:first-child > h2,#booksList > div > div:first-child > div:nth-child(2),#booksList > div > div:first-child > div:last-child > div:first-child,#booksList > div > div:first-child > div:last-child > div:last-child,#booksList > div > ul > div > li').forEach(element => {
        element.classList.add('out')
      })
      if(event!==null){
        let target = event.target
        while (target && target.tagName !== 'A')
          target = target.parentNode
        if (target && target.tagName === 'A')
          var href = target.getAttribute('href')
        var pathnameSplited=href.split('/')
        this.actualCat=capitalizeFirstLetter(pathnameSplited[pathnameSplited.length - 1])
        window.history.pushState({}, "Shop", href)
      }
      await new Promise(resolve => setTimeout(resolve, 2100))
      document.getElementById("booksList").innerHTML=""
      await new Promise(resolve => setTimeout(resolve, 900))
      document.getElementById("booksList").innerHTML=this.generateBooksHTML()
      this.startInterval()
      addEvents()
    },
    addEvents() {
      const autoSelectandCopy = (ele) => {
        const range = document.createRange()
        range.selectNodeContents(ele)

        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('copy')
      }
      events()
      window.addEventListener("popstate", function(event) {
        pathnameSplited=window.location.href.split('/')
        this.actualCat=capitalizeFirstLetter(pathnameSplited[pathnameSplited.length - 1])
        cancelLink(null)
      })
      window.addEventListener('resize', function() {
        const imgs=document.querySelectorAll("#booksList > div > div:last-child")
        if (window.innerWidth < window.innerHeight) {
          let height=(window.innerHeight-(document.querySelector("#booksList > div.active > div:first-child").offsetHeight+document.querySelector("#booksCat").offsetHeight+document.querySelector("header").offsetHeight))-24
          imgs.forEach(element => {
              element.style.height=height+"px"
          })
        }else
          imgs.forEach(element => {
              element.removeAttribute("style")
          })
      })
      this.$el.querySelectorAll('a:not(.subnav)').forEach((a) => {
        a.addEventListener('click', this.handleLinkClick)
      })
    },
    handleLinkClick(event) {
      event.preventDefault();
      const href = event.currentTarget.getAttribute('href');
      this.$router.push(href);
    },
  },
  onBeforeRouteLeave(to, from, next) {
    clearInterval(intervalId)
    playing=false
    next()
  },
  mounted() {
      this.generateBooksHTML()
    const start = setInterval(() => {
      if(document.querySelector("#booksList > div > ul > div > li.active")!==null){
        this.startInterval()
        this.addEvents()
        clearInterval(start)
      }
    },1)
  },
}
</script>