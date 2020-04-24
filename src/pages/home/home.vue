<template>
    <div class="home-page">
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
        <!--
        <router-link to="/final" class="list">
          <span>填报指南</span>
          <icon-svg class="icon" icon-class="icon-youhua"></icon-svg>
        </router-link>
        -->
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
      // 会话列表更新
      this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList)
    },
    onReceiveMessage ({ data: messageList }) {
      this.handleAt(messageList)
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
    },
    onUpdateConversationList (event) {
      this.$store.commit('updateConversationList', event.data)
    },
    /**
     * 处理 @ 我的消息
     * @param {Message[]} messageList
     */
    handleAt (messageList) {
      // 筛选有 @ 符号的文本消息
      const atTextMessageList = messageList.filter(
        message =>
          message.type === this.TIM.TYPES.MSG_TEXT &&
          message.payload.text.includes('@')
      )
      for (let i = 0; i < atTextMessageList.length; i++) {
        const message = atTextMessageList[i]
        const matched = message.payload.text.match(/@\w+/g)
        if (!matched) {
          continue
        }
        // @ 我的
        if (matched.includes(`@${this.currentUserProfile.userID}`)) {
          // 当前页面不可见时，调用window.Notification接口，系统级别通知。
          if (this.$store.getters.hidden) {
            this.notifyMe(message)
          }
          Notification({
            title: `有人在群${message.conversationID.slice(5)}提到了你`,
            message: message.payload.text,
            duration: 3000
          })
          this.$bus.$emit('new-messsage-at-me', {
            data: { conversationID: message.conversationID }
          })
        }
      }
    },
    /**
     * 使用 window.Notification 进行全局的系统通知
     * @param {Message} message
     */
    notifyMe (message) {
      // 需检测浏览器支持和用户授权
      if (!('Notification' in window)) {
        // eslint-disable-next-line no-useless-return
        return
      } else if (window.Notification.permission === 'granted') {
        this.handleNotify(message)
      } else if (window.Notification.permission !== 'denied') {
        window.Notification.requestPermission().then(permission => {
          // 如果用户同意，就可以向他们发送通知
          if (permission === 'granted') {
            this.handleNotify(message)
          }
        })
      }
    },
    handleNotify (message) {
      const notification = new window.Notification('有人提到了你', {
        icon: 'https://webim-1252463788.file.myqcloud.com/demo/img/logo.dc3be0d4.png',
        body: message.payload.text
      })
      notification.onclick = () => {
        window.focus()
        this.$store.dispatch('checkoutConversation', message.conversationID)
        notification.close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.home-page {
  padding-top: 60px;
}
.main {
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
