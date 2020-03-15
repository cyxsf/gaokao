<template>
  <div class="schoolSelect-page">
    <headTop title="专业选择"></headTop>
    <section class="menu-contain">
      <section class="major-menu">
        <ul>
          <li v-for="item in dataList" :key="item.id" class="menu-li" @click="chooseMajor(item.major)">
              {{item.major}}
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
      dataList: {},
      school: '',
      major: ''
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.school = this.$route.query.school
    this.initData(this.school)
    console.log(this.school)
  },
  methods: {
    initData (school) {
      this.axios.post('/api/data/majorSelect', {
        school
      }).then((res) => {
        console.log(res.data)
        this.dataList = res.data
      })
    },
    chooseMajor (major) {
      let school = this.school
      this.$router.push({
        path: '/user/iden',
        query: {
          school,
          major
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
  height: 100%;
}
.menu-li {
  padding: 10px 10px;
  border-bottom: 1px solid #ededed;
  box-sizing: border-box;
  text-align: center;
}
.major-menu {
  width: 100%;
  overflow: scroll;
}
</style>
