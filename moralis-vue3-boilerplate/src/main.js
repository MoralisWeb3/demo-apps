import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Moralis from './plugins/moralis'

createApp(App)
    .provide('$moralis', Moralis)
    .use(store)
    .mount('#app')
