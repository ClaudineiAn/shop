import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

let app = createApp(App)
app.config.globalProperties.backend = 'http://127.0.0.1:3000'
app.use(router).use(vuetify).mount('#app')
