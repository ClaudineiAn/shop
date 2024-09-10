<template>
  <div>
    <!-- Icon to open popup -->
    <v-icon @click="showPopup = true">mdi-star</v-icon>

    <!-- Popup -->
    <v-dialog v-model="showPopup" persistent max-width="200" max-height="200">
      <v-card>
        <v-card-title>
          <!-- Reset button -->
          <v-btn @click="resetColor" small>Reset</v-btn>

          <!-- Down arrow with dropdown -->
          <v-menu
            activator="parent"
            :close-on-content-click="false"
            v-slot:activator="{ on, attrs }"
          >
            <v-btn small icon v-bind="attrs" v-on="on">
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
            <v-list>
              <v-list-item v-for="(item, index) in dropdownItems" :key="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
          <div v-if="selectedColor !== originalColor" class="text-center mt-2">
            <v-btn color="primary" @click="saveColor">Save</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'; // Import js-cookie library

export default {
  data() {
    return {
      showPopup: false,
      originalColor: 'hsl(0, 100%, 50%)', // Initial color
      selectedColor: 'hsl(0, 100%, 50%)', // Initial selected color
      hue: 0, // Initial hue value (0 corresponds to red)
      dropdownItems: ['Option 1', 'Option 2', 'Option 3'],
    };
  },
  methods: {
    resetColor() {
      this.hue = 0; // Reset the hue slider to the starting point
      this.selectedColor = this.originalColor; // Reset the SVG color to the original color
      Cookies.set('hue', this.hue, { expires: 7 }); // Update the cookie when resetting
    },
    updateColor() {
      this.selectedColor = `hsl(${this.hue}, 100%, 50%)`; // Update the color based on the hue
      Cookies.set('hue', this.hue, { expires: 7 }); // Store the hue in cookies for 7 days
    },
    saveColor() {
      this.originalColor = this.selectedColor; // Save the selected color
      this.showPopup = false; // Close the popup
    },
  },
  created() {
    // Load the hue from cookies when the page is loaded
    const savedHue = Cookies.get('hue');
    if (savedHue) {
      this.hue = parseInt(savedHue); // Set the hue from cookies
      this.selectedColor = `hsl(${this.hue}, 100%, 50%)`; // Update the SVG color
    }
  },
};
</script>

<style scoped>
.v-dialog {
  width: 200px;
  height: 200px;
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
