import Vue from 'vue'
import App from './App'

new Vue({
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
