<template>
  <div>
    <div class="header">注册</div>
    <div class="main">
      <div class="content">
        <span>手机号</span>
        <input class="input" type="number" placeholder="请输入手机号" />
      </div>
      <div class="content">
        <span>验证码</span>
        <input class="input" type="number" placeholder="请输入短信验证码" v-model="code" />
        <span class="obtain">点击获取</span>
      </div>
      <div class="content">
        <span>登录密码</span>
        <input class="input" type="text" placeholder="请输入密码" v-model="pwdOne" />
      </div>
      <div class="content">
        <span>确认密码</span>
        <input class="input" type="text" placeholder="请再次输入密码" v-model="pwdTwo" />
      </div>
    </div>
    <div class="btn" @click="goLogin">立即注册</div>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      code: '',
      pwdOne: '',
      pwdTwo: ''
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  text-align: center;
  margin: 25px;
  font-size: 25px;
}

.content {
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #cccccc;
}
.input {
  position: absolute;
  width: 72%;
  height: 30px;
  right: 0;
  border: 0;
}
.obtain {
  position: absolute;
  right: 10px;
}
.btn {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
