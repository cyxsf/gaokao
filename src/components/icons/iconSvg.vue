<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      return `#${this.iconClass}`
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 18px;
  vertical-align: -0.15em;
  fill: currentColor; /* 当前下载的图标本身有颜色，置空可以改变颜色*/
  overflow: hidden;
}
</style>
