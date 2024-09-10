<template>
  <v-container>
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

          <!-- Color bar -->
          <div class="mt-5">
            <v-slider v-model="selectedColor" :track-fill-color="selectedColor" :tick-labels="colorLabels" thumb-label>
            </v-slider>
          </div>

          <!-- Save button -->
          <div v-if="selectedColor !== originalColor" class="text-center mt-2">
            <v-btn color="primary" @click="saveColor">Save</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      originalColor: '#000000',
      selectedColor: '#000000',
      dropdownItems: ['Option 1', 'Option 2', 'Option 3'],
      colorLabels: ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
    };
  },
  methods: {
    resetColor() {
      this.selectedColor = this.originalColor;
    },
    saveColor() {
      this.originalColor = this.selectedColor;
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
.v-dialog {
  width: 200px;
  height: 200px;
}

.v-slider {
  margin: 10px 0;
}
</style>
