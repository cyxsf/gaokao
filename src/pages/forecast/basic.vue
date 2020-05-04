<template>
    <div class="basic-page">
      <headTop title='填报助手'></headTop>
      <div class="header">基本信息</div>
      <div class="introduce">
        输入地点分数等基本信息，可以帮助我们推荐适合您填报的学校
      </div>
      <div class="content">
        <span class="left">生源地</span>
        <div class="contain" @click="goToAddress('/province')">
          <span>{{local}}</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </div>
      </div>
      <div class="content">
        <span class="left">科目类别</span>
        <div class="contain" @click="change">
          <span>{{subject[i]}}</span>
          <icon-svg class="icon" icon-class="icon-qiehuan"></icon-svg>
        </div>
      </div>
      <div class="content">
        <span class="left">分数</span>
        <input type="number" placeholder="高考分数" v-model.number="score"/>
        <div class="contain">
          <icon-svg class="icon" icon-class="icon-qianbi"></icon-svg>
        </div>
      </div>
      <button class="btn" @click="finish">完成</button>
      <alert-tip v-if="showAlert" @submitTip="submitTip" @closeTip="closeTip" :alertText="alertText" :iconType ="iconType"></alert-tip>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
import alertTip from '@/components/common/alertTip'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      subject: ['理科', '文科', '综合'],
      i: 0,
      local: '', // 省份
      showAlert: false, // 提示框
      alertText: '', // 提示内容
      iconType: true, // 提示框里icon类型
      score: ''
    }
  },
  computed: {
    ...mapState({
      currentUserProfile: state => state.user.currentUserProfile
    })
  },
  components: {
    headTop,
    alertTip
  },
  meta: {
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  methods: {
    goToAddress (path) {
      this.$router.push(path)
    },
    change () {
      this.i++
      if (this.i > this.subject.length - 1) this.i = 0
    },
    finish () {
      let uid = this.currentUserProfile.userID
      let local = this.local
      let sub = this.subject[this.i]
      let score = this.score
      if (local === '') {
        this.showAlert = true
        this.alertText = '生源地不能为空'
      } else if (score === '') {
        this.showAlert = true
        this.alertText = '高考分数不能为空'
      } else {
        this.axios.post('/api/data/basUpdate', {
          uid, local, sub, score
        }).then(res => {
          this.$router.push('/prefer')
        })
      }
    },
    closeTip () {
      this.showAlert = false
    },
    submitTip () {
      this.showAlert = false
    }
  },
  mounted () {
    this.local = this.$route.query.name
  }
}
</script>
<style lang="scss" scoped>
.basic-page {
  padding-top: 80px;
}
.header {
  text-align: center;
  margin-bottom: 20px;
  font-size: 25px;
}
.introduce {
  display: block;
  width: 80%;
  margin: auto;
  padding: 10px;
  color: #aaa;
  text-align: center;
}
.content {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
}
.left {
  width: 25%;
  margin-left: 15px;
  text-align: left;
  font-size: 18px;
}
.content input {
  width: 58%;
  height: 30px;
  border: 0;
  text-align: right;
}
.contain {
  margin-right: 15px;
}
.icon {
  width: 20px;
  height: 20px;
}
.btn {
  display: block;
  width: 60%;
  height: 50px;
  margin: 25px auto;
}
</style>
