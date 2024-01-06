<script>
import { onMounted } from 'vue'
import ArrowIcon from '../components/icons/IconArrow.vue'
export default {
  components: {
    ArrowIcon
  },
  setup() {
    const setProperMetrics = async () => {
      const headerHeight = document.querySelector("header").offsetHeight;
      document.querySelector(".banner > div.box > div.titles").setAttribute('style', `top:${headerHeight}px`);
      document.querySelectorAll('.banner div.box>div.titles>h2>div:first-child').forEach(element => {
        element.setAttribute("style",`width:${element.parentNode.offsetWidth}px;height:${element.parentNode.offsetHeight}px`)
      })
      document.querySelectorAll('.banner div.box>div.titles>h2>div:last-child').forEach(element => {
        const translateY=element.parentNode.offsetHeight-10
        element.setAttribute("style",`width:${element.parentNode.offsetWidth}px;transform: translateY(${translateY}px) rotateX(65deg)`)
      })
    };
    const setAnimations = async () => {
      const titleAniDownUp = async () => {
        document.querySelectorAll('.banner div.box>div.titles>h2>div:last-child').forEach(element => {
          element.classList.remove("fadeout")
          var transform = element.getAttribute('style');
          var translateYValue = 0;
          var translateYMatch = transform.match(/translateY\(([^)]+)\)/);
          translateYValue = parseFloat(translateYMatch[1]);
          translateYValue--
          if(translateYValue<(element.parentNode.offsetHeight/2)){
            element.classList.add("fadeout")
            translateYValue = element.parentNode.offsetHeight-10;
            clearInterval(titleAniVar)
            setTimeout(function() {
              titleAniVar = setInterval(titleAniDownUp, 80)
            }, 10000);
          }
          element.setAttribute("style",`width:${element.parentNode.offsetWidth}px;transform: translateY(${translateYValue}px) rotateX(65deg)`)
        })
      }
      var titleAniVar = setInterval(titleAniDownUp, 80)
    };
    onMounted(() => {
      setProperMetrics();
      setAnimations()
    });

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
          <h2>Trolley<div></div><div></div></h2>
          <h2>Home<div></div><div></div></h2>
          <h2>Favorite<div></div><div></div></h2>
        </div>
        <div class="data">
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
.fadeout{
  opacity:0;
}
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
.banner div.box{
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f8eb6b;
  background: #0000008c;
}
.banner div.box > div.titles{
  position: relative;
  display: flex;
}
.banner div.box > div.titles > h2{
  margin: 2vw 7vw;
  display: flex;
  color: transparent;
  height: fit-content;
}
.banner div.box>div.titles>h2:nth-child(2) {
    font-size: 4vw;
}
.banner div.box > div.titles > h2:before{
  overflow: hidden;
  background: linear-gradient(transparent, #f8eb6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: none;
}
.banner div.box>div.titles>h2:not(:nth-child(2)):after {
    transform: rotateX(-85deg) translateY(130px);
}
.banner div.box > div.titles > h2:after{
  position: absolute;
  box-shadow: 0px 15px 10px;
  color: transparent;
  background: #f8eb6bb8;
  transform: rotateX(-85deg) translateY(240px);
  filter: blur(20px);
}
.banner div.box > div.titles > h2:first-child:before{
  content: "Trolley"
}
.banner div.box > div.titles > h2:first-child:after{
  content: "Trolley"
}
.banner div.box > div.titles > h2:nth-child(2){
  font-size: 4vw;
}
.banner div.box > div.titles > h2:nth-child(2):before{
  content: "Home"
}
.banner div.box > div.titles > h2:nth-child(2):after{
  content: "Home"
}
.banner div.box > div.titles > h2:last-child{}
.banner div.box > div.titles > h2:last-child:before{
  content: "Favorite"
}
.banner div.box > div.titles > h2:last-child:after{
  content: "Favorite"
}
.banner div.box > div.titles > h2 > div:first-child {
    position: absolute;
    top: 1.2vw;
    background: linear-gradient(1deg, #f8eb6b -140%, transparent 50%);
    filter: blur(5px);
}
.banner div.box > div.titles > h2 > div:last-child {
    position: absolute;
    height: 10px;
    background: #bfbfbf87;
    transform: rotateX(65deg);
    border-radius: 0 0 50% 50%;
    filter: blur(3px);
}
.banner div.box > div.data{}
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