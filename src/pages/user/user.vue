<template>
  <div class="user-page">
    <headTop title='个人中心' :showLeft='false'></headTop>
    <section class="userInfo">
      <router-link to='/user/info' class="userlink">
          <avatar :src="currentUserProfile.avatar"/>
          <span class="userid">用户：{{currentUserProfile.nick || currentUserProfile.userID}}</span>
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
      <router-link to='/basic' class="list">
        <div class="left">
          <icon-svg class="icon" icon-class="icon-chengji"></icon-svg>
          <span>基本信息</span>
        </div>
        <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
      </router-link>
      <router-link to='/user/artList' class="list">
        <div class="left">
          <icon-svg class="icon" icon-class="icon-chengji"></icon-svg>
          <span>我的文章</span>
        </div>
        <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
      </router-link>
      <section @click="examIden" class="list">
        <div class="left">
          <icon-svg class="icon" icon-class="icon-chengji"></icon-svg>
          <span>身份认证</span>
        </div>
        <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
      </section>
    </section>
    <div class="btn-fa">
      <button class="btn" @click="userOut">退出登录</button>
    </div>
    <footGuide></footGuide>
    <alert-tip v-if="showAlert" @closeTip="closeTip"  @submitTip="closeTip" :alertText="alertText" :iconType ="iconType"></alert-tip>
  </div>
</template>
<script>
import headTop from '@/components/common/header'
import alertTip from '@/components/common/alertTip'
import footGuide from '@/components/common/footer'
import {mapState} from 'vuex'
import { getStore } from '@/config/mUtils'
export default {
  data () {
    return {
      userid: '', // 用户
      showAlert: false,
      alertText: '',
      iconType: true,
      computedTime: 0
    }
  },
  components: {
    headTop,
    footGuide,
    alertTip
  },
  computed: {
    ...mapState({
      currentUserProfile: state => state.user.currentUserProfile
    })
  },
  methods: {
    initData () {
      if (this.currentUserProfile.userID) {
        this.userid = this.currentUserProfile.userID
      } else {
        this.userid = getStore('userid')
      }
    },
    userOut () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    examIden () {
      let uid = this.userid
      this.axios.post('/api/seni/examIden', {
        uid
      }).then((res) => {
        if (res.data.length === 0) { // 没有身份认证时
          this.$router.push('/user/iden')
        } else if (res.data[0].exam === 0) {
          this.showAlert = true
          this.alertText = '身份认证还未审核'
        } else if (res.data[0].exam === 2) {
          this.computedTime = 6
          this.timer = setInterval(() => {
            this.computedTime--
            this.showAlert = true
            this.iconType = false
            this.alertText = '身份认证未通过,' + this.computedTime + 's后自动跳转'
            if (this.computedTime === 0) {
              clearInterval(this.timer)
              this.$router.push('/user/iden')
            }
          }, 1000)
        } else {
          this.showAlert = true
          this.alertText = '身份认证已通过'
        }
      })
    },
    closeTip () {
      this.showAlert = false
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
  .avatar {
  width: 50px;
  height: 50px;
  }
  .userid {
    margin-top: 10px;
  }
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
  color: $black;
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
