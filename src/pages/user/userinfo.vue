<template>
  <div class="userinfo-page">
      <headTop title='账户信息'></headTop>
      <section class="listCom">
        <div class="list">
          <span>头像</span>
          <div class="info" @click="handleSendImageClick">
            <avatar :src="currentUserProfile.avatar"/>
            <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
          </div>
        </div>
        <div class="list">
          <span>用户名</span>
          <div class="info">
            <input type="text" v-model="nick" class="nick"/>
            <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
          </div>
        </div>
        <router-link to='/forget' class="list">
          <span>登录密码</span>
          <div class="info">
            <p>修改</p>
            <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
          </div>
        </router-link>
      </section>
      <button class="btn" @click="handleEdit">确认修改</button>
      <input
      type="file"
      id="imagePicker"
      ref="imagePicker"
      accept=".jpg, .jpeg, .png, .gif"
      @change="sendAvatar"
      style="display:none" />
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      imgUrl: '',
      nick: ''
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
    handleSendImageClick () {
      this.$refs.imagePicker.click()
    },
    sendAvatar (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var _this = this
      // FormData保存图片信息
      var formData = new FormData()
      formData.append('file', file)
      // console.log(formData.get('file'))
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.axios.post('/api/data/upload', formData, config)
        .then((res) => {
          console.log(res.data)
          // 加一个随机的时间戳，系统会使用服务器返回的图片
          // _this.imgUrl = res.data + `?t+${Math.random()}`
        })
      this.axios.get('/api/data/getImgList')
        .then((res) => {
          console.log(res.data)
          _this.imgUrl = res.data
        })
    },
    handleEdit () {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.userinfo-page {
  padding-top: 60px;
}
.list {
  @include fa;
  width: 100%;
  height: 55px;
  padding: 0 15px;
  color: $black;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
}
.list:first-child {
  height: 80px;
  .avatar {
  width: 50px;
  height: 50px;
  }
}
.info {
  @include fa;
  color: $font-dark;
  .nick {
    text-align: right;
    color: $font-dark;
  }
  .icon {
    margin-left: 8px;
  }
}
.btn {
  display: block;
  width: 100%;
  height: 50px;
  margin-top: 50px;
}
</style>
