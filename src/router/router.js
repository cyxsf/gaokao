import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/other/login'
import Register from '@/pages/other/register'
import Forget from '@/pages/other/forget'
import Home from '@/pages/home/home'
import Basic from '@/pages/forecast/basic'
import Final from '@/pages/forecast/final'
import User from '@/pages/user/user'
import UserInfo from '@/pages/user/userinfo'
import EvalHome from '@/pages/evaluate/home'
import Holland from '@/pages/evaluate/holland'
import EvalResult from '@/pages/evaluate/result'
import Province from '@/components/common/province'
import sendMes from '@/pages/community/message/sendMes'
import seniors from '@/pages/seniors/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '主页面',
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
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
      path: '/province',
      meta: {
        title: '省份选择'
      },
      component: Province
    },
    {
      path: '/basic',
      meta: {
        title: '基本信息'
      },
      component: Basic
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
      path: '/user/info',
      meta: {
        title: '账户信息'
      },
      component: UserInfo
    },
    {
      path: '/evalhome',
      meta: {
        title: '测评首页'
      },
      component: EvalHome
    },
    {
      path: '/holland',
      meta: {
        title: '霍兰德兴趣测评'
      },
      component: Holland
    },
    {
      path: '/evalresult',
      meta: {
        title: '测评结果'
      },
      component: EvalResult
    },
    {
      path: '/sendmes',
      meta: {
        title: '发送消息'
      },
      component: sendMes
    },
    {
      path: '/seniors',
      meta: {
        title: '学长学姐'
      },
      component: seniors
    }
  ]
})

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

export default router
