<template>
    <div>
        <headTop title='地区'></headTop>
        <div class="tips back">
          <span>定位地区</span>
          <span>定位不准时，请在地区列表中选择</span>
        </div>
        <span class="local">{{local}}</span>
        <div class="back"></div>
        <section class="province">
          <ul class="letter">
            <li v-for="item in province" :key="item.psort" class="info">
              {{item.name}}
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
    city () { // 获取当前省份
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((r) => {
        this.local = r.address.province // 获取省份信息
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
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.city()
  }
}
</script>

<style lang="scss" scoped>
.tips {
  display: flex;
  margin-top: 62px;
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
