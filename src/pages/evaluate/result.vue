<template>
    <div>
      <headTop title='霍兰德兴趣测试'></headTop>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
export default {
  data () {
    return {
      myResults: {}
    }
  },
  components: {
    headTop
  },
  methods: {
  },
  mounted () {
    console.log(this.myResults)
  }
}
</script>
<style lang="scss" scoped>
</style>
