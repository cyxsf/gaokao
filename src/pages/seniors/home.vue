<template>
    <div class="seniors-page">
        <headTop title="学长学姐"></headTop>
        <el-input placeholder="搜索关键词" v-model="keyword" class="selects" @change='queryData'>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
          <section class="listCom" v-for="item in seniorList" :key='item.userid'>
            <span clss="privateImg">
                <img :src="item.avatar" alt="用户头像">
            </span>
            <div class="info">
                <div class="nameinfo">
                  <span class="name">{{item.name || item.userid}}</span>
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
import {mapState} from 'vuex'
export default {
  data () {
    return {
      seniorList: {},
      keyword: '',
      oldList: {}
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.initData()
  },
  computed: {
    ...mapState({
      currentUserProfile: state => state.user.currentUserProfile
    })
  },
  methods: {
    initData () {
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/user/senSelect', {
        uid
      }).then(res => {
        this.seniorList = res.data
        this.seniorList.forEach(function (item, index) {
          if (item.avatar === '') item.avatar = 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-2.png'
        })
        this.oldList = this.seniorList
      })
    },
    sendMess (uid) {
      this.$router.push('/sendmes')
      this.$store.dispatch('checkoutConversation', `C2C${uid}`)
    },
    queryData () {
      let keyValue = this.keyword
      if (keyValue === '' || keyValue === null) {
        this.seniorList = this.oldList
      } else {
        let list = this.seniorList.filter(item =>
          item.name.indexOf(keyValue) !== -1 ||
          item.school.indexOf(keyValue) !== -1 ||
          item.major.indexOf(keyValue) !== -1)
        this.seniorList = list
      }
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
