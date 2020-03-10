<template>
  <div class="iden-page">
    <headTop title="身份认证"></headTop>
    <section class="listCom">
      <router-link to="/final" class="list">
        <span>学校名称</span>
        <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
      </router-link>
      <router-link to="/seniors" class="list">
        <span>专业名称</span>
        <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
      </router-link>
      <router-link to="/seniors" class="list">
        <span>入学年份</span>
        <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
      </router-link>
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
export default {
  data () {
    return {
      isShowOne: true,
      isShowTwo: true,
      imgStr: require('../../images/upload.png'),
      imgStrs: require('../../images/upload.png')
    }
  },
  components: {
    headTop
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
      var dataURL = URL.createObjectURL(file)
      // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
      if ($target.id === 'imagePick') {
        _this.imgStr = dataURL
        _this.isShowOne = false
      } else {
        this.imgStrs = dataURL
        this.isShowTwo = false
      }
    },
    handleEdit () {
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
