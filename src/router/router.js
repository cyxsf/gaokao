import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/other/login'
import Register from '@/pages/other/register'
import Forget from '@/pages/other/forget'
import Home from '@/pages/home/home'
import Basic from '@/pages/forecast/basic'
import Prefer from '@/pages/forecast/prefer'
import Final from '@/pages/forecast/final'
import User from '@/pages/user/user'
import Blog from '@/components/common/alertTip'

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
      path: '/register',
      meta: {
        title: '注册'
      },
      component: Register
    },
    {
      path: '/forget',
      meta: {
        title: '忘记密码'
      },
      component: Forget
    },
    {
      path: '/basic',
      meta: {
        title: '基本信息'
      },
      component: Basic
    },
    {
      path: '/prefer',
      meta: {
        title: '偏好信息'
      },
      component: Prefer
    },
    {
      path: '/final',
      meta: {
        title: '填报指南'
      },
      component: Final
    },
    {
      path: '/user',
      meta: {
        title: '个人中心'
      },
      component: User
    },
    {
      path: '/blog',
      meta: {
        title: 'Blog'
      },
      component: Blog
    }
  ]
})
