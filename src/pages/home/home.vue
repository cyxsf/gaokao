<template>
    <div>
      <div class="header"></div>
      <div class="main">
        <button class="btn" @click="goToAddress('/evalhome')">兴趣测试</button>
        <button class="btn" @click="goToAddress('/final')">填报指南</button>
      </div>
      <foot-guide></foot-guide>
    </div>
</template>
<script>
import footGuide from '@/components/common/footer'
export default {
  data () {
    return {

    }
  },
  components: {
    footGuide
  },
  methods: {
    goToAddress (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style scoped>

</style>
