import { setStore } from '../config/mUtils'

const RECORD_USER = 'RECORD_USER' // 用常量代替事件类型，使得代码更清晰
const GET_USERINFO = 'GET_USERINFO'
const OUT_LOGIN = 'OUT_LOGIN'
const SAVE_AVANDER = 'SAVE_AVANDER'

export default {
  // 记录用户信息
  [RECORD_USER] (state, info) {
    state.userInfo = info
    state.isLogin = true
    setStore('userid', info.userid)
  },
  // 保存图片
  [SAVE_AVANDER] (state, imgPath) {
    state.imgPath = imgPath
  },
  // 获取用户信息存入vuex
  [GET_USERINFO] (state, info) {
    console.log(info)
    if (state.info && state.info.userid) {
      return
    }
    if (!state.isLogin) {
      return
    }
    if (!info.message) {
      state.userInfo = { ...info }
    } else {
      state.userInfo = null
    }
  },
  // 退出登录
  [OUT_LOGIN] (state) {
    state.userInfo = {}
    state.isLogin = false
  }
}
