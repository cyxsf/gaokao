<template>
  <div class="schoolSelect-page">
    <headTop title="学校选择"></headTop>
    <section class="menu-contain">
      <section class="wrapper-menu">
        <ul>
          <li v-for="(item,index) in proList" :key="item.id" class="menu-li"
          :class="{'choose': index == menuIndex}" @click="chooseMenu(index,item.name)">
            {{item.name}}
          </li>
        </ul>
      </section>
      <section class="school-menu">
        <ul>
          <li v-for="item in dataList" :key="item.id" class="menu-li" @click="chooseSchool(item.school)">
              {{item.school}}
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
export default {
  data () {
    return {
      proList: {},
      dataList: {},
      school: '',
      menuIndex: 0 // 已选菜单索引值
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.post('/api/data/proSelect')
        .then((res) => {
          console.log(res.data)
          this.proList = res.data
        })
      let cur = '北京'
      this.axios.post('/api/data/schoolSelect', {
        cur
      }).then((res) => {
        console.log(res.data)
        this.dataList = res.data
      })
    },
    chooseMenu (index, cur) {
      this.menuIndex = index
      this.axios.post('/api/data/schoolSelect', {
        cur
      }).then((res) => {
        console.log(res.data)
        this.dataList = res.data
      })
    },
    chooseSchool (school) {
      this.$router.push({
        path: '/user/iden',
        query: {
          school
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.schoolSelect-page {
  padding-top: 60px;
  height: 100%;
}
.menu-contain {
  display: flex;
  height: 100%;
}
.wrapper-menu {
  width: 30%;
  background-color: $background-light;
  overflow: scroll;
}
.menu-li {
  padding: 10px 10px;
  border-bottom: 1px solid #ededed;
  box-sizing: border-box;
  text-align: center;
}
.choose{
  border-left: 2px solid #3190e8;
  background-color: #fff;
}
.school-menu {
  flex: 1;
  overflow: scroll;
}
</style>
