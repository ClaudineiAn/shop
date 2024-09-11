<template>
  <div>
    <!-- Icon to toggle the popup below it -->
    <v-menu
      v-model="showPopup"
      :close-on-content-click="false"
      offset-y
      activator="parent"
    >
      <!-- Activator (icon button) -->
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
          @click="showPopup = !showPopup"
          class="popup-icon"
        >
          mdi-star
        </v-icon>
      </template>

      <!-- Popup content that opens directly below the icon -->
      <v-card>
        <v-card-title>
          <!-- Reset button -->
          <v-btn @click="resetColor" small>Reset</v-btn>

            <v-container>
				<!-- Dropdown Menu with vertical three-dots icon and animation -->
				<v-menu
				  v-model="dropdownOpen"
				  :close-on-content-click="false"
				  offset-y
				  activator="parent"
				  transition="scale-transition"
				>
				  <!-- Activator: Three-dots vertical icon button -->
				  <template v-slot:activator="{ on, attrs }">
					<v-btn small icon v-bind="attrs" v-on="on" @click="dropdownOpen">
					  <v-icon>mdi-dots-vertical</v-icon> <!-- Vertical three-dots icon -->
					</v-btn>
				  </template>

				  <!-- Dropdown content -->
				  <v-card>
					<v-list>
					  <v-list-item v-for="(item, index) in dropdownItems" :key="index">
						<v-list-item-title @click="fixedColors(index)">{{ item }}</v-list-item-title>
					  </v-list-item>
					</v-list>
				  </v-card>
				</v-menu>
			  </v-container>
        </v-card-title>

        <v-card-text>
          <!-- Central SVG icon -->
          <div class="text-center">
			<svg width="150px" height="150px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
			  <defs>
				<linearGradient id="gradient">
				  <stop offset="0%" :stop-color="selectedColor">
					<animate attributeName="stop-color" :values="selectedColor + ';' + selectedColor2" dur="5s" repeatCount="indefinite" />
				  </stop>
				</linearGradient>
			  </defs>
			  <path fill="url(#gradient)" d="M0 5.04V4l4-4h8l4 4v1.04L8 16 0 5.04zM2 5l6 8.5L4 5H2zm12 0h-2l-4 8.5L14 5zM6 5l2 6 2-6H6zM4 2L2 4h2l2-2H4zm8 0h-2l2 2h2l-2-2zM7 2L6 4h4L9 2H7z" fill-rule="evenodd" />
			</svg>

          </div>

          <!-- Gradient Color Bar -->
          <div class="color-bar mt-5">
            <input
              type="range"
              min="0"
              max="360"
              v-model="hue"
              @input="updateColor"
              class="gradient-slider"
            />
          </div>

          <!-- Save button -->
          <div
            v-if="showSaveButton"
            class="text-center mt-2"
          >
            <v-btn color="primary" @click="saveColor">Save</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      showPopup: false, // Controls visibility of the popup
      originalColor: 'hsl(54.47, 90.97%, 69.61%)', // Reset color
      originalColor2: 'hsl(42.61, 100%, 13.53%)', // Reset color
      originalHue: 54.47,
      selectedColor: 'hsl(0, 90.97%, 69.61%)',
      selectedColor2: 'hsl(0, 100%, 13.53%)',
      storedColor: false,
      storedColor2: false,
      storedHue: false,
      hue: 54.47,
      hueTo2: 10,
      dropdownItems: ['Personalized', 'Gold', 'Dark'],
	  dropdownOpen: false,
    };
  },
  computed: {
    showSaveButton() {
      // If storedColor exists, compare selectedColor to storedColor
      if (this.storedColor) {
        return this.selectedColor !== this.storedColor;
      }
      // If no storedColor, compare selectedColor to originalColor (reset color)
      return this.selectedColor !== this.originalColor;
    },
  },
  methods: {
    resetColor() {
	  this.hue=this.originalHue;
      this.selectedColor = this.originalColor;
      this.selectedColor2 = this.originalColor2;
    },
    updateColor() {
      this.selectedColor = `hsl(${this.hue}, 100%, 50%)`;
      this.selectedColor2 = `hsl(${this.hue-this.hueTo2}, 100%, 50%)`;
      Cookies.set('hue', this.hue, { expires: 7 }); // Store the hue in cookies
    },
    saveColor() {
      this.originalColor = this.selectedColor; // Save the selected color as original
      this.storedColor = this.selectedColor; // Update storedColor with the new selected color
      Cookies.set('hue', this.hue, { expires: 7 }); // Save the hue in cookies
    },
	fixedColors(index) {
	  if(index===0){
	    if(this.storedHue)
  	      this.hue=this.storedHue;
		else
  	      this.hue=this.originalHue;
		if(this.storedColor)
          this.selectedColor = this.storedColor;
		else
          this.selectedColor = this.originalColor;
	  }
	  if(index===1){
	    this.resetColor()
	  }
	  if(index===2){
		this.hue=20;
        this.selectedColor = `hsl(${this.hue}, 90.97%, 69.61%)`;
        this.selectedColor2 = `hsl(${this.hue-this.hueTo2}, 100%, 13.53%)`;
	  }
	}
  },
  created() {
    // Load hue from cookies on page load
    const savedHue = Cookies.get('hue');
    if (savedHue) {
      this.hue = parseInt(savedHue); // Set the hue from cookies
      this.storedColor = `hsl(${this.hue}, 90.97%, 69.61%)`;
      this.storedColor2 = `hsl(${this.hue2}, 100%, 13.53%)`;
	  this.storedHue = this.hue
      this.selectedColor = this.storedColor;
      this.selectedColor2 = this.storedColor2;
    }
  },
};
</script>

<style scoped>
.popup-icon {
  cursor: pointer;
}

/* Use this if you want to apply custom styles to the popup content */
.custom-popup-content {
  background-color: lightblue;
  border: 2px solid black;
  border-radius: 10px;
}

.color-bar {
  width: 100%;
}

.gradient-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
  border-radius: 5px;
  outline: none;
  opacity: 0.9;
  transition: opacity .15s ease-in-out;
}

.gradient-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.gradient-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}
</style>
