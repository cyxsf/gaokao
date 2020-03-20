<template>
    <div class="top">
        <span class="back" @click="goBack" v-if="isShow">
          <icon-svg class="icon" icon-class="icon-zuohua"></icon-svg>
          {{backTit}}
        </span>
        <span class="title">{{title}}</span>
        <span class="send" @click="goSend" v-if="isShowRight">
          {{sendTit}}
        </span>
    </div>
</template>
<script>
export default {
  data () {
    return {
      backTit: '返回',
      isShow: true,
      isShowRight: false,
      sendTit: '发布'
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    goSend () {
      this.$emit('goSend')
    }
  },
  props: ['title', 'back', 'showLeft', 'showRight'],
  mounted () {
    // 如果传递了back,则左侧返回文字显示的是传入的值
    if (this.$options.propsData.back !== undefined) this.backTit = this.$options.propsData.back
    // 如果传递了showLeft(默认是true),则该值决定左侧是否显示
    if (this.$options.propsData.showLeft !== undefined) this.isShow = this.$options.propsData.showLeft
    // 如果传递了showRight(默认是false),则该值决定右侧是否显示
    if (this.$options.propsData.showRight !== undefined) this.isShowRight = this.$options.propsData.showRight
  }
}
</script>
<style scoped>
.top {
  position: fixed;
  display: flex;
  width: 100%;
  height: 60px;
  z-index: 100;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  fill: #ffffff;
  background-color: #14334e;
}
.back, .send {
  position: absolute;
  display: flex;
  height: 100%;
  width: 20%;
  font-size: 20px;
  align-items: center;
  justify-content: center;
}
.back {
  left: 0px;
}
.send {
  right: 0px;
}
.icon {
  height: 22px;
  width: 22px;
}
.title {
  font-size: 25px;
}
</style>
