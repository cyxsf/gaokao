<template>
  <div>
    <headTop title='注册' back='登录'></headTop>
    <div class="header">志愿助手</div>
    <form action="" class="main">
      <div class="content">
        <span>手机号</span>
        <input class="input" type="text" placeholder="请输入手机号" v-model.number="phone"/>
      </div>
      <div class="content">
        <span>验证码</span>
        <input class="input" type="text" maxlength ="6" placeholder="请输入短信验证码" v-model.number="smsCode" />
        <button class="obtain" @click="getVerifyCode" v-show="!sendCode">点击获取</button>
        <button class="obtain" v-show="sendCode">{{computedTime}}s后重发</button>
      </div>
      <div class="content">
        <span>登录密码</span>
        <input class="input" :type="showPwdOne?'text':'password'" placeholder="请输入密码" v-model.trim="pwdOne" />
        <div class="icons"  @click="showPwdOne = !showPwdOne">
          <icon-svg class="icon" :icon-class="showPwdOne?'icon-yanjing_kai':'icon-yanjing_bi'"></icon-svg>
        </div>
      </div>
      <div class="content">
        <span>确认密码</span>
        <input class="input" :type="showPwdTwo?'text':'password'" placeholder="请再次输入密码" v-model.trim="pwdTwo" />
        <div class="icons" @click="showPwdTwo = !showPwdTwo">
          <icon-svg class="icon" :icon-class="showPwdTwo?'icon-yanjing_kai':'icon-yanjing_bi'"></icon-svg>
        </div>
      </div>
    </form>
    <div class="btn-fa">
      <button class="btn" @click="userReg">立即注册</button>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/common/header'
// import {mobileCode, checkExsis, sendLogin} from '../../service/getData'
export default {
  data () {
    return {
      phone: '', // 手机号码
      smsCode: '', // 短信验证码
      pwdOne: '', // 密码
      pwdTwo: '', // 二次密码
      computedTime: 0, // 倒数计时
      sendCode: false, // 获取验证码
      validate_token: '', // 获取短信时返回的验证值，注册时需要
      showAlert: false, // 显示提示组件
      alertText: '', // 提示内容
      userInfo: '', // 获取到的用户信息
      showPwdOne: false, // 默认不显示第一个密码
      showPwdTwo: false // 默认不显示第二个密码
    }
  },
  components: {
    headTop
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.phone)
    }
  },
  methods: {
    // 获取短信验证码
    getVerifyCode () {
      if (this.rightPhoneNumber) {
        this.sendCode = true
        this.computedTime = 30
        this.timer = setInterval(() => {
          this.computedTime--
          if (this.computedTime === 0) {
            clearInterval(this.timer)
            this.sendCode = false
          }
        }, 1000)
        /* 判断用户是否存在
        let exsis = checkExsis(this.phone, 'mobile')
        if (exsis.message) {
          this.showAlert = true
          this.alertText = exsis.message
          return
        }

        // 发送短信验证码
        let res = mobileCode(this.phone)
        this.validate_token = res.validate_token
        */
      }
    },
    // 进行注册
    userReg () {
      /*
      if (!this.rightPhoneNumber) {
        this.showAlert = true
        this.alertText = '手机号码不正确'
        return
      } else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
        this.showAlert = true
        this.alertText = '短信验证码不正确'
        return
      }
      手机号登录
      this.userInfo = sendLogin(this.mobileCode, this.phone, this.validate_token)
      if (!this.userInfo.user_id) {
        this.showAlert = true
        this.alertText = this.userInfo.message
      } else {
        this.RECORD_USERINFO(this.userInfo)
        this.$router.push('/login')
      } */
      let uid = this.phone
      let pwdOne = this.pwdOne
      let pwdTwo = this.pwdTwo
      if (!uid) {
        this.showAlert = true
        this.alertText = '请输入手机号'
        return
      } else if (!pwdOne || !pwdTwo) {
        this.showAlert = true
        this.alertText = '请输入密码'
        return
      } else if (pwdOne !== pwdTwo) {
        this.showAlert = true
        this.alertText = '两次输入的密码不一致'
        this.iconType = false
        return
      }
      this.axios.post('/api/user/userSelect', {
        uid
      }).then(res => {
        console.log(res.data)
        if (res.data.length !== 0) {
          this.showAlert = true
          this.alertText = '账号已存在'
          this.iconType = false
        } else {
          this.axios.post('/api/user/userReg', {
            uid, pwdOne
          }).then(res => {
            this.$router.push('/login')
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    closeTip () {
      this.showAlert = false
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/style/reg_login.scss';
</style>
