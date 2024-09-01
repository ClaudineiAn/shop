<script setup>
import Comp from "./Comp.vue"
</script>

<template>
    <img class="productImage" :src="imgsrc" :alt="productNome" :title="productNome" />
    <h3 :title="productNome">{{ productNameMin }}</h3>
    <Comp class="d-flex score">{{scoreStarTemplate}}</Comp>
    <p :title="description">{{ descMin }}</p>
</template>
<style>
.productImage{
    width: 200px;
    height: 300px;
}
p.score > div{
    margin-right: 0.3vw;
}
</style>
<script>
export default {
   props: {
    productNome: {
        type: String,
        default: () => ({}),
    },
    score: {
        type: String,
        default: () => ({}),
    },
    image: {
        type: String,
        default: () => ({}),
    },
    descMin: {
        type: String,
        default: () => ({}),
    },
    description: {
        type: String,
        default: () => ({}),
    },
    productNameMin: {
        type: String,
        default: () => ({}),
    },
    category: {
        type: String,
        default: () => ({}),
    },
    scoreStar: {
        type: String,
        default: () => ({}),
    }
   },
   computed:{
    imgsrc(){
        return "src/assets/images/"+this.image.split(',')[0]
    },
    scoreStarTemplate(){
        return this.scoreStar
    }
   }
 }
</script>