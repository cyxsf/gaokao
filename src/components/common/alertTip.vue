<template>
  <div class="alert_container" z-index= "1000">
    <section class="tip_container">
      <div class="close" @click="closeTip">
        <icon-svg  icon-class="icon-cuowu"></icon-svg>
      </div>
      <icon-svg class="icon" :icon-class="iconType?'icon-jinggao':'icon-cuowu'"></icon-svg>
      <span class="tip_text">{{alertText}}</span>
      <button class="confirm" @click="submitTip">确认</button>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      positionY: 0,
      timer: null
    }
  },
  props: ['alertText', 'iconType'],
  methods: {
    closeTip () {
      this.$emit('closeTip')
    },
    submitTip () {
      this.$emit('submitTip')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
@keyframes tipMove{
  0%   { transform: scale(1) }
  35%  { transform: scale(.9) }
  70%  { transform: scale(1.1) }
  100% { transform: scale(1) }
  }
.alert_container {
  @include center;
}
.tip_container {
  display: flex;
  @include wh(280px,180px);
  @include fa;
  animation: tipMove .4s;
  flex-direction: column;
  background-color: rgba(1,1,1,0.8);
  .icon {
    @include wh(70px,70px);
    margin: 6px;
  }
  .close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .tip_text {
    margin-bottom: 20px;
    color: $fc;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
  }
  .confirm {
    @include wh(45%,40px);
    font-size: 22px;
  }
}
</style>
