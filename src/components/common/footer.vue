<template>
    <div id="foot_guide">
        <section class="guide_item" @click="gotoAddress('/')">
            <span>首页</span>
        </section>
        <section class="guide_item" @click="gotoForecast">
            <span>填报推荐</span>
        </section>
        <section class="guide_item" @click="gotoAddress('/user')">
            <span>个人中心</span>
        </section>
    </div>
</template>
<script>
import { getStore } from '@/config/mUtils'
export default {
  data () {
    return {
    }
  },
  methods: {
    gotoAddress (path) {
      this.$router.push(path)
    },
    gotoForecast () {
      let uid = getStore('userid')
      this.axios.post('/api/data/basSelect', {
        uid
      }).then(res => {
        console.log(res)
        if (res.data[0]) {
          this.$router.push('/prefer')
        } else {
          this.$router.push('/basic')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#foot_guide {
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    height: 90px;
    background: #cccccc;
}
.guide_item {
    flex: 1;
    text-align: center;
    align-items: center;
}
</style>
