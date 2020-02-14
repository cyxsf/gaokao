<template>
    <div>
      <headTop title='填报助手'></headTop>
      <div class="header">基本信息</div>
      <div class="introduce">
        输入地点分数等信息，可以帮助我们更加精确推荐适合您填报的学校
      </div>
      <div class="content">
        <span>生源地</span>
        <input type="text" placeholder="省份"/>
        <div class="contain" @click="goToAddress('/province')">
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </div>
      </div>
      <div class="content">
        <span>科目类别</span>
        <p class="cate">{{subject[i]}}</p>
        <div class="contain" @click="change">
          <icon-svg class="icon" icon-class="icon-qiehuan"></icon-svg>
        </div>
      </div>
      <div class="content">
        <span>分数</span>
        <input type="number" placeholder="高考分数"/>
        <div class="contain">
          <icon-svg class="icon" icon-class="icon-qianbi"></icon-svg>
        </div>
      </div>
      <button class="btn" @click="goToAddress('/prefer')">完成</button>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
export default {
  data () {
    return {
      subject: ['理科', '文科', '艺术类'],
      i: 0
    }
  },
  components: {
    headTop
  },
  methods: {
    goToAddress (path) {
      this.$router.push(path)
    },
    change () {
      this.i++
      if (this.i > this.subject.length - 1) this.i = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  text-align: center;
  margin: 80px 0 20px;
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
  border-bottom: 1px solid #cccccc;
}
.content span {
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
.cate {
  position: absolute;
  right: 45px;
}
.contain {
  position: absolute;
  right: 20px;
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
import BMap from 'BMap'
export default {
  data () {
    return {
      province: {},
      local: '正在定位所在省' // 当前地区
    }
  },
  methods: {
    select () {
      this.axios.post('/api/data/proSelect', {
      }).then(res => {
        this.province = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    city () { // 获取当前省份
      const geolocation = new BMap.Geolocation()
      geolocation.getCurPos(function getinfo (position) {
        let province = position.address.province // 获取省份信息
        console.log(province)
        this.local = province
      }, function (e) {
        this.local = '定位失败'
      }, {provider: 'baidu'})
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.select()
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
