<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/><!--当前路由地址所显示的内容-->
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新页面
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
@import './style/common.scss';
#app {
  width: 100%;
  height: 100%;
}
</style>
