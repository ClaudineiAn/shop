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
import exported from '../assets/js/bookViewControlandBuild.js';

export default {
  data() {
    return {
      // Use data from the imported file
      // If exported.data() returns an object, you can directly return it here
      ...exported.data(),
    };
  },
  methods: {
    // Use methods from the imported file
    ...exported.methods,
  },
  mounted() {
    // Call the mounted function from the imported file, if available
    if (exported.mounted) {
      exported.mounted.call(this);
    }
  },
  beforeRouteLeave(to, from, next) {
    // Call the beforeRouteLeave function from the imported file, if available
    if (exported.beforeRouteLeave) {
      exported.beforeRouteLeave.call(this, to, from, next);
    } else {
      next();
    }
  },
};

</script>