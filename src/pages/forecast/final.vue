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
              <span>{{item.nature}}</span>
            </section>
            <section class="center">
              <span>{{item.lishuyu}}</span>
              <span>{{item.property}}</span>
              <span>{{item.type}}</span>
            </section>
            <span class="bottom">网址：{{item.website}}</span>
          </div>
          <section @click="collect(index,item.school,item.rate)">
            <span v-show="!item.collect">+备选</span>
            <span v-show="item.collect">已备选</span>
          </section>
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
      tabContent: []
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
    toggletab (index) {
      this.curtab = index // 将选中的tab的index赋给curtab
      this.i = index
      if (index === 0) {
        this.isShowTab = true
        this.finalSelect(0)
      } else if (index === 1) {
        this.finalSelect(1)
      } else {
        this.finalSelect(2)
      }
    },
    finalSelect (cate) {
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/data/selReco', {
        uid, cate
      }).then(res => {
        var that = this
        var promiseAll = res.data.map(item => {
          let school = item.school
          return that.axios.post('/api/data/schoolSelect', {school})
        })
        that.axios.all(promiseAll).then(resArr => {
          that.tabContent = []
          resArr.forEach(result => {
            if (result.data.length !== 0) {
              res.data.map(item => {
                if (item.school === result.data[0].school) {
                  if (item.collect === 1) {
                    result.data[0].collect = true
                  } else {
                    result.data[0].collect = false
                  }
                  result.data[0].rate = item.rate
                }
              })
              that.tabContent.push(result.data[0])
            }
          })
        })
      })
    },
    collect (index, school, prerate) {
      let uid = this.currentUserProfile.userID
      this.tabContent[index].collect = !this.tabContent[index].collect
      if (this.tabContent[index].collect === true) {
        let collect = 1
        let rate = prerate + 0.1
        this.axios.post('/api/data/upReco', {rate, collect, uid, school})
      } else {
        let collect = 0
        let rate = prerate - 0.1
        this.axios.post('/api/data/upReco', {rate, collect, uid, school})
      }
    }
  },
  mounted () {
    this.finalSelect(0)
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
  align-items: center;
}
.univerIcon {
  width: 65px;
  height: 65px;
  margin-left: 5px;
}
img {
  width: 60px;
  height: 60px;
}
.univerInfo {
  width: 65%;
  margin: 0 4px;
}
.top span, .center span, .bottom {
  font-size: 18px;
}
</style>
