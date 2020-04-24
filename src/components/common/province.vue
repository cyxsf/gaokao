<template>
    <div class="province-page">
        <headTop title='地区'></headTop>
        <div class="tips back">
          <span>定位地区</span>
          <span>定位不准时，请在地区列表中选择</span>
        </div>
        <div class="local" @click="proSelect(local)">
          <span>{{local}}</span>
          <icon-svg icon-class="icon-dingwei"></icon-svg>
        </div>
        <div class="back"></div>
        <section v-for="item in province" :key="item.pid" class="province" @click="proSelect(item.name)">
          <ul class="letter">
            <li class="info">
              {{item.name+item.premark}}
            </li>
          </ul>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/common/header'
export default {
  data () {
    return {
      province: {},
      local: '正在定位所在省' // 当前地区
    }
  },
  methods: {
    cur () { // 获取当前省份
      // eslint-disable-next-line no-undef
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((r) => {
        this.local = r.address.province.replace(/省/g, '')// 获取省份信息
      }, function (e) {
        this.local = '定位失败'
      }, { enableHighAccuracy: true })
      // 省份列表
      this.axios.post('/api/data/proSelect', {
      }).then(res => {
        this.province = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    proSelect (name) {
      this.$router.push({
        path: '/basic',
        query: {
          name
        }
      })
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.cur()
  }
}
</script>

<style lang="scss" scoped>
.province-page {
  padding-top: 62px;
}
.tips {
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  color: #5f5f5f;
  border-bottom: 1px solid #cccccc;
}
.back {
  height: 28px;
  background-color: #dddddd;
}
.local {
  display: block;
  width: 100%;
  padding-left: 15px;
  line-height: 35px;
  color: #d83a2e;
  border-bottom: 1px solid #cccccc;
}
ul {
  width: 100%;
  height: 35px;
}
li {
  padding-left: 15px;
  line-height: 35px;
  border-bottom: 1px solid #cccccc;
}
</style>
