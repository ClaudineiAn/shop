<script>
import { onMounted } from 'vue'
import ArrowIcon from '../components/icons/IconArrow.vue'
import {setProperMetrics,assemble} from '../assets/js/mainPageAssemble.js'
export default {
  components: {
    ArrowIcon
  },
  setup() {
    onMounted( async () => {
      setProperMetrics()
      window.addEventListener('resize', setProperMetrics);
      assemble()
    })
    return {
      ArrowIcon,
    };
  },
}
</script>
<template>
  <main>
    <div class="banner">
      <div>
        <h1>Shop</h1>
      </div>
      <div class="box">
        <div class="titles">
          <h2>Trolley</h2>
          <h2>
            <div class="lightning lightning2"></div>
            <div class="lightning lightning2"></div>
            <div class="lightning lightning2"></div>
            Home
            <div></div>
            <div class="lightning lightning1"></div>
            <div class="lightning lightning1"></div>
            <div class="lightning lightning1"></div>
            <div></div>
          </h2>
          <h2>Favorite</h2>
        </div>
        <div class="data">
        </div>
        <div class="popup">
        </div>
      </div>
      <RouterLink to="/books">
        <span>Scrow Down</span>
        <ArrowIcon id="arrowIcon" />
      </RouterLink>
    </div>
  </main>
</template>
<style>
@import url('../assets/css/mainPage.css');
@import url('../assets/css/mainPagePopUp.css');
</style>
<script>
</script>