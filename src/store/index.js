import Vue from 'vue'
import Vuex from 'vuex'
import conversation from './modules/conversation'
import group from './modules/group'
import user from './modules/user'
import friend from './modules/friend'
import blacklist from './modules/blacklist'
import {Message} from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false, // 是否登录
    current: Date.now(), // 当前时间
    message: undefined,
    intervalID: 0,
    userInfo: null, // 用户信息
    imgPath: null, // 头像地址
    isSDKReady: false, // TIM SDK 是否ready
    userID: 0,
    userSig: '',
    sdkAppID: 0,
    currentUserProfile: {}
  },
  getters: {
    hidden (state) {
      // eslint-disable-next-line no-unused-vars
      const temp = state.current
      if (typeof document.hasFocus !== 'function') {
        return document.hidden
      }
      return !document.hasFocus()
    }
  },
  mutations: {
    startComputeCurrent (state) {
      state.intervalID = setInterval(() => {
        state.current = Date.now()
      }, 500)
    },
    stopComputeCurrent (state) {
      clearInterval(state.intervalID)
      state.intervalID = 0
    },
    showMessage (state, options) {
      if (state.message) {
        state.message.close()
      }
      state.message = Message({
        message: options.message,
        type: options.type || 'success',
        duration: options.duration || 2000,
        offset: 40
      })
    }
  },
  modules: {
    user
  }
})
