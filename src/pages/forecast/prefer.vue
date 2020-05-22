<template>
    <div class="basic-page">
      <headTop title='填报助手'></headTop>
      <div class="header">偏好信息</div>
      <div class="introduce">
        输入偏好信息，可以帮助我们更加精确推荐适合您填报的学校
      </div>
      <div class="content">
        <span class="left">报考偏好</span>
        <div class="contain" @click="change">
          <span class="text">{{preApp[i]}}</span>
          <icon-svg class="icon" icon-class="icon-qiehuan"></icon-svg>
        </div>
      </div>
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
    initData () {
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/data/basSelect', {
        uid
      }).then(res => {
        let that = this
        if (res.data.length > 0) {
          that.reg = res.data[0].prereg
          that.major = res.data[0].premajor
          if (res.data[0].preapp === '专业优先') {
            this.$set(that.preApp, 0, res.data[0].preapp)
            that.preApp[1] = '学校优先'
          }
          let cateid = res.data[0].cateid
          if (that.major === null && cateid) { // 霍兰德
            that.axios.post('/api/data/resSelect', {
              cateid
            }).then(res => {
              that.major = res.data[0].major
            })
          }
        }
      }).catch((e) => {})
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
        let that = this
        let result = res.data[0]
        let score = parseInt(result.score)
        let cur = result.curplace
        let sub = result.subject
        let lower = score - 80
        let higher = score + 50
        if (preApp !== result.preapp) {
          that.axios.post('/api/data/delAllReco', {uid})
        } else {
          that.axios.post('/api/data/delCateRe', {uid})
        }
        if (preApp === '学校优先') {
          if (result.isNew === String(1)) { // 新高考地区
            sub = ''
            if (cur === '浙江' || cur === '上海') sub = '综合'
            else if (result.subject.indexOf('物理') !== -1 || result.subject.indexOf('化学') !== -1 || result.subject.indexOf('生物') !== -1) sub = '理科'
            else sub = '文科'
          }
          this.schoolTour(cur, sub, score - 50, score - 20, result.prereg, result.premajor, result.subject, result.isNew, 0.65, 0)
          this.schoolTour(cur, sub, score - 20, score - 10, result.prereg, result.premajor, result.subject, result.isNew, 0.55, 1)
          this.schoolTour(cur, sub, score - 10, score + 10, result.prereg, result.premajor, result.subject, result.isNew, 0.45, 2)
          this.$router.push('/final')
        } else {
          if (res.data[0].isNew === String(1)) { // 新高考地区
            sub = ''
            if (cur === '浙江' || cur === '上海') sub = '综合'
            else if (result.subject.indexOf('物理') !== -1 || result.subject.indexOf('化学') !== -1 || result.subject.indexOf('生物') !== -1) sub = '理科'
            else sub = '文科'
          }
          if (major !== '' && major !== null) {
            this.majorTour(cur, sub, score - 50, score - 20, result.prereg, result.premajor, result.subject, result.isNew, 0.65, 0)
            this.majorTour(cur, sub, score - 20, score - 10, result.prereg, result.premajor, result.subject, result.isNew, 0.55, 1)
            this.majorTour(cur, sub, score - 10, score + 10, result.prereg, result.premajor, result.subject, result.isNew, 0.45, 2)
            this.$router.push('/final')
          } else {
            console.log('无专业')
          }
        }
        this.recommend(cur, sub, lower, higher, result.prereg, result.premajor, result.isNew, 0.7, 3)
      }).catch((e) => {})
    },
    schoolTour (cur, sub, low, high, reg, major, subs, isNew, rate, cate) { // 学校优先
      this.axios.post('/api/data/schoolTour', {
        cur, sub, low, high
      }).then(result => {
        var that = this
        var promiseAll = result.data.map(function (item) {
          let school = item.school
          return that.axios.post('/api/data/schoolSelect', {school})
        })
        that.updateReco(promiseAll, reg, major, cur, sub, isNew, rate, cate)
      })
    },
    majorTour (cur, sub, low, high, reg, majors, subs, isNew, rate, cate) { // 专业优先
      let majorArr = majors.split(' ')
      var promiseAll = majorArr.map(item => {
        let major = item
        return this.axios.post('/api/data/majorTour', {cur, sub, major, low, high})
      })
      this.forMajor(promiseAll, reg, majors, cur, sub, isNew, rate, cate)
    },
    forMajor (promiseAll, reg, majors, cur, sub, isNew, rate, cate) {
      this.axios.all(promiseAll).then(resArr => {
        resArr.forEach(result => {
          var that = this
          if (result.data.length > 0) {
            var promiseAll = result.data.map(function (item) {
              let school = item.school
              return that.axios.post('/api/data/schoolSelect', {school})
            })
            that.updateReco(promiseAll, reg, majors, cur, sub, isNew, rate, cate)
          }
        })
      })
    },
    updateReco (promiseAll, reg, major, cur, sub, isNew, rate, cate) { // 更新推荐列表
      let uid = this.currentUserProfile.userID
      this.axios.all(promiseAll).then(resArr => {
        resArr.forEach(res => {
          if (res.data.length > 0) {
            let school = res.data[0].school
            if (reg !== '' && reg !== null) { // 存在地域偏好
              let temp = reg.split(' ')
              res.data[0].count = 0
              for (let i = 0; i < temp.length; i++) {
                if (temp[i] === res.data[0].curplace) { // 学校地址满足地域偏好
                  if (major !== '' && reg !== null) { // 存在专业偏好
                    this.isMajor(uid, major, school, cur, sub, isNew, cate)
                  } else {
                    this.axios.post('/api/data/delMajorList', {uid})
                  }
                  this.axios.post('/api/data/inseReco', {uid, school, rate, cate})
                } else {
                  res.data[0].count++
                }
              }
              if (res.data[0].count === temp.length) {
                this.axios.post('/api/data/delReco', {uid, school})
              }
            } else { // 不存在地域偏好
              if (major !== '' && major !== null) { // 存在专业偏好
                this.isMajor(uid, major, school, cur, sub, isNew, cate)
              } else {
                this.axios.post('/api/data/delMajorList', {uid})
              }
              this.axios.post('/api/data/inseReco', {uid, school, rate, cate})
            }
          }
        })
      }).catch((e) => {})
    },
    isMajor (uid, major, school, cur, sub, isNew, cate) { // 专业偏好
      let temp = major.split(' ')
      let final = []
      for (let j = 0; j < temp.length; j++) {
        let discmajor = temp[j]
        this.axios.post('/api/data/majorDataSel', {discmajor})
          .then(resArr => {
            resArr.data.forEach(item => {
              final.push(item.major)
            })
            for (let k = 0; k < final.length; k++) {
              if (isNew === String(1)) { // 新高考地区
                console.log(1)
                this.axios.post('/api/data/reqSelect', {cur, school})
                  .then(res => {
                    if (res.data.length > 0) { // 学校部分专业有限制选科
                      for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].discmajor.indexOf(temp[j]) !== -1 ||
                        res.data[i].major.indexOf(final[k]) !== -1 ||
                        res.data[i].discmajor.indexOf(final[k]) !== -1) { // 该学校中有专业为用户的偏好专业
                          let ma = ''
                          if (res.data[i].requires !== '无限制') { // 偏好专业对选科有要求
                            console.log(1)
                            for (let ss in sub) {
                              if (res.data[i].requires.indexOf(sub[ss]) !== -1) { // 选科符合专业要求
                                console.log(2)
                                ma = final[k]
                                this.axios.post('/api/data/inMajorList', {uid, school, ma, cate})
                              } else continue
                            }
                          } else { // 偏好专业对选科无要求
                            ma = final[k]
                            this.axios.post('/api/data/inMajorList', {uid, school, ma, cate})
                          }
                        } else continue
                      }
                    } else { // 学校的所有专业都不存在选科要求
                      this.axios.post('/api/data/majorSelect', {school})
                        .then(ress => {
                          if (ress.data.length > 0) { // 学校存在
                            ress.data.forEach(res => {
                              if (res.major.indexOf(final[k]) !== -1) { // 学校存在考生的专业偏好
                                let ma = res.major
                                this.axios.post('/api/data/inMajorList', {uid, school, ma, cate})
                              }
                            })
                          }
                        })
                    }
                  })
              } else {
                this.axios.post('/api/data/majorSelect', {school})
                  .then(ress => {
                    if (ress.data.length > 0) { // 学校存在
                      ress.data.forEach(res => {
                        if (res.major.indexOf(final[k]) !== -1) { // 学校存在考生的专业偏好
                          let ma = res.major
                          this.axios.post('/api/data/inMajorList', {uid, school, ma, cate})
                        }
                      })
                    }
                  })
              }
            }
          })
      }
    },
    recommend (cur, sub, lower, higher, region, major, isNew, rate, cate) { // 基于内容的推荐
      let uid = this.currentUserProfile.userID
      this.axios.post('./api/data/recoList', {cur, sub, lower, higher, uid})
        .then(res => {
          let result = res.data.split(',')
          let regex = /^([\u4E00-\u9FA5])*$/
          var that = this
          var promiseAll = []
          for (let item of result) {
            if (regex.test(item)) {
              let school = item
              let temp = that.axios.post('/api/data/schoolSelect', {school})
              promiseAll.push(temp)
            } else continue
          }
          that.updateReco(promiseAll, region, major, cur, sub, isNew, rate, cate)
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
