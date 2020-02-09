<template>
    <div>
      <headTop title='测评'></headTop>
      <div class="main">
        <div class="holland">
          <span class="title">霍兰德兴趣测试</span>
          <button class="btn" @click="goToAddress('/holland')">
            <div class="icons">
              <icon-svg class="back-icon" icon-class="icon-youhua"></icon-svg>
            </div>
          </button>
        </div>
        <div class="mbti">
          <span class="title">MBTI性格测试</span>
          <button class="btn" @click="goToAddress('/mbti')">
            <div class="icons">
              <icon-svg class="back-icon" icon-class="icon-youhua"></icon-svg>
            </div>
          </button>
        </div>
      </div>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
export default {
  data () {
    return {

    }
  },
  components: {
    headTop
  },
  methods: {
    goToAddress (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
.holland {
  margin-top: 70px;
}
</style>
