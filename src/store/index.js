import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = { // 定义状态
  isLogin: false, // 是否登录
  userInfo: null, // 用户信息
  imgPath: null, // 头像地址
  isSDKReady: false, // TIM SDK 是否ready
  userID: 0,
  userSig: '',
  sdkAppID: 0,
  currentUserProfile: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
