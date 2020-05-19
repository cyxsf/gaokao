<template>
    <div class="home-page">
      <headTop title='霍兰德兴趣测评'></headTop>
      <progressbar :active="active" :total="total" :barwidth="barwidth">
      </progressbar>
      <div v-for="(item,index) in questions" :key="item.qid">
        <div class="question" v-if="active==index+1">
          <span class="title">{{index+1}}.{{item.title}}</span>
        </div>
      </div>
      <div class="btn-group">
        <button class="yes" @click="handleAnswer(1)" v-if="active <= total">是</button>
        <button class="no" @click="handleAnswer(0)" v-if="active <= total">否</button>
      </div>
      <span class="prev" @click="prev" v-if="active > 1 && active <= total">上一题</span>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
import progressbar from '@/components/common/progress'
export default {
  data () {
    return {
      questions: [],
      active: 1,
      total: 0,
      barwidth: 0,
      myResults: {}
    }
  },
  components: {
    headTop,
    progressbar
  },
  methods: {
    handleAnswer (answer) {
      let que = this.questions[this.active - 1]
      let myResults = this.myResults
      this.active += 1
      if (this.active >= this.total) this.active = this.total
      this.barchange()
      if (this.active >= this.total) {
        let res = JSON.stringify(myResults) // {"1":5,"2":4,"3":5,"4":2,"5":2,"6":5}
        this.$router.push({
          path: '/evalresult',
          query: {
            res
          }
        })
        console.log(res)
      } else {
        if (!myResults[que.cateid]) myResults[que.cateid] = 0
        myResults[que.cateid] += answer === que.score ? 1 : 0
      }
    },
    select () {
      this.axios.post('/api/test/queSelect', {
      }).then(res => {
        this.questions = res.data
        this.questions.sort(function () {
          return (0.5 - Math.random())
        })
        this.total = this.questions.length
        this.barchange()
      }).catch(err => {
        console.log(err)
      })
    },
    barchange () {
      this.barwidth = Math.round(this.active / this.total * 100)
    },
    prev () {
      this.active -= 1
      if (this.active <= 1) this.active = 1
      this.barchange()
    }
  },
  mounted () {
    this.select()
  }
}
</script>
<style lang="scss" scoped>
.home-page {
  padding-top: 70px;
}
.question {
  height: 200px;
  margin-top: 15px;
  padding: 25px;
  background: #14334e;
}
.title {
  padding-top: 10px;
  font-size: 25px;
  color: #ffffff;
}
.yes, .no{
  width: 100%;
  height: 55px;
  margin-top: 15px;
}
.prev {
  display: block;
  width: 100%;
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
}
</style>
