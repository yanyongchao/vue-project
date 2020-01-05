import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// webpackPrefetch 配置页面加载完毕是否引用文件
// webpackChunkName: 配置chunkName
const routes = [
  {
    path: '/',
    component: () => import(/* webpackPrefetch:true, webpackChunkName: 'Home' */'@/views/Home.vue')
  },
  {
    path: '/about',
    component: () => import(/* webpackPrefetch:true, webpackChunkName: 'About' */'@/views/About.vue')
  }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router