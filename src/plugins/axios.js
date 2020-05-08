// 导入封装axios的文件
import Vue from 'vue'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let loadingNum = 0

NProgress.configure({ showSpinner: false })

function startLoading () {
  if (loadingNum === 0) {
    NProgress.start()
  }
  loadingNum++
}
function endLoading () {
  loadingNum--
  if (loadingNum <= 0) {
    NProgress.done()
  }
}

axios.interceptors.request.use(
  config => {
    startLoading()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    endLoading()
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = axios
