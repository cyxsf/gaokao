<template>
    <div>
      <div class="header"></div>
      <div class="main">
        <header>霍兰德兴趣测试</header>
        <button class="btn" @click="goHolland">
          <div class="icons">
            <icon-svg class="back-icon" icon-class="icon-youhua"></icon-svg>
          </div>
        </button>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goHolland () {
      this.$router.push('/holland')
    }
  }
}
</script>
<style scoped>

</style>
