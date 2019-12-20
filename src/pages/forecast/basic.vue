<template>
    <div>
      <div class="header">基本信息</div>
      <div class="main">
        <div class="content">
          <span>生源地</span>
        </div>
        <div class="content">
          <span>科目类别</span>
        </div>
        <div class="content">
          <span>分数</span>
          <input type="number" placeholder="高考分数"/>
        </div>
      </div>
      <div class="btn" @click="goPrefer()">完成</div>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goPrefer () {
      this.$router.push('/prefer')
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  text-align: center;
  margin: 25px;
  font-size: 25px;
}

.content {
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
  border-bottom: 1px solid #cccccc;
}
.content span {
  width: 25%;
  text-align: left;
  margin-left: 15px;
}
.content input {
  width: 65%;
  height: 30px;
  border: 0;
  text-align: right;
}
.btn {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
