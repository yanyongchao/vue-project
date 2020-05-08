import Vue from 'vue'
import App from './App'
import router from './routes'
import './plugins/axios'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
