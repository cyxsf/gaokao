<template>
    <div>
      <div class="header"></div>
      <div class="main">
        <button class="btn" @click="goEvaluation">测评</button>
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
    goEvaluation () {
      this.$router.push('/evalhome')
    }
  }
}
</script>
<style scoped>

</style>
