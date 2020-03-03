<template>
  <div id="app">
    <router-view/><!--当前路由地址所显示的内容-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './style/common.scss';
#app {
  width: 100%;
  height: 100%;
}
</style>
