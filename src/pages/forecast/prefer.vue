<template>
    <div class="basic-page">
      <headTop title='填报助手'></headTop>
      <div class="header">偏好信息</div>
      <div class="introduce">
        输入偏好信息，可以帮助我们更加精确推荐适合您填报的学校
      </div>
      <!--
      <div class="content">
        <span class="left">报考偏好</span>
        <div class="contain" @click="change">
          <span class="text">{{preApp[i]}}</span>
          <icon-svg class="icon" icon-class="icon-qiehuan"></icon-svg>
        </div>
      </div>
      -->
      <div class="content">
        <span class="left">地域偏好</span>
        <div class="contain" @click="goToAddress('/preReg')">
          <span class="text">{{reg}}</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </div>
      </div>
      <div class="content">
        <span class="left">专业偏好</span>
        <div class="contain" @click="goToAddress('/preMajor')">
          <span class="text">{{major}}</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </div>
      </div>
      <button class="btn" @click="finish">完成</button>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      preApp: ['学校优先', '专业优先'],
      i: 0,
      reg: '', // 地域
      major: '' // 专业
    }
  },
  components: {
    headTop
  },
  computed: {
    ...mapState({
      currentUserProfile: state => state.user.currentUserProfile
    })
  },
  methods: {
    goToAddress (path) {
      this.$router.push(path)
    },
    change () {
      this.i++
      if (this.i > this.preApp.length - 1) this.i = 0
    },
    finish () {
      let uid = this.currentUserProfile.userID
      let preApp = this.preApp[this.i]
      let reg = this.reg
      let major = this.major
      this.axios.post('/api/data/preUpdate', {preApp, reg, major, uid})
      this.axios.post('/api/data/basSelect', {
        uid
      }).then(res => {
        let result = res.data[0]
        let score = parseInt(result.score)
        let cur = result.curplace
        let sub = result.subject
        let lower = score - 80
        let higher = score + 20
        this.finalTour(cur, sub, score - 50, score - 20, result.prereg, 0.65, 0)
        this.finalTour(cur, sub, score - 20, score - 10, result.prereg, 0.55, 1)
        this.finalTour(cur, sub, score - 10, score + 10, result.prereg, 0.45, 2)
        this.recommend(cur, sub, lower, higher, result.prereg, 0.7, 3)
        this.$router.push('/final')
      })
    },
    initData () {
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/data/basSelect', {
        uid
      }).then(res => {
        this.reg = res.data[0].prereg
        this.major = res.data[0].premajor
        let cateid = res.data[0].cateid
        if (this.major === null && cateid) {
          this.axios.post('/api/data/resSelect', {
            cateid
          }).then(res => {
            this.major = res.data[0].major
          })
        }
      })
    },
    finalTour (cur, sub, low, high, reg, rate, cate) {
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/data/finalTour', {
        cur, sub, low, high
      }).then(result => {
        var that = this
        var promiseAll = result.data.map(function (item) {
          let school = item.school
          return that.axios.post('/api/data/schoolSelect', {school})
        })
        that.axios.all(promiseAll).then(resArr => {
          resArr.forEach((res, i) => {
            if (res.data.length !== 0) {
              let school = res.data[0].school
              if (reg) {
                let temp = reg.split(' ')
                res.data[0].count = 0
                for (let i = 0; i < temp.length; i++) {
                  if (temp[i] === res.data[0].curplace) {
                    that.axios.post('/api/data/inseReco', {uid, school, rate, cate})
                  } else {
                    res.data[0].count++
                  }
                }
                if (res.data[0].count === temp.length) {
                  that.axios.post('/api/data/delReco', {uid, school})
                }
              } else {
                that.axios.post('/api/data/inseReco', {uid, school, rate, cate})
              }
            }
          })
        })
      })
    },
    recommend (cur, sub, lower, higher, region, rate, cate) {
      let uid = this.currentUserProfile.userID
      this.axios.post('./api/data/recoList', {cur, sub, lower, higher, uid
      }).then(res => {
        let result = res.data.split(',')
        let reg = /^([\u4E00-\u9FA5])*$/
        var that = this
        var promiseAll = []
        for (let item of result) {
          if (reg.test(item)) {
            let school = item
            let temp = that.axios.post('/api/data/schoolSelect', {school})
            promiseAll.push(temp)
          } else continue
        }
        that.axios.all(promiseAll).then(resArr => {
          resArr.forEach((res, i) => {
            if (res.data.length !== 0) {
              let school = res.data[0].school
              if (region) {
                let temp = region.split(' ')
                res.data[0].count = 0
                for (let i = 0; i < temp.length; i++) {
                  if (temp[i] === res.data[0].curplace) {
                    that.axios.post('/api/data/inseReco', {uid, school, rate, cate})
                  } else {
                    res.data[0].count++
                  }
                }
                if (res.data[0].count === temp.length) {
                  that.axios.post('/api/data/delReco', {uid, school})
                }
              } else {
                that.axios.post('/api/data/inseReco', {uid, school, rate, cate})
              }
            }
          })
        })
      })
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
.content input {
  width: 58%;
  height: 30px;
  border: 0;
  text-align: right;
}
.contain {
  display: flex;
  margin-right: 15px;
}
.text {
  width: 230px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: right;
  margin-right: 5px;
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
