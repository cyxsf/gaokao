import { setStore } from '../config/mUtils'

const RECORD_USER = 'RECORD_USER' // 用常量代替事件类型，使得代码更清晰
const GET_USERINFO = 'GET_USERINFO'
const OUT_LOGIN = 'OUT_LOGIN'
const SAVE_AVANDER = 'SAVE_AVANDER'
const TOGGLE_ISLOGIN = 'TOGGLE_ISLOGIN'
const TOGGLE_ISSDKREADY = 'TOGGLE_ISSDKREADY'

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
  // 获取用户信息
  [GET_USERINFO] (state, info) {
    state.userID = info.userID
    state.userSig = info.userSig
    state.sdkAppID = info.sdkAppID
  },
  [TOGGLE_ISLOGIN] (state, isLogin) {
    state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
  },
  [TOGGLE_ISSDKREADY] (state, isSDKReady) {
    state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
  },
  // 退出登录
  [OUT_LOGIN] (state) {
    state.userInfo = {}
    state.isLogin = false
  }
}
