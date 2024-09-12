<template>
  <div class="colorPopUp">
    <!-- Icon to toggle the popup below it -->
    <v-menu
      v-model="showPopup"
      :close-on-content-click="false"
      offset-y
      activator="parent"
    >
      <!-- Activator (icon button) -->
      <template v-slot:activator="{ on, attrs }">
        <svg v-bind="attrs" v-on="on" @click="showPopup = !showPopup" class="popup-icon" width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill="url(#gradientUp)" fill-rule="evenodd" clip-rule="evenodd" d="M16.2196 13.9555C17.2636 10.0595 14.7915 6.03562 10.731 4.94761C6.14492 3.71877 -0.364424 6.91181 1.08416 11.0092C1.56325 12.3643 2.48817 12.6814 4.23088 12.7061L4.33978 12.7075C5.26123 12.7191 5.52041 12.7792 5.59794 12.9054C5.72536 13.1128 5.72679 13.4439 5.58387 14.3543C5.51634 14.7845 5.49418 14.9355 5.46808 15.1703C5.30897 16.6011 5.55075 17.7169 6.48838 18.7268C9.41611 21.8802 15.0412 18.3535 16.2196 13.9555ZM2.96979 10.3425C2.24104 8.28126 6.9056 5.99314 10.2134 6.87946C13.2298 7.68772 15.0393 10.6331 14.2878 13.4379C13.4497 16.5656 9.50636 19.0379 7.95406 17.366C7.47464 16.8496 7.35504 16.2977 7.45583 15.3913C7.47737 15.1975 7.49709 15.0631 7.55967 14.6645C7.77887 13.2683 7.77611 12.6302 7.30206 11.8585C6.70834 10.8921 6.00236 10.7282 4.36491 10.7076L4.25922 10.7063C3.29465 10.6926 3.06582 10.6141 2.96979 10.3425Z"/>
			<path fill="url(#gradientUp)" d="M6 10C5.30964 10 4.75 9.44036 4.75 8.75C4.75 8.05964 5.30964 7.5 6 7.5C6.69036 7.5 7.25 8.05964 7.25 8.75C7.25 9.44036 6.69036 10 6 10Z"/>
			<path fill="url(#gradientUp)" d="M9.75 10C9.05964 10 8.5 9.44036 8.5 8.75C8.5 8.05964 9.05964 7.5 9.75 7.5C10.4404 7.5 11 8.05964 11 8.75C11 9.44036 10.4404 10 9.75 10Z"/>
			<path fill="url(#gradientUp)" d="M12.25 13C11.5596 13 11 12.4404 11 11.75C11 11.0596 11.5596 10.5 12.25 10.5C12.9404 10.5 13.5 11.0596 13.5 11.75C13.5 12.4404 12.9404 13 12.25 13Z"/>
			<path fill="url(#gradientUp)" d="M10.75 16.5C10.0596 16.5 9.5 15.9404 9.5 15.25C9.5 14.5596 10.0596 14 10.75 14C11.4404 14 12 14.5596 12 15.25C12 15.9404 11.4404 16.5 10.75 16.5Z"/>
			<path fill="url(#gradientUp)" d="M14.3707 3.60451C14.8605 3.34411 15.466 3.52923 15.7253 4.01686C15.7308 4.02727 15.7362 4.03777 15.7413 4.04836L19.8336 12.4482C19.9869 12.7628 19.8635 13.1422 19.5545 13.3065C19.2452 13.471 18.8612 13.3618 18.6847 13.0592L13.9771 4.98893C13.6993 4.5127 13.8602 3.90144 14.3364 3.62364C14.3477 3.61704 14.3592 3.61066 14.3707 3.60451Z"/>
			<path fill="url(#gradientUp)" fill-rule="evenodd" clip-rule="evenodd" d="M12.5375 3.48434C13.0238 4.39897 13.8434 4.65522 14.6347 4.23444C15.4262 3.81362 15.6726 2.99053 15.1863 2.07592C14.6289 1.0276 13.438 0.0775719 12.6482 0.497483C11.8585 0.917395 11.9801 2.43602 12.5375 3.48434ZM13.4204 3.01486C13.2581 2.70947 13.1315 2.26269 13.1007 1.8773C13.0806 1.62643 13.1063 1.45889 13.1151 1.40204C13.1171 1.38903 13.1182 1.38181 13.1176 1.38073C13.1183 1.38172 13.1245 1.38462 13.1356 1.38985C13.1866 1.41372 13.3408 1.48594 13.5391 1.64416C13.8414 1.88525 14.141 2.24 14.3034 2.54539C14.5316 2.97464 14.4668 3.19118 14.1653 3.3515C13.8641 3.51165 13.6488 3.44435 13.4204 3.01486Z"/>
		</svg>
      </template>

      <!-- Popup content that opens directly below the icon -->
      <v-card class="boxCard">
        <v-card-title class="btnBox">
          <!-- Reset button -->
          <v-btn class="reset" @click="resetColor" small>Reset</v-btn>

            <v-container class="moreColorsBox">
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
					<v-btn class="moreColorsBtn" small icon v-bind="attrs" v-on="on" @click="dropdownOpen">
					  <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<linearGradient id="gradientUp">
							<stop offset="0%" stop-color="#F8EB6B">
							  <animate attributeName="stop-color" :values="`${color1}; ${color2}; ${color1}`" dur="5s" repeatCount="indefinite" />
							</stop>
						  </linearGradient>
						<path fill="url(#gradientUp)" d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z"/>
						<path fill="url(#gradientUp)" d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z"/>
						<path fill="url(#gradientUp)" d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z"/>
					  </svg>
					</v-btn>
				  </template>

				  <!-- Dropdown content -->
				  <v-card>
					<v-list class="moreColorsList">
					  <v-list-item class="moreColorsIten" v-for="(item, index) in dropdownItems" :key="index">
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
				<linearGradient id="gradColor">
				  <stop offset="0%" :stop-color="selectedColor">
					<animate attributeName="stop-color" :values="selectedColor + ';' + selectedColor2 + ';' + selectedColor" dur="5s" repeatCount="indefinite" />
				  </stop>
				</linearGradient>
			  </defs>
			  <path fill="url(#gradColor)" d="M0 5.04V4l4-4h8l4 4v1.04L8 16 0 5.04zM2 5l6 8.5L4 5H2zm12 0h-2l-4 8.5L14 5zM6 5l2 6 2-6H6zM4 2L2 4h2l2-2H4zm8 0h-2l2 2h2l-2-2zM7 2L6 4h4L9 2H7z" fill-rule="evenodd" />
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
            <v-btn class="save" color="primary" @click="saveColor">Save</v-btn>
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
	  color1: '',
      color2: '',
    };
  },
  mounted() {
    this.color1 = getComputedStyle(document.documentElement).getPropertyValue('--color1').trim();
    this.color2 = getComputedStyle(document.documentElement).getPropertyValue('--color2').trim();
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
      this.selectedColor = `hsl(${this.hue}, 90.97%, 69.61%)`;
      this.selectedColor2 = `hsl(${this.hue-this.hueTo2}, 100%, 13.53%)`;
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
.boxCard{
	background: #000000e8 !important;
    border: 1px solid var(--color1);
}

.boxCard .btnBox{
	display: flex;
    align-items: center;
    padding: 6px 0;
}

.boxCard .reset{
	box-shadow: 0 0;
    padding: 0;
    margin-left: 10px;
    color: var(--color1);
    background: transparent;
}

.boxCard .reset:hover{
	box-shadow: 0 0;
    background: var(--color2) !important;
}

.boxCard .moreColorsBox{
	padding: 0;
    display: flex;
    justify-content: flex-end;
}

.boxCard .moreColorsBtn{
	box-shadow: 0 0;
    width: 0 !important;
    margin-right: 22px;
}

.moreColorsList{
	background: black !important;
    color: var(--color1);
    border: 1px solid;
}

.moreColorsIten{
	cursor: pointer;
}

.moreColorsIten:hover{
	background: var(--color2);
}

.boxCard .save {
    background: transparent !important;
    color: var(--color1) !important;
    border: 1px solid;
}

.boxCard .save:hover {
    background: var(--color2) !important;
}

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
