<template>
    <div class="seniors-page">
        <headTop title="学长学姐"></headTop>
        <nav class="selects">
            <div class="selectBox">选择框一</div>
            <div class="selectBox">选择框二</div>
            <div class="selectBox">选择框三</div>
        </nav>
        <section class="listCom" v-for="item in seniorList" :key='item.userid'>
            <span clss="privateImg">
                <img :src="imgUrl" alt="用户头像">
            </span>
            <div class="info">
                <div class="nameinfo">
                  <span class="name">{{item.name}}</span>
                  <span>{{item.school}}</span>
                </div>
              <span class="userinfo">
                  <span>{{item.major}}</span>
                  <span>{{item.year}}级</span>
              </span>
            </div>
            <button class="btn" @click="sendMess(item.userid)">咨询</button>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/common/header'
export default {
  data () {
    return {
      imgUrl: require('@/images/timg.png'),
      seniorList: {}
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
      this.axios.post('/api/seni/senSelect', {
      }).then(res => {
        this.seniorList = res.data
      })
    },
    sendMess (uid) {
      this.$router.push('/sendmes')
      this.$store.dispatch('checkoutConversation', `C2C${uid}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.seniors-page {
  padding-top: 60px;
}
.selects{
  display: flex;
  width: 100%;
  border: 1px solid #cccccc;
}
.listCom {
  margin: 10px 0;
  @include fa;
  border-bottom: 1px solid #cccccc;
}
img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
.info {
  @include fj;
  width: 62%;
  flex-direction: column;
  padding: 5px;
}
.nameinfo, .userinfo {
  padding: 3px;
  font-size: 18px;
}
.btn {
  width: 65px;
  height: 35px;
}
</style>
