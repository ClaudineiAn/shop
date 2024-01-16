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
      document.querySelectorAll('.banner div.box>div.titles>h2>div:nth-child(4)').forEach(element => {
        element.setAttribute("style",`width:${element.parentNode.offsetWidth}px;height:${element.parentNode.offsetHeight}px`)
      })
      document.querySelectorAll('.banner div.box>div.titles>h2>div:last-child').forEach(element => {
        const translateY=element.parentNode.offsetHeight-10
        element.setAttribute("style",`width:${element.parentNode.offsetWidth}px;`)
        document.documentElement.style.setProperty('--main-title-ani-from', element.parentNode.offsetHeight-10+"px")
        document.documentElement.style.setProperty('--main-title-ani-to', element.parentNode.offsetHeight/2+"px")
      })
    };
    onMounted(() => {
      setProperMetrics()
      window.addEventListener('resize', setProperMetrics);

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
      </div>
      <RouterLink to="/books">
        <span>Scrow Down</span>
        <ArrowIcon id="arrowIcon" />
      </RouterLink>
    </div>
  </main>
</template>
<style>
:root {
  --main-title-ani-from: 0px;
  --main-title-ani-to: 0px;
}
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
  font-size: 2vw;
}
.banner div.box>div.titles>h2:nth-child(2) {
    font-size: calc(5vw + 10px);
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
  transform: rotateX(-85deg) translateY(calc(90px + 30vw));
  filter: blur(20px);
}
.banner div.box > div.titles > h2:first-child:before{
  content: "Trolley"
}
.banner div.box > div.titles > h2:first-child:after{
  content: "Trolley"
}
.banner div.box > div.titles > h2:nth-child(2){
  font-size: 5vw;
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
.banner div.box>div.titles>h2>div:nth-child(4) {
  position: absolute;
  top: 1.2vw;
  background: linear-gradient(1deg, #f8eb6b -140%, transparent 50%);
  filter: blur(5px);
}
.banner div.box > div.titles > h2 > div:last-child {
    position: absolute;
    height: 10px;
    background: #bfbfbf87;
    border-radius: 0 0 50% 50%;
    filter: blur(3px);
    transform: translateY(var(--main-title-ani-to)) rotateX(65deg);
    animation: main-title-ani 2s linear infinite
}
@Keyframes main-title-ani {
    0% {
        transform: translateY(var(--main-title-ani-from)) rotateX(65deg)
    }
    50% {
        opacity: 1;
        transform: translateY(var(--main-title-ani-to)) rotateX(65deg)
    }
    100% {
        opacity: 0;
    }
}
.banner div.box>div.titles>h2:not(:nth-child(2))>div:last-child{
  opacity: 0;
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
.lightning {
    width: 1px;
    height: 9px;
    background: white;
    opacity: 0;
}
.lightning1 {
    animation: lightning 10s linear infinite;
}
.lightning2 {
    margin: auto 0 auto 0;
    animation: lightning 10s 2s linear infinite;
}
@Keyframes lightning {
    0% {
        opacity:0.4;
    }
    8% {
        opacity:0;
    }
}
.lightning2:first-child {
    transform: rotate(120deg);
    height: calc(20px + 3vw);
}

.lightning2:nth-child(2) {
    transform: translateX(calc(12px + 3vw)) rotate(63deg);
    height: calc(20px + 3vw);
}

.lightning2:nth-child(3) {
    transform: translateX(calc(39px + 5.1vw)) rotate(112deg);
    height: calc(30px + 3.5vw);
}

.lightning1:nth-child(5) {
    transform: rotate(45deg)
}

.lightning1:nth-child(6) {
    transform: translateX(-4px) translateY(calc(10px + 1vw)) rotate(-25deg);
}

.lightning1:nth-child(7) {
    transform: translateX(calc(-4px - 0.4vw)) translateY(calc(14px + 2.5vw)) rotate(45deg);
}
</style>
<script>
</script>