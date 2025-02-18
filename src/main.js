import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './components'
import './library'
import './plugins'
import '~/filters'

Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

new Vue({
    el: '#app',
    store,
    router,
    ...App
})
