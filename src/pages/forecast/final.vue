<template>
    <div class="final-page">
      <headTop title='填报指南'></headTop>
      <div class="tabArea">
        <ul class="tab">
          <li v-for="(tab,index) in tabs" :key="tab.id" :class="{tabCur:curtab===index}"
          @click="toggletab(index)">{{tab.title}}</li>
        </ul>
      </div>
      <div class="tabContent" v-for="(item, index) in tabContent" :key="item.school+index">
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
      score: {
        high: 0,
        low: 0
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
      this.score.low = data.score
      this.score.high = data.score
      if (index === 0) {
        this.isShowTab = true
        this.score.low = data.score - 50
        this.score.high = data.score - 20
      } else if (index === 1) {
        this.score.low = data.score - 20
        this.score.high = data.score - 10
      } else {
        this.score.low = data.score - 10
        this.score.high = data.score + 10
      }
      this.finalTour(data.curplace, data.subject, this.score.low, this.score.high)
    },
    initData () {
      let uid = this.userID
      this.axios.post('/api/data/basSelect', {
        uid
      }).then(res => {
        let result = res.data[0]
        this.finalTour(result.curplace, result.subject, result.score - 50, result.score - 20)
        this.initDatas = result
      })
    },
    finalTour (cur, sub, low, high) {
      this.axios.post('/api/data/finalTour', {
        cur, sub, low, high
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
