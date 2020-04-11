<template>
  <div class="register-page">
    <headTop title='注册' back='登录'></headTop>
    <div class="header">志愿助手</div>
    <form>
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
    <alert-tip v-if="showAlert" @closeTip="closeTip"  @submitTip="closeTip" :alertText="alertText" :iconType ="iconType"></alert-tip>
  </div>
</template>
<script>
import headTop from '@/components/common/header'
import alertTip from '@/components/common/alertTip'
export default {
  data () {
    return {
      phone: '', // 手机号码
      smsCode: '', // 输入的短信验证码
      pwdOne: '', // 密码
      pwdTwo: '', // 二次密码
      computedTime: 0, // 倒数计时
      sendCode: false, // 获取验证码
      mobileCode: '', // 收到的短信验证码
      showAlert: false, // 显示提示组件
      iconType: false, // 提示框类型
      alertText: '', // 提示内容
      userInfo: '', // 获取到的用户信息
      showPwdOne: false, // 默认不显示第一个密码
      showPwdTwo: false // 默认不显示第二个密码
    }
  },
  components: {
    headTop,
    alertTip
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
        let phone = this.phone
        this.axios.get('/api/user/sendCode', {
          params: {
            phone
          }}).then(res => {
          this.mobileCode = res.data.smscode
        })
        this.computedTime = 30
        this.timer = setInterval(() => {
          this.computedTime--
          if (this.computedTime === 0) {
            clearInterval(this.timer)
            this.sendCode = false
          }
        }, 1000)
      }
    },
    // 进行注册
    userReg () {
      let uid = this.phone
      let pwdOne = this.pwdOne
      let pwdTwo = this.pwdTwo
      if (!uid) {
        this.showAlert = true
        this.iconType = true
        this.alertText = '请输入手机号'
        return
      } else if (!pwdOne || !pwdTwo) {
        this.showAlert = true
        this.iconType = true
        this.alertText = '请输入密码'
        return
      } else if (!this.rightPhoneNumber) {
        this.showAlert = true
        this.alertText = '手机号码不正确'
        return
      // eslint-disable-next-line eqeqeq
      } else if (this.smsCode != this.mobileCode) {
        this.showAlert = true
        this.alertText = '短信验证码不正确'
        return
      } else if (pwdOne !== pwdTwo) {
        this.showAlert = true
        this.alertText = '两次输入的密码不一致'
        return
      }
      this.axios.post('/api/user/userSelect', {
        uid
      }).then(res => {
        console.log(res.data)
        if (res.data.length !== 0) {
          this.showAlert = true
          this.alertText = '账号已存在'
        } else {
          this.axios.post('/api/user/userReg', {
            uid, pwdOne
          }).then(res => {
            this.axios.post('/api/user/basInfo', {
              uid
            }).then((res) => {})
            this.$router.push('/login')
          })
        }
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
.register-page {
  padding-top: 80px;
}
</style>
