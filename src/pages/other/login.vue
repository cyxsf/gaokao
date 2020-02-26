<template>
  <div>
    <headTop title='登录'></headTop>
    <div class="header">志愿助手</div>
    <form action="">
      <div class="content">
        <span>账号</span>
        <input class="input" type="text" placeholder="请输入手机号" v-model.number="phone"/>
      </div>
      <div class="content">
        <span>密码</span>
        <input class="input" :type="showPwd?'text':'password'" placeholder="请输入密码" v-model.trim="pwd" />
        <div class="icons"  @click="showPwd = !showPwd">
          <icon-svg class="icon" :icon-class="showPwd?'icon-yanjing_kai':'icon-yanjing_bi'"></icon-svg>
        </div>
      </div>
    </form>
    <div class="btn-fa">
      <button class="btn" @click="userLogin">登录</button>
    </div>
    <div class="foot">
      <span class="goreg" @click="goToAddress('/register')">立即注册</span>
      <span class="forget" @click="goToAddress('/forget')">忘记密码？</span>
    </div>
    <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText" :iconType ="iconType"></alert-tip>
  </div>
</template>
<script>
import headTop from '@/components/common/header'
import alertTip from '@/components/common/alertTip'
export default {
  data () {
    return {
      phone: '', // 手机号码
      pwd: '', // 密码
      showPwd: false, // 默认密码不显示
      showAlert: false, // 提示框
      alertText: '', // 提示内容
      iconType: true // 提示框里icon类型
    }
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    // 登录验证
    userLogin () {
      let uid = this.phone
      let pwd = this.pwd
      let userid = String(this.phone)
      if (!uid) {
        this.showAlert = true
        this.alertText = '请输入手机号'
        return
      } else if (!pwd) {
        this.showAlert = true
        this.alertText = '请输入密码'
        return
      }
      this.axios.post('/api/user/userLogin', {
        uid, pwd
      }).then(res => {
        if (res.data[0]) {
          let promise = this.tim.login({userID: userid, userSig: window.genTestUserSig(userid).userSig})
          promise.then(imResponse => {
            console.log('登录成功')
            this.$store.commit({
              type: 'GET_USER_INFO',
              userID: userid,
              userSig: window.genTestUserSig(userid).userSig,
              sdkAppID: window.genTestUserSig('').SDKAppID
            })
            this.$store.commit('toggleIsLogin', true)
            this.$store.commit('startComputeCurrent')
            this.$router.push('/')
          }).catch(imError => {
            if (imError.code === 2000) {
              console.warn(imError.message + ', 请检查是否正确填写了 SDKAPPID')
            } else {
              console.warn(imError.message)
            }
          })
        } else {
          this.showAlert = true
          this.alertText = '账号或密码错误'
          this.iconType = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 跳转
    goToAddress (path) {
      this.$router.push(path)
    },
    // 关闭提示框
    closeTip () {
      this.showAlert = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/reg_login.scss';
.content span {
  width: 15%;
}
.input {
  width: 65%;
  padding-left: 5px;
}
.foot {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 15px 0 0 20px;
}
</style>
