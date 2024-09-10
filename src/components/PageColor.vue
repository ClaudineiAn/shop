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
            <svg :fill="selectedColor" width="150" height="150" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 3.3L18.74 20H5.26L12 5.3z" />
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
      originalColor: 'hsl(70, 100%, 50%)', // Reset color
      originalHue: 70,
      selectedColor: 'hsl(0, 100%, 50%)', // Initial selected color
      storedColor: null, // Stored color from cookies (initially null)
      storedHue: null,
      hue: 0, // Initial hue value (corresponds to red)
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
	  this.hue=originalHue;
      this.selectedColor = `hsl(${this.hue}, 100%, 50%)`; // Reset the SVG color
    },
    updateColor() {
      this.selectedColor = `hsl(${this.hue}, 100%, 50%)`; // Update selected color based on hue
    },
    saveColor() {
      this.storedColor = this.selectedColor; // Update storedColor with the new selected color
      Cookies.set('hue', this.hue, { expires: 7 }); // Save the hue in cookies
    },
	fixedColors(index) {
	  if(index===0){
	  console.log(0)
	    this.hue=storedHue;
        this.selectedColor = `hsl(${this.hue}, 100%, 50%)`; // Set the selected color
	  }
	  if(index===1){
	  console.log(1)
	    resetColor()
	  }
	  if(index===2){
	  console.log(2)
		this.hue=20;
		this.selectedColor = `hsl(${this.hue}, 100%, 50%)`; // Update selected color based on hue
	  }
	}
  },
  created() {
    // Load hue from cookies on page load
    const savedHue = Cookies.get('hue');
    if (savedHue) {
      this.hue = parseInt(savedHue); // Set the hue from cookies
      this.storedColor = `hsl(${this.hue}, 100%, 50%)`; // Set the stored color
	  this.storedHue = this.hue
      this.selectedColor = this.storedColor; // Set the selected color
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
