import Vue from 'vue'
import App from './App'
import router from './routes'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
