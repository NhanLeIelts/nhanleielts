import { registerPlugins } from '@/plugins'
import router from './routes/index'
import store from './store'

import App from './App.vue'
import { createApp } from 'vue'

try {
  const user = await store.dispatch('getMe');
} catch (error) {
  console.error('Error:', error.message);
}

const app = createApp(App).use(store).use(router)

registerPlugins(app)

app.mount('#app')
