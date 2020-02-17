import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = { // 定义状态
  isLogin: false, // 是否登录
  userInfo: null // 用户信息
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
