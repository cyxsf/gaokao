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
*{
  margin: 0;
  padding: 0;
  box-sizing: boder-box;
}
html,body {
  height: 100%;
  width: 100%;
}
</style>
