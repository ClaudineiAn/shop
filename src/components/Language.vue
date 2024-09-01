<script setup>
import UkIcon from '../components/icons/IconUk.vue'
</script>

<template>
    <UkIcon id="iconuk" />
    <div id="languageBorder"></div>
</template>
<style>
#iconuk{
    width: 50px;
    z-index: 2;
}
#languageBorder{
    position: relative;
    left: -53px;
    overflow: hidden;
    width: 54px;
    height: 29px;
}
#languageBorder::before {
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
    animation: rotateBorder 3s linear infinite;
}

@keyframes rotateBorder {
  14.2% {
    height: 3px;
    margin-left: 50%;
    width: 100%;
    margin-top: 0;
  }
  28.4% {
    margin-top: 0;
    margin-left: calc(100% - 2px);
    width: calc(100% + 3px);
    height: calc(100% + -2px);
  }
  42.6% {
    margin-left: calc(100% - 1px);
    width: 3px;
    height: calc(100% + 2px);
  }
  56.8% {
    margin-top: 50%;
    height: 2px;
    margin-left: 50%;
    width: calc(50% + 3px);
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
    width: 2px;
    margin-top: -2px;
  }
  99.4% {
    height: 3px;
    margin-left: 1px;
    width: 2px;
    margin-top: -2px;
  }
}
</style>
<script>
</script>