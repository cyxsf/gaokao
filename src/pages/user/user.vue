<template>
    <div class="user-page">
        <headTop title='个人中心' :showLeft='false'></headTop>
        <section class="userInfo">
          <router-link to='/user/info' class="userlink">
              <span clss="privateImg">
                <img :src="imgUrl" alt="用户头像">
              </span>
              <span class="userid">用户：{{userid}}</span>
          </router-link>
        </section>
        <section class="infoData">
          <div class="school">
            <icon-svg class="infoicon" icon-class="icon-xuexiao"></icon-svg>
            <span>我的学校</span>
          </div>
          <div class="volunteer">
            <icon-svg class="infoicon" icon-class="icon-xuesheng"></icon-svg>
            <span>我的志愿</span>
          </div>
        </section>
        <section class="listCom">
          <div class="list">
            <div class="left">
              <icon-svg class="icon" icon-class="icon-chengji"></icon-svg>
              <span>我的成绩</span>
            </div>
            <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
          </div>
          <div class="list">
            <div class="left">
              <icon-svg class="icon" icon-class="icon-chengji"></icon-svg>
              <span>身份认证</span>
            </div>
            <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
          </div>
        </section>
        <div class="btn-fa">
          <button class="btn" @click="userOut">退出登录</button>
        </div>
        <footGuide></footGuide>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
import footGuide from '@/components/common/footer'
import {mapState} from 'vuex'
import { getStore } from '@/config/mUtils'
export default {
  data () {
    return {
      userid: '', // 用户
      imgUrl: require('@/images/timg.png')
    }
  },
  components: {
    headTop,
    footGuide
  },
  computed: {
    ...mapState({
      userID: state => state.user.userID
    })
  },
  methods: {
    initData () {
      if (this.userID) {
        this.userid = this.userID
      } else {
        this.userid = getStore('userid')
      }
    },
    userOut () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  watch: {
    userInfo: function (value) {
      this.initData()
    }
  },
  mounted () {
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.user-page {
  padding-top: 60px;
}
.userInfo {
  border-top: 1px solid #ffffff;
}
.userlink {
  @include faj;
  height: 120px;
  color: #ffffff;
  background-color: $co;
  flex-direction: column;
}
img {
  width: 50px;
  height: 50px;
}
.infoData {
  display: flex;
  padding: 10px;
}
.infoData span {
  margin-top: 3px;
}
.school, .volunteer {
  width: 50%;
  flex-direction: column;
  @include faj;
}
.school {
  border-right: 1px solid #cccccc;
}
.infoicon {
  width: 40px;
  height: 40px;
}
.listCom {
  border-top: 1px solid #cccccc;
}
.list {
  @include fa;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
}
.btn-fa {
  @include fj;
  margin-top: 20px;
}
.btn {
  width: 70%;
  line-height: 50px;
  font-size: 18px;
}
</style>
