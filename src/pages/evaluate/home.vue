<template>
    <div class="home-page">
      <headTop title='霍兰德兴趣测评'></headTop>
      <div class="main">
        <div class="holland">
          <span class="title">霍兰德兴趣测评</span>
          <p class="introduce">
            霍兰德职业适应性测验(The Self-Directed Search，简称SDS)由美国著名职业指导专家 Ｊ.霍兰德（ＨＯＬＬＡＮＤ）编制。
            在几十年间经过一百多次大规模的实验研究，形成了人格类型与职业类型的学说和测验
            该测验能帮助被试者发现和确定自己的职业兴趣和能力专长, 从而科学地做出求职择业。
          </p>
          <button class="btn" @click="goToAddress">开始测试</button>
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
      this.$router.push('/holland')
    }
  }
}
</script>
<style lang="scss" scoped>
.home-page {
  padding-top: 70px;
}
.title {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #333;
  line-height: 100px;
  text-align: center;
}
.introduce {
  padding: 10px 20px;
  text-indent: 2em;
  font-size: 18px;
  line-height: 32px;
  color: #2e3b4e;
}
.btn {
  display: block;
  width: 150px;
  height: 50px;
  color: #fff;
  line-height: 40px;
  background: #222;
  border-radius: 2px;
  text-align: center;
  font-size: 18px;
  margin: 50px auto;
}
</style>
