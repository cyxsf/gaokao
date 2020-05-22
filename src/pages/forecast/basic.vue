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
      <div class="content" v-if="isNew">
        <span class="left">选科</span>
        <div class="contain">
        <el-select v-model="checkedSubjects"
        multiple :multiple-limit="3"
        style="width:250px !important"
        placeholder="请选择"
        @change="selectSub">
          <el-option
            v-for="(item,index) in newSubjects"
            :key="index"
            :label="item"
            :value="item">
            <span>{{item}}</span>
          </el-option>
        </el-select>
        </div>
      </div>
      <div class="content" v-else>
        <span class="left">科目类别</span>
        <div class="contain" @click="change">
          <span>{{subject[i]}}</span>
          <icon-svg class="icon" icon-class="icon-qiehuan"></icon-svg>
        </div>
      </div>
      <div class="content" v-show="isScore">
        <span class="left2" v-for="(item,index) in checkedSubjects" :key="index">{{item}}
          <input type="number" placeholder="分数" v-model.number="newScore[index]"/>
        </span>
      </div>
      <div class="content">
        <span class="left">总分</span>
        <input type="number" placeholder="分数" v-model.number="score"/>
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
      subject: ['理科', '文科'],
      checkedSubjects: [],
      newSubjects: ['物理', '化学', '生物', '政治', '地理', '历史'],
      newCities: ['上海', '浙江', '北京', '天津', '山东', '海南'],
      i: 0,
      local: '', // 省份
      showAlert: false, // 提示框
      alertText: '', // 提示内容
      iconType: true, // 提示框里icon类型
      score: '',
      newScore: ['', '', ''],
      isNew: false,
      isScore: false
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
    isNewCo (local) {
      if (this.newCities.indexOf(local) !== -1) {
        this.isNew = true
        if (local === '浙江') {
          this.newSubjects.push('技术')
        }
      }
    },
    initData () {
      let uid = this.currentUserProfile.userID
      if (this.$route.query.name) {
        this.local = this.$route.query.name
        this.isNewCo(this.local)
      } else {
        this.axios.post('/api/data/basSelect', {uid})
          .then(res => {
            if (res.data.length !== 0) {
              this.local = res.data[0].curplace
              this.isNewCo(this.local)
              if (this.isNew === true) { // 新高考
                this.isScore = true
                this.checkedSubjects = res.data[0].subject.split(' ')
                let newScore = this.newScore
                let check = this.checkedSubjects
                for (let i in check) {
                  if (check[i] === '物理') newScore[i] = res.data[0].physics
                  else if (check[i] === '化学') newScore[i] = res.data[0].chemistry
                  else if (check[i] === '生物') newScore[i] = res.data[0].biology
                  else if (check[i] === '政治') newScore[i] = res.data[0].politics
                  else if (check[i] === '历史') newScore[i] = res.data[0].history
                  else if (check[i] === '地理') newScore[i] = res.data[0].geography
                  else if (check[i] === '技术') newScore[i] = res.data[0].technology
                }
              } else {
                if (res.data[0].subject === '文科') {
                  this.$set(this.subject, 0, res.data[0].subject)
                  this.subject[1] = '理科'
                }
              }
              this.score = res.data[0].score
            } else {
              this.local = this.$route.query.name
              this.isNewCo(this.local)
            }
          })
      }
    },
    selectSub () {
      if (this.checkedSubjects.length === 3) {
        this.isScore = true
      } else {
        this.isScore = false
      }
    },
    finish () {
      let uid = this.currentUserProfile.userID
      let local = this.local
      let score = this.score
      if (local === '') {
        this.showAlert = true
        this.alertText = '生源地不能为空'
      } else if (score === '') {
        this.showAlert = true
        this.alertText = '高考分数不能为空'
      } else if (this.isNew === true) { // 新高考
        let check = this.checkedSubjects
        let newScore = this.newScore
        let sub = check.join(' ')
        let isNew = 1
        // eslint-disable-next-line one-var
        let phy = '', chem = '', bio = '', pol = '', his = '', geo = '', tech = ''
        for (let i in check) {
          if (check[i] === '物理') phy = newScore[i]
          else if (check[i] === '化学') chem = newScore[i]
          else if (check[i] === '生物') bio = newScore[i]
          else if (check[i] === '政治') pol = newScore[i]
          else if (check[i] === '历史') his = newScore[i]
          else if (check[i] === '地理') geo = newScore[i]
          else if (check[i] === '技术') tech = newScore[i]
        }
        this.axios.post('/api/data/upNewScore', {
          local, sub, phy, chem, bio, pol, his, geo, tech, score, isNew, uid
        }).then(res => {
          this.axios.post('/api/data/delAllReco', {uid})
          this.$router.push('/prefer')
        })
      } else if (this.isNew === false) {
        let sub = this.subject[this.i]
        let isNew = 0
        this.axios.post('/api/data/basUpdate', {
          local, sub, score, isNew, uid
        }).then(res => {
          this.axios.post('/api/data/delAllReco', {uid})
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
    this.initData()
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
.left2 {
  display: flex;
  margin: 0 15px;
  text-align: center;
  font-size: 18px;
  align-items: center;
  justify-content: center;
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
