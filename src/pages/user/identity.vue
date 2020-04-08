<template>
  <div class="iden-page">
    <headTop title="身份认证"></headTop>
    <section class="listCom">
      <router-link to="/user/schoolSelect" class="list">
        <span>学校名称</span>
        <section class="contain">
          <p>{{school}}</p>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </section>
      </router-link>
      <router-link :to="{path:'/user/majorSelect', query: {school}}" class="list" v-show="showMajor">
        <span>专业名称</span>
        <section class="contain">
          <p>{{major}}</p>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </section>
      </router-link>
      <section class="list">
        <span>入学年份</span>
        <el-date-picker v-model="value" type="year" placeholder="选择年" :picker-options="pickerOptions"></el-date-picker>
      </section>
    </section>
    <div class="upload-contain">
    <div class="user-header" @click="handleClicks">
      <input type="file" id="imagePick" ref="imagePick" accept=".jpg, .jpeg, .png, .gif"
      @change="handleImg" style="display:none" />
      <img  alt="" :src='imgStr' class="user-header-com" :class="{'isUpload':!isShowOne}">
      <div class="text" v-if="isShowOne">上传身份证个人信息页</div>
    </div>
    <div class="user-header" @click="handleClick">
      <input type="file" id="imagePicker" ref="imagePicker" accept=".jpg, .jpeg, .png, .gif"
      @change="handleImg" style="display:none" />
      <img  alt="" :src='imgStrs' class="user-header-com" :class="{'isUpload':!isShowTwo}">
      <div class="text" v-show="isShowTwo">上传学生证、校园卡、学信网待录取通知或拟录取名单截图</div>
    </div>
    </div>
    <span class="tip">提示：所有的证件照片仅用于身份审核，本平台不会外泄</span>
    <button class="btn" @click="handleEdit">提交</button>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      isShowOne: true,
      isShowTwo: true,
      imgStr: require('../../images/upload.png'),
      imgStrs: require('../../images/upload.png'),
      school: '', // 学校
      major: '', // 专业
      showMajor: false,
      value: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.school = this.$route.query.school
    this.major = this.$route.query.major
  },
  computed: {
    ...mapState({
      currentUserProfile: state => state.user.currentUserProfile
    })
  },
  watch: {
    school () {
      if (this.school !== undefined) this.showMajor = true
    }
  },
  methods: {
    handleClick () {
      this.$refs.imagePicker.click()
    },
    handleClicks () {
      this.$refs.imagePick.click()
    },
    handleImg (e) {
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
          if (res.data.errCode === 0) {
            this.axios.get('/api/data/getImgList')
              .then((res) => {
                console.log(res.data)
                if ($target.id === 'imagePick') {
                  _this.imgStr = './static' + res.data[0]
                  _this.isShowOne = false
                } else {
                  this.imgStrs = './static' + res.data[0]
                  this.isShowTwo = false
                }
              })
          }
        })
    },
    handleEdit () {
      let uid = this.currentUserProfile.userID
      let school = this.school
      let major = this.major
      let date = new Date(this.value)
      let year = date.getFullYear()
      let imgStr = this.imgStr
      let imgStrs = this.imgStrs
      this.axios.post('/api/data/insertIden', {
        uid, school, major, year, imgStr, imgStrs
      }).then((res) => {
        this.$router.push('/user')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.iden-page {
  padding-top: 70px;
}
.list {
  @include fa;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  color: #000000;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
}
.contain {
  @include faj;
}
.contain p {
  margin-right: 10px;
}
.upload-contain {
  @include faj;
  margin-top: 10px;
}
.user-header{
  width: 45%;
  height: 100px;
  margin: 15px 10px;
  @include faj;
  flex-direction: column;
  border: 1px dashed #cccccc;
}
.user-header-com{
  width: 30px;
  height: 30px;
}
.isUpload {
  width: 100%;
  height: 100%;
}
.text {
  margin-top: 10px;
  font-size: 12px;
  color: $font-dark;
}
.tip{
  margin-left: 10px;
  font-size: 14px;
  color: $font-dark;
}
.btn {
  display: block;
  width: 100%;
  height: 50px;
  margin-top: 50px;
}
</style>
