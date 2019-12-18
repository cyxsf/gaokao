import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/other/login'
import Register from '@/pages/other/register'
import Home from '@/pages/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '主页面'
      },
      component: Home
    },
    {
      path: '/login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/reg',
      meta: {
        title: '注册'
      },
      component: Register
    }
  ]
})
