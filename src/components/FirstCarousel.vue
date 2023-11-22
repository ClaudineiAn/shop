<script setup>
</script>

<template>
    <img @click="click($event)" class="productImage firstCarosel" :src="imgsrc" :alt="name"/>
</template>
<style>
.off{
    display: none;
}
.product{
    margin: 10px;
}
.product:nth-child(3) > div > .productImage{
    width: 400px;
    height: 500px;
}
.product:nth-child(2) > div > .productImage, .product:nth-child(4) > div > .productImage{
    width: 300px;
    height: 400px;
}
.product > div > .productImage.ani{
    transition: 1s;
}
.product > div > .productImage.ani.aniFadeIn{
    animation-name: aniFadeIn;
}
@keyframes aniFadeIn {
    from {opacity: 0;transform: translateX(-170px);}
    to {opacity: 1;transform: translateX(0px);}
}
.product:nth-child(6).ani.aniFadeOut{
    animation-name: aniFadeOut;
}
@keyframes aniFadeOut {
    from {opacity: 1;transform: translateX(0px);width: 100%;}
    to {opacity: 0;transform: translateX(170px);width: 0%;}
}
.product > div > .productImage.ani.aniFadeIn, .product:nth-child(6).ani.aniFadeOut{
    animation-duration: 1s;
}
</style>
<script>
import { defineComponent, ref } from "vue"
import axios from "axios"
export default defineComponent({
   props: {
    name: {
        type: String,
        default: () => ({}),
    },
    image: {
        type: String,
        default: () => ({}),
    },
 },
   computed:{
    imgsrc(){
        return "src/assets/images/"+this.image.split(',')[0]
    }
},
    methods: {
        click(ele){
            if(ele.target===document.querySelector(".product:nth-child(2) > div > .productImage")){
                let params = new URLSearchParams()
                for(let i = 0; i < document.querySelectorAll(".productImage.firstCarosel").length; i++)
                    params.append(i, document.querySelectorAll(".productImage.firstCarosel")[i].getAttribute("alt"))
                params.append("category", 10)
                const book=ref([])
                axios.post('http://localhost/shop/getbookvue', params).then((response)=>{
                    book.value=response.data
                    const divInnerProduct=document.createElement("div")
                    const divProduct=document.createElement("div")
                    divProduct.setAttribute("class", "product")
                    divProduct.appendChild(divInnerProduct)
                    const img=document.createElement("img")
                    img.setAttribute("class", "productImage firstCarosel ani aniFadeIn")
                    img.setAttribute("alt", book.value[0]["nome"])
                    img.setAttribute("src", "src/assets/images/"+book.value[0]["imagem"].split(',')[0])
                    divInnerProduct.appendChild(img)
                    document.querySelector(".product:nth-child(5)").classList.add("ani")
                    document.querySelector(".product:nth-child(5)").classList.add("aniFadeOut")
                    for (var i = 0; i < document.querySelectorAll(".product > div > .productImage").length-1; ++i)
                        document.querySelectorAll(".product > div > .productImage")[i].classList.add("ani");
                    ele.target.parentElement.parentElement.parentElement.insertBefore(divProduct, ele.target.parentElement.parentElement.parentElement.children[0]);
                    setTimeout(function(){document.querySelector(".product:nth-child(6)").classList.add("off")}, 1000);
                })
            }
        },
    },
})
</script>