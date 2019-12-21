<template>
    <div class="top">
        <span class="back" @click="goBack" v-if="isShow">
            <icon-svg class="back-icon" icon-class="icon-zuohua"></icon-svg>
            {{backTit}}
        </span>
        <slot name="left"></slot>
        <span class="title">{{title}}</span>
        <slot name="right"></slot>
    </div>
</template>
<script>
export default {
  data () {
    return {
      backTit: '返回',
      isShow: true
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  },
  props: ['title', 'back', 'showLeft'],
  mounted () {
    // 如果传递了back,则左侧返回文字显示的是传入的值
    if (this.$options.propsData.back !== undefined) this.backTit = this.$options.propsData.back
    // 如果传递了showLeft(默认是true),则该值决定左侧是否显示
    if (this.$options.propsData.showLeft !== undefined) this.iSshow = this.$options.propsData.showLeft
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
    background-color: #14334e;
}
.back {
    position: absolute;
    display: flex;
    left: 0px;
    height: 100%;
    width: 20%;
    font-size: 20px;
    align-items: center;
    justify-content: center;
}
.back-icon {
    height: 22px;
    width: 22px;
}
.title {
    font-size: 25px;
}
</style>
