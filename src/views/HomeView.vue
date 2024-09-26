<script>
import { onMounted } from 'vue'
import ArrowIcon from '../components/icons/IconArrow.vue'
import {setProperMetrics,assemble} from '../assets/js/mainPageAssemble.js'
export default {
	data() {
		return {
			sections: [
				{ bg: 'bg1.jpg' },
				{ bg: 'bg2.jpg' },
				{ bg: 'bg3.jpg' },
				{ bg: 'bg4.jpg' },
				{ bg: 'bg5.jpg' }
			],
			products: Array.from({ length: 25 }, (_, i) => ({
				image: `https://via.placeholder.com/200x200?text=Product+${i+1}`
			})),
			currentBackground: 'bg1.jpg'
		};
	},
	methods: {
		updateBackground() {
			const sections = document.querySelectorAll('.section');
			const windowHeight = window.innerHeight;
			let newBackground = this.currentBackground;
			sections.forEach((section, index) => {
				const rect = section.getBoundingClientRect();
				if (rect.top <= windowHeight * 0.2 && rect.bottom >= windowHeight * 0.8) {
					newBackground = this.sections[index].bg;
				}
			});
			if (newBackground !== this.currentBackground) {
				this.currentBackground = newBackground;
			}
		},
		resizeImages() {
			const images = document.querySelectorAll('.product-grid img');
			images.forEach(img => {
				if (img.offsetWidth > 200) {
					img.style.width = '200px';
					img.style.height = 'auto';
				}
			});
		}
	},
	mounted() {
		window.addEventListener('scroll', this.updateBackground);
		window.addEventListener('resize', this.resizeImages);
		this.resizeImages(); // Run on load
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.updateBackground);
		window.removeEventListener('resize', this.resizeImages);
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
        <div class="fixed-bg" :style="{ backgroundImage: `url(${currentBackground})` }"></div>
			<section class="section" v-for="(section, index) in sections" :key="index">
				<div class="product-grid">
					<img v-for="(product, i) in products" :key="i" :src="product.image" :alt="`Product ${i}`" />
				</div>
			</section>
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