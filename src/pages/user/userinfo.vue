<template>
  <div class="userinfo-page">
      <headTop title='账户信息'></headTop>
      <section class="listCom">
        <div class="list">
          <span>头像</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </div>
        <div class="list">
          <span>用户名</span>
          <p></p>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </div>
        <div class="list">
          <span>登录密码</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </div>
      </section>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
export default {
  data () {
    return {

    }
  },
  components: {
    headTop
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.userinfo-page {
  padding-top: 60px;
}
.list {
  @include fa;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
}
</style>
