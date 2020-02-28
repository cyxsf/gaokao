<template>
    <div>
      <headTop title="首页" :showLeft='false'></headTop>
      <div class="main">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item of list" :key="item.id">
            <img class="swiper-img" :src="item.imgUrl"/>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <section class="listCom">
        <router-link to="/evalhome" class="list">
          <span>兴趣测试</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </router-link>
        <router-link to="/final" class="list">
          <span>填报指南</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </router-link>
        <router-link to="/sendmes" class="list">
          <span>发送信息</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </router-link>
        <router-link to="/seniors" class="list">
          <span>学长学姐</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </router-link>
      </section>
      </div>
      <footGuide></footGuide>
    </div>
</template>
<script>
import headTop from '@/components/common/header'
import footGuide from '@/components/common/footer'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      list: [
        {'id': 1, 'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582301424352&di=f776b94404c266168bed621b495e2806&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150607%2Fmp17971087_1433662474707_3_th.jpeg'},
        {'id': 2, 'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582301374556&di=95348752b9f5590e6607d11b911ae5c3&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F10994723519%2F1000.jpg'},
        {'id': 3, 'imgUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582301336122&di=9d71b1241a184324d1bff93b8b33dd96&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180518%2F3c54dadf86a642eba5c0f8aebb61aed2.jpeg'}
      ]
    }
  },
  components: {
    headTop,
    footGuide,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapState({
      currentUserProfile: state => state.user.currentUserProfile,
      currentConversation: state => state.conversation.currentConversation,
      isLogin: state => state.user.isLogin,
      isSDKReady: state => state.user.isSDKReady,
      userID: state => state.user.userID
    })
  },
  mounted () {
    // 初始化监听器
    this.initListener()
  },
  methods: {
    goToAddress (path) {
      this.$router.push(path)
    },
    initListener () {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
      // SDK NOT READT
      this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // SDK内部出错
      this.tim.on(this.TIM.EVENT.ERROR, this.onError)
      // 收到新消息
      this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
    },
    onReceiveMessage ({ data: messageList }) {
      this.handleVideoMessage(messageList)
      this.handleAt(messageList)
      this.handleQuitGroupTip(messageList)
      this.$store.commit('pushCurrentMessageList', messageList)
    },
    onError ({ data }) {
      if (data.message !== 'Network Error') {
        this.$store.commit('showMessage', {
          message: data.message,
          type: 'error'
        })
      }
    },
    onReadyStateUpdate ({ name }) {
      // eslint-disable-next-line no-unneeded-ternary
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
      this.$store.commit('toggleIsSDKReady', isSDKReady)

      if (isSDKReady) {
        this.tim
          .getMyProfile()
          .then(({ data }) => {
            this.$store.commit('updateCurrentUserProfile', data)
          })
          .catch(error => {
            this.$store.commit('showMessage', {
              type: 'error',
              message: error.message
            })
          })
        this.$store.dispatch('getBlacklist')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.main {
  margin-top: 60px;
  border-top: 1px solid #ffffff;
}
.swiper-img {
  width: 100%;
  height: 250px;
}
.listCom {
  border-top: 1px solid #cccccc;
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
</style>
