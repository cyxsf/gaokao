<template>
    <div>
      <headTop title='MBTI性格测试'></headTop>
      <progressbar :sure="sure" :total="total" :barwidth="barwidth">
      </progressbar>
      <div class="question">
        <span class="title">{{index+1}}.{{title}}</span>
      </div>
      <div class="btn-group" @click="handleAnswer">
        <button class="yes">是</button>
        <button class="no">否</button>
      </div>
      <span class="prev" @click="prev">
        上一题
      </span>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
import progressbar from '@/components/common/progress'
import questions from '@/../static/question.json'
export default {
  data () {
    return {
      questions: questions,
      sure: 1,
      total: questions.length,
      barwidth: 0
    }
  },
  components: {
    headTop,
    progressbar
  },
  methods: {
    handleAnswer () {
      this.sure += 1
      if (this.sure >= this.total) this.sure = this.total
      this.barwidth = Math.round(this.sure / this.total * 100)
    },
    prev () {
      console.log('返回')
    }
  }
}
</script>
<style lang="scss" scoped>
.question {
  height: 220px;
  margin-top: 10px;
  background: #14334e;
}
.yes, .no{
  width: 100%;
  height: 55px;
  margin-top: 10px;
}
.prev {
  display: block;
  width: 100%;
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
}
</style>
