<template>
    <div class="alert_container">
        <section class="tip_container">
          <icon-svg class="icon" :icon-class="iconType?'icon-jinggao':'icon-cuowu'"></icon-svg>
          <span class="tip_text">{{alertText}}</span>
          <button class="confirm" @click="closeTip">确认</button>
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
  display: absolute;
  @include wh(280px,180px);
  @include fa;
  animation: tipMove .4s;
  flex-direction: column;
  background-color: rgba(1,1,1,0.8);
  .icon {
    @include wh(70px,70px);
    margin: 6px;
  }
  .tip_text {
    margin-bottom: 20px;
    color: $fc;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
  }
  .confirm {
    @include wh(50%,40px);
    font-size: 22px;
  }
}
</style>
