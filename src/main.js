// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/'
import echarts from 'echarts'
import IconSvg from './components/icons/IconSvg'

Vue.prototype.$echarts = echarts
Vue.component('icon-svg', IconSvg)
Vue.use(VueAxios, axios)

// 导航守卫
// 使用router.beforeEach 注册一个全局前置守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    const userInfo = JSON.parse(localStorage.getItem('userid')) // 获取本地存储的信息
    if (userInfo) { // 通过获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
