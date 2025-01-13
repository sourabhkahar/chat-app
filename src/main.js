import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router';
import { pinia } from './store/user';
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Notifications)
app.mount('#app')