<script>
import { onMounted } from 'vue'
import ArrowIcon from '../components/icons/IconArrow.vue'
import {setProperMetrics,assemble} from '../assets/js/mainPageAssemble.js'
export default {
	            data() {
                return {
                    sections: [
                        { bg: 'bg1.jpg', searchQuery: '', sortOptionsVisible: false, selectedSort: '', products: [] },
                        { bg: 'bg2.jpg', searchQuery: '', sortOptionsVisible: false, selectedSort: '', products: [] },
                        { bg: 'bg3.jpg', searchQuery: '', sortOptionsVisible: false, selectedSort: '', products: [] },
                        { bg: 'bg4.jpg', searchQuery: '', sortOptionsVisible: false, selectedSort: '', products: [] },
                        { bg: 'bg5.jpg', searchQuery: '', sortOptionsVisible: false, selectedSort: '', products: [] }
                    ],
                    sortOptions: ['Option 1', 'Option 2', 'Option 3'],
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
                },
                toggleSortOptions(sectionIndex) {
                    this.sections[sectionIndex].sortOptionsVisible = !this.sections[sectionIndex].sortOptionsVisible;
                },
                selectSortOption(sectionIndex, option) {
                    this.sections[sectionIndex].selectedSort = option;
                    this.sections[sectionIndex].sortOptionsVisible = false;
                    // Save the selected sort option in a cookie
                    document.cookie = `sortOption_${sectionIndex}=${option};path=/`;
                },
                shareSection(sectionIndex) {
                    const searchQuery = this.sections[sectionIndex].searchQuery;
                    const shareLink = `${window.location.origin}${window.location.pathname}#section-${sectionIndex+1}?query=${encodeURIComponent(searchQuery)}`;
                    navigator.clipboard.writeText(shareLink).then(() => {
                        alert('Share link copied: ' + shareLink);
                    });
                },
                loadSortOptions() {
                    this.sections.forEach((section, index) => {
                        const cookieValue = this.getCookie(`sortOption_${index}`);
                        if (cookieValue) {
                            section.selectedSort = cookieValue;
                        } else {
                            section.selectedSort = this.sortOptions[0]; // Default to the first option
                        }
                    });
                },
                getCookie(name) {
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2) return parts.pop().split(';').shift();
                }
            },
            mounted() 
				document.querySelector(`.data`).addEventListener('scroll', this.updateBackground);
				document.querySelector(`.data`).addEventListener('resize', this.resizeImages);
				this.resizeImages(); // Run on load
                this.loadSortOptions(); // Load saved sort options from cookies
                // Load search query from URL
                const urlParams = new URLSearchParams(window.location.search);
                const query = urlParams.get('query');
                const hash = window.location.hash;
                if (query && hash) {
                    const sectionIndex = parseInt(hash.replace('#section-', '')) - 1;
                    if (this.sections[sectionIndex]) {
                        this.sections[sectionIndex].searchQuery = query;
                    }
                }
            },
            beforeUnmount() {
				document.querySelector(`.data`).removeEventListener('scroll', this.updateBackground);
				document.querySelector(`.data`).removeEventListener('resize', this.resizeImages);
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
			<section class="section" v-for="(section, index) in sections" :key="index" :id="`section-${index+1}`">
				<div class="control-panel">
					<v-text-field v-model="section.searchQuery" label="Search Products"></v-text-field>
					<v-btn icon @click="toggleSortOptions(index)">
						<v-icon>{{ section.sortOptionsVisible ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
					</v-btn>
					<v-btn icon @click="shareSection(index)">
						<v-icon>mdi-share</v-icon>
					</v-btn>
				</div>
				<v-menu v-if="section.sortOptionsVisible">
					<v-list>
						<v-list-item v-for="(option, i) in sortOptions" :key="i" @click="selectSortOption(index, option)">
							<v-list-item-title>{{ option }}</v-list-item-title>
							<v-icon v-if="section.selectedSort === option">mdi-check</v-icon>
						</v-list-item>
					</v-list>
				</v-menu>
				<div class="product-grid">
					<div v-for="(product, i) in products" :key="i">
						<img :src="product.image" :alt="`Product ${i}`" />
					</div>
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