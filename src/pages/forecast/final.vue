<template>
    <div>
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
export default {
  data () {
    return {
      tabs: [
        {id: 0, title: '可冲击', iscurTab: true},
        {id: 1, title: '较稳妥', iscurTab: false},
        {id: 2, title: '可保底', iscurTab: false}
      ],
      curtab: 0, // 当前被选择tab标识,用来渲染tab选中样式
      i: 0,
      tabContent: {},
      fid: '91',
      sid: '141'
    }
  },
  components: {
    headTop
  },
  methods: {
    toggletab (index) {
      this.curtab = index // 将选中的tab的index赋给curtab
      this.i = index
      if (index === 0) {
        this.isShowTab = true
        this.fid = '91'
        this.sid = '141'
      } else if (index === 1) {
        this.fid = '58'
        this.sid = '90'
      } else {
        this.fid = '113'
        this.sid = '163'
      }
      this.finalTour()
    },
    finalTour () {
      let fid = this.fid
      let sid = this.sid
      this.axios.post('/api/data/finalTour', {
        fid, sid
      }).then(res => {
        this.tabContent = res.data
      })
    }
  },
  mounted () {
    this.finalTour()
  }
}
</script>

<style lang="scss" scoped>
.tabArea {
  margin-top: 70px;
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
