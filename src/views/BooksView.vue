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
@import url('../assets/css/booksCat.css');
@import url('../assets/css/booksList.css');
</style>
<script>
import exported from '../assets/js/bookViewControlandBuild.js'

export default {
  data(){
    exported.data()
  },
  methods: exported.methods,
  mounted: exported.mounted,
  beforeRouteLeave: exported.beforeRouteLeave,
}
</script>