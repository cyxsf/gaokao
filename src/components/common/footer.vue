<template>
    <div id="foot_guide">
      <section class="guide_item" @click="gotoAddress('/')">
        <icon-svg class="icon" icon-class="icon-home"></icon-svg>
        <span>首页</span>
      </section>
      <section class="guide_item" @click="gotoAddress('/basic')">
        <icon-svg class="icon" icon-class="icon-form"></icon-svg>
        <span>填报推荐</span>
      </section>
      <section class="guide_item" @click="gotoAddress('/basic')">
        <icon-svg class="icon" icon-class="icon-xiaoxi"></icon-svg>
        <span>我的消息</span>
      </section>
      <section class="guide_item" @click="gotoAddress('/user')">
        <icon-svg class="icon" icon-class="icon-account"></icon-svg>
        <span>个人中心</span>
      </section>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    gotoAddress (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
#foot_guide {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 60px;
  align-items: center;
  background: #cccccc;
}
.guide_item {
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;
  flex-direction: column;
}
.icon {
  width: 30px;
  height: 30px;
}
</style>
