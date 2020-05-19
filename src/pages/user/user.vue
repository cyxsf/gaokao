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
      <div class="volunteer" @click ="dialogFormVisible = true">
        <span class="balance">{{balance}}</span>
        <span>我的余额</span>
      </div>
    </section>
    <el-dialog :title="currentUserProfile.role === 0 ? '充值':'提现'" :visible.sync="dialogFormVisible" width="80%" center>
      <el-form :model="form">
        <el-form-item label = "金额" prop="money" label-width="50px"
        :rules = "[{type: 'number', message: '金额必须为数字值'}]">
          <el-input type="money" v-model.number = "form.money" placeholder="请输入金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="recharge">确 定</el-button>
      </div>
    </el-dialog>
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
          <icon-svg class="icon" icon-class="icon-xuesheng"></icon-svg>
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
  inject: ['reload'],
  data () {
    return {
      userid: '', // 用户
      showAlert: false,
      alertText: '',
      iconType: true,
      computedTime: 0,
      balance: '',
      dialogFormVisible: false,
      form: {
        money: ''
      }
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
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/data/basSelect', {
        uid
      }).then((res) => {
        this.balance = res.data[0].balance
      })
      this.axios.post('/api/user/seniSelect', {uid})
        .then(res => {
          if (res.data.length !== 0 && this.currentUserProfile.role === 0) {
            this.tim.updateMyProfile({role: 1})
          }
        })
    },
    userOut () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    recharge () {
      let uid = this.currentUserProfile.userID
      if (this.currentUserProfile.role === 0) {
        this.axios.post('/api/data/basSelect', {
          uid
        }).then((res) => {
          let money = res.data[0].balance + this.form.money
          this.axios.post('/api/user/upBalance', {
            money, uid
          }).then(() => {
            this.reload()
            this.dialogFormVisible = false
          })
        })
      } else {
        this.axios.post('/api/data/basSelect', {
          uid
        }).then((res) => {
          let money = res.data[0].balance - this.form.money
          if (money <= 0) {
            this.showAlert = true
            this.alertText = '提现金额大于余额无法提取'
            this.dialogFormVisible = false
          } else {
            this.axios.post('/api/user/upBalance', {
              money, uid
            }).then(() => {
              this.reload()
              this.dialogFormVisible = false
            })
          }
        })
      }
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
.balance {
  font-size: 22px;
  color: #3297fd;
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
