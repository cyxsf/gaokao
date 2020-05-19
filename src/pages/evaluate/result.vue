<template>
    <div class="result-page">
      <headTop title='霍兰德兴趣测评'></headTop>
      <div class="result">
        <span class="rs">您的霍兰德类型是:{{rs}}</span>
        <div id="myResultTab"></div>
        <div class="info">
          <span class="title">结果解读</span>
          <p class="incli">人格倾向:{{incli}}</p>
          <p class="major">推荐专业:{{major}}</p>
          <p class="occu">推荐职业:{{occu}}</p>
        </div>
      </div>
      <button class="return" @click="goToAddress">填报推荐</button>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      myResults: [],
      rsData: {},
      rs: '',
      incli: '',
      major: '',
      occu: ''
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
    draw (results) {
      let myChart = this.$echarts.init(document.getElementById('myResultTab')) // 绘制图表
      let values = Object.values(results)
      let tabFormateConfig = {
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          radius: '70%',
          indicator: [
            {name: '常规型(C)', max: 10},
            {name: '现实型(R)', max: 10},
            {name: '研究型(I)', max: 10},
            {name: '管理型(E)', max: 10},
            {name: '社会型(S)', max: 10},
            {name: '艺术型(A)', max: 10}
          ]
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: values.map(single => single),
              symbol: 'circle',
              symbolSize: 5, // 拐点大小
              lineStyle: { // 线条
                normal: {
                  color: '#37A2DA'
                }
              },
              itemStyle: { // 拐点
                normal: {
                  color: '#fff',
                  borderColor: '#37A2DA'
                }
              },
              areaStyle: { // 区域
                normal: {
                  opacity: 0.7,
                  color: '#37A2DA'
                }
              }
            }
          ]
        }]
      }
      myChart.setOption(tabFormateConfig)
      window.addEventListener('resize', function () { myChart.resize() })
    },
    resultAnalysis (results) {
      let values = Object.entries(results)
      values.sort((a, b) => (b[1] - a[1]))
      this.axios.post('/api/test/cateSelect', {
      }).then(res => {
        this.rsData = res.data
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < this.rsData.length; j++) {
            if (this.rsData[j].cateid === values[i][0]) this.rs += this.rsData[j].catekey
          }
        }
      })
      this.axios.post('/api/test/resSelect', {
      }).then(res => {
        this.myResults = res.data
        for (let i = 0; i < this.rsData.length; i++) {
          if (this.myResults[i].cateid === values[0][0]) {
            this.incli = this.myResults[i].inclination
            this.major = this.myResults[i].major
            this.occu = this.myResults[i].occupation
          }
        }
      })
      let cateid = values[0][0]
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/test/upInfo', {
        cateid, uid
      }).then(res => {
      })
    },
    goToAddress () {
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/data/goPre', {
        uid
      }).then(res => {
        if (res.data[0]) {
          this.$router.push('/prefer')
        } else {
          this.$router.push('/basic')
        }
      })
    }
  },
  mounted () {
    let myResults = JSON.parse(this.$route.query.res)
    this.resultAnalysis(myResults)
    this.draw(myResults)
  }
}
</script>
<style lang="scss" scoped>
.result-page {
  padding-top: 70px;
}
.rs {
  margin: 15px;
  font-size: 22px;
}
.incli, .major, .occu{
  margin: 15px;
  font-size: 18px;
}
#myResultTab {
  width: 100%;
  height: 250px;
  margin: 10px auto;
}
.title {
  display: block;
  text-align: center;
  font-size: 22px;
  margin-top: 20px;
}
.return {
  display: block;
  width: 80%;
  height: 50px;
  margin: 35px auto;
}
</style>
