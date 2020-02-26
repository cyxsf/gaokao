<template>
  <div>
    <headTop :title="title"></headTop>
    <div class="content">

    </div>
    <div class="footer">
      <mesSendBox/>
    </div>
  </div>

</template>

<script>
import headTop from '@/components/common/header'
import mesSendBox from '@/pages/community/message/mesSendBox'
export default {
  data () {
    return {
      title: ''
    }
  },
  components: {
    headTop,
    mesSendBox
  },
  methods: {
    initData () {
      this.title = '用户名'
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

</style>
