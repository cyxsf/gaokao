<template>
    <div class="final-page">
      <headTop title='填报指南'></headTop>
      <div class="tabArea">
        <ul class="tab">
          <li v-for="(tab,index) in tabs" :key="tab.id" :class="{tabCur:curtab===index}"
          @click="toggletab(index)">{{tab.title}}</li>
        </ul>
      </div>
      <div class="tabContent" v-for="item in tabContent" :key="item.id">
        <section class="content" v-show="curtab===i">
          <span class="univerIcon">
              <img :src="item.img">
          </span>
          <div class="univerInfo">
            <section class="top">
              <span>{{item.school}}</span>
              <span>{{item.curplace}}</span>
              <span>{{item.property}}</span>
              <span>{{item.nature}}</span>
            </section>
            <section class="center">
              <span>{{item.type}}</span>
              <span>{{item.lishuyu}}</span>
            </section>
            <span class="bottom">学校网址：{{item.website}}</span>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
import headTop from '@/components/common/header'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tabs: [
        {id: 0, title: '可保底', iscurTab: false},
        {id: 1, title: '较稳妥', iscurTab: false},
        {id: 2, title: '可冲击', iscurTab: true}
      ],
      curtab: 0, // 当前被选择tab标识,用来渲染tab选中样式
      i: 0,
      tabContent: [],
      initDatas: [],
      risk: {
        low: 0,
        middle: 5,
        high: 10
      }
    }
  },
  components: {
    headTop
  },
  computed: {
    ...mapState({
      userID: state => state.user.userID
    })
  },
  methods: {
    toggletab (index) {
      this.curtab = index // 将选中的tab的index赋给curtab
      this.i = index
      let data = this.initDatas
      let score = data.score
      if (index === 0) {
        this.isShowTab = true
        score = data.score * (this.risk.low / 100 + 1)
      } else if (index === 1) {
        score = data.score * (this.risk.middle / 100 + 1)
      } else {
        score = data.score * (this.risk.high / 100 + 1)
      }
      this.finalTour(data.curplace, data.subject, score)
    },
    initData () {
      let uid = this.userID
      this.axios.post('/api/data/basSelect', {
        uid
      }).then(res => {
        let result = res.data[0]
        this.finalTour(result.curplace, result.subject, result.score)
        this.initDatas = result
      })
    },
    finalTour (cur, sub, score) {
      this.axios.post('/api/data/finalTour', {
        cur, sub, score
      }).then(res => {
        var that = this
        var promiseAll = res.data.map(function (item) {
          let school = item.school
          return that.axios.post('/api/data/schoolSelect', {school})
        })
        that.axios.all(promiseAll).then(resArr => {
          that.tabContent = []
          resArr.forEach((res, i) => {
            if (res.data.length !== 0) {
              that.tabContent.push(res.data[0])
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
.final-page {
  padding-top: 70px;
}
.tab {
  display: flex;
  justify-content: space-around;
  padding-bottom: 2px;
  border-bottom: 1px solid #cccccc;
}
.tab li {
  font-size: 22px;
  padding-bottom: 5px;
}
.tabCur {
  border-bottom: 5px solid #37A2DA;
}
.tabContent {
  margin-top: 15px;
}
.content {
  display: flex;
}
.univerIcon {
  width: 90px;
  height: 90px;
  margin-left: 5px;
}
img {
  width: 85px;
  height: 85px;
}
.univerInfo {
  width: 100%;
  margin-left: 10px;
}
.top span, .center span, .bottom {
  font-size: 18px;
}
</style>
