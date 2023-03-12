import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import mock from './mock'
import Notifications from '@kyvg/vue3-notification'


import './assets/main.css'

if (import.meta.env.DEV) {
  mock()
} else {
  // TODO Think about production mode.
  mock()
}

const app = createApp(App)

app.use(Notifications)
app.use(createPinia())
app.use(router)

app.mount('#app')
