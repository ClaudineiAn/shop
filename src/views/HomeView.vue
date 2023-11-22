<script>
import ArrowIcon from '../components/icons/IconArrow.vue'
export default {
  components: {
    ArrowIcon
  },
}
</script>
<template>
  <main>
    <div class="banner">
      <div>
        <h1>Shop</h1>
      </div>
      <RouterLink to="/books">
        <span>Scrow Down</span>
        <ArrowIcon id="arrowIcon" />
      </RouterLink>
    </div>
  </main>
</template>
<style>
.banner:before{
  content: "";
  background: #000000eb;
  width: 100%;
  height: 100%;
  position: absolute;
}
.banner{
  display: flex;
  background-image: url("../assets/images/home.jpg");
  color: white;
  background-size: cover;
  height: 100vh;
  width: 100%;
  flex-direction: column;
}
.banner > div{
  z-index: 1;
}
.banner > div:first-child{
  margin: auto;
}
.banner > div:first-child > h1{
  position: relative;
  color: transparent;
  font-size: 20vw;
}
.banner > div:first-child > h1:before{
  content: "Shop";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  color: gold;
  border-right: 2px solid #a59337;
  overflow: hidden;
  background: linear-gradient(to right, #F8EB6B, #453100, #0F0F02, #453100, #F8EB6B), #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: logoAnime 6s cubic-bezier(0.73, 0.01, 0.31, 0.97) infinite;
  background-size: 200% auto;
  background-position: left;
}
@keyframes logoAnime {
  0% {
    width: 0;
    background-position: -100% 0;
  }
  50% {
    width: 100%;
  }
  75% {
    background-position: -50% 0;
  }
  100% {
    width: 0;
    background-position: 100% 0;
  }
}
.banner > a{
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  z-index: 0;
  color: #F8EB6B;
}
.banner > a > svg{
  margin: 0 auto;
  width: 30px;
  height: 30px;
}
</style>
<script>
</script>