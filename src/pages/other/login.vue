<template>
  <div>
    <headTop title='登录'></headTop>
    <div class="header">志愿助手</div>
    <div class='main'>
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
    </div>
    <div class="btn-fa">
      <button class="btn" @click="goHome">登录</button>
    </div>
    <div class="foot">
      <span class="goreg" @click="goToAddress('/register')">立即注册</span>
      <span class="forget" @click="goToAddress('/forget')">忘记密码？</span>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/common/header'
export default {
  data () {
    return {
      phone: '', // 手机号码
      pwd: '', // 密码
      showPwd: false // 默认密码不显示
    }
  },
  components: {
    headTop
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    goToAddress (path) {
      this.$router.push(path)
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
