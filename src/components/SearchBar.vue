<script setup>
import { ref, onMounted, watch } from 'vue'
import api from "../services/api.ts"

const searchResult = ref([])

const getSearchResult = async (s) => {
  try {
    const response = await api.get("/search?s="+s)
    searchResult.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted( () => {
  const search = document.querySelector('.i-search')

  search.addEventListener('click', async () => {
    search.parentNode.nextSibling.setAttribute('style','')
  })

  const cloasePopUp = document.querySelector('#search-bar ~ div')

  cloasePopUp.addEventListener('click', async () => {
    cloasePopUp.setAttribute('style','display:none')
  })

  const child = document.querySelectorAll('#search-bar ~ div *')

  child.forEach(element => {
    element.addEventListener('click', () => {
      event.stopPropagation()
    })
  })

  const searchInput = document.querySelector('#search-bar ~ div > div > input')

  searchInput.addEventListener("input", async () => {
    await getSearchResult(searchInput.value)
  })

  getSearchResult('')
})

const getImageUrl = (imageFileName) => {
  const imageUrl = require(`@/assets/images/${imageFileName}`);
  return imageUrl;
}

watch(searchResult, () => {
  generateSearchList(searchResult._value.searched)
})
const generateSearchList = (searched) => {
  var html=''
  if(Object.prototype.toString.call(searched)==='[object Object]')
    searched=searched.searched
  searched.forEach((search, index) => {
    html += '<li>';
    html += '<div>';
    html += `<img src="${getImageUrl(search.imagem.split(', ')[0])}" />`;
    html += '</div>';
    html += '<div>';
    html += `<h2 data-title="${search.nome}">${search.nome}</h2>`;
    html += `<p>${search.descricao}</p>`;
    html += '</div>';
    html += '<div>';
    html += '<div>';
    html += `<h2 data-title="Score">Score</h2>`;
    html += `<h2 data-title="${search.score}">${search.score}</h2>`;
    html += '</div>';
    html += `<h2 data-title="${search.current}${search.preco}">${search.current}${search.preco}</h2>`;
    html += '</div>';
    html += '</li>';
  })
  return html
}
</script>

<template>
    <div id="search-bar" class="d-flex ml-auto align-center bar-icon">
      <i class="i-search"></i>
	  <span class="bar-icon-text">Search</span>
    </div>
    <div class="popup" style='display:none'>
      <div>
        <input type="text" />
        <ul v-html="generateSearchList(searchResult)">
        </ul>
      </div>
    </div>
</template>
<style>
.i-search{
  height: 24px;
  display: flex;
  align-items: center;
  font-size: 15px;
  margin: 2px;
  color: var(--color1);
}
#search-bar{
	cursor: pointer;
	margin-right: 6px !important;
}
#search-bar ~ div.popup{
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color2)5c;
  z-index: 3;
  justify-content: center;
  align-items: center;
}
#search-bar ~ div.popup > div{
  position: fixed;
  display: flex;
  width: 80%;
  height: 80%;
  background: black;
  margin: auto;
  z-index: 4;
  flex-direction: column;
}
#search-bar ~ div.popup > div > input{
  height: 50px;
  background: white;
  color: var(--color2);
  font-size: 21px;
}
#search-bar ~ .popup > div > ul{
  position: relative;
  top: 0;
  left: -11px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: calc(100% + 25px);
}
#search-bar ~ div.popup > div > ul::-webkit-scrollbar {
  width: 5px;
}
#search-bar ~ div.popup > div > ul::-webkit-scrollbar-track {
  background: #00000000;
}
#search-bar ~ div.popup > div > ul::-webkit-scrollbar-thumb {
  background: var(--color1)8f;
}
#search-bar ~ div.popup > div > ul::-webkit-scrollbar-thumb:hover {
  background: var(--color1)b5;
}
#search-bar ~ div.popup > div > ul > li{
  display: flex;
  width: calc(100% - 31px);
  height: 140px;
  position: unset;
  background: white;
  margin: 8px 16px;
  transition: 0.3s linear;
}
#search-bar ~ div.popup > div > ul > li:hover{
  transform: scale(1.05);
}
#search-bar ~ div.popup > div > ul > li > div:first-child{}
#search-bar ~ div.popup > div > ul > li > div:first-child > img{
  height: 140px;
}
#search-bar ~ div.popup > div > ul > li > div:nth-child(2){
  display: flex;
  width: 100%;
  padding: 8px;
  flex-direction: column;
}
#search-bar ~ div.popup > div > ul > li > div:nth-child(2) > h2{
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 18px;
  width: calc(100% - 20px);
}
#search-bar ~ div.popup > div > ul > li > div:nth-child(2) > h2:before{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
  font-size: 18px;
}
#search-bar ~ div.popup > div > ul > li > div:nth-child(2) > p{
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: auto;
}
#search-bar ~ div.popup > div > ul > li > div:last-child{
  display: flex;
  margin: 8px 8px 8px auto;
  flex-direction: column;
}
#search-bar ~ div.popup > div > ul > li > div:last-child > div:first-child {
    display: flex;
    flex-direction: row-reverse;
}
#search-bar ~ div.popup > div > ul > li > div:last-child > div:first-child > h2:first-child {
    font-size: 12px;
    writing-mode: vertical-rl;
}
#search-bar ~ div.popup > div > ul > li > div:last-child > div:first-child > h2:last-child{}
#search-bar ~ div.popup > div > ul > li > div:last-child > h2:last-child {
    margin-top: auto;
}
#search-bar ~ div.popup > div > ul > li > div:last-child > h2:last-child{
  margin-top: auto;
}
</style>
<script>
</script>