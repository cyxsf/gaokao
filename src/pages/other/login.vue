<template>
  <div>
    <div class="header">登录</div>
    <div class='main'>
        <div class="content">
          <span>账号</span>
            <input class="input" type="number" placeholder="请输入手机号"/>
        </div>
        <div class="content">
          <span>密码</span>
            <input class="input" type="text" placeholder="请输入密码"/>
        </div>
      </div>
    <div class="btn" @click="goHome">登录</div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
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
.btn {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
