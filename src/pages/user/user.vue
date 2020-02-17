<template>
    <div>
        <div>个人中心</div>
        <span>{{userid}}</span>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import { getStore } from '@/config/mUtils'
export default {
  data () {
    return {
      userid: '' // 用户名
    }
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions([])
  },
  mounted () {
    this.userid = getStore('userid')
  }
}
</script>
<style lang ="scss" scoped>

</style>
