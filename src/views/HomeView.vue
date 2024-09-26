<script>
import { onMounted } from 'vue'
import ArrowIcon from '../components/icons/IconArrow.vue'
import {setProperMetrics,assemble} from '../assets/js/mainPageAssemble.js'
export default {
 data() {
    return {
      sections: [
        { name: 'Home', bgClass: 'bg-home' },
        { name: 'Categories', bgClass: 'bg-categories' },
        { name: 'Products', bgClass: 'bg-products' },
        { name: 'About Us', bgClass: 'bg-about' },
        { name: 'Contact', bgClass: 'bg-contact' }
      ]
    };
  },
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.2 && rect.bottom >= window.innerHeight * 0.2) {
          this.changeBackground(section);
        }
      });
    },
    changeBackground(section) {
      document.querySelector('.data').style.backgroundColor = section.classList.contains('bg-home')
        ? 'red'
        : section.classList.contains('bg-categories')
        ? 'blue'
        : section.classList.contains('bg-products')
        ? 'black'
        : section.classList.contains('bg-about')
        ? 'orange'
        : 'yellow';
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
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
			<v-app>
				<v-main>
				  <v-container>
					<section v-for="(section, index) in sections" 
							 :key="index" 
							 :id="'section-' + index" 
							 class="section" 
							 :class="section.bgClass">
					  <v-row>
						<v-col v-for="(product, i) in 25" :key="i" cols="2">
						  <v-img :src="`/path/to/image-${i+1}.jpg`" class="product-image"></v-img>
						</v-col>
					  </v-row>
					</section>
				  </v-container>
				</v-main>
			  </v-app>
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