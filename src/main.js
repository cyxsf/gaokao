// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/'
import echarts from 'echarts'
import IconSvg from './components/icons/IconSvg'
import Swiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import tim from './tim'
import TIM from 'tim-js-sdk'
import Avatar from './components/common/avatar'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/icon/tim.css'
// import AgoraRTC from 'agora-rtc-sdk'

window.tim = tim
window.TIM = TIM

Vue.prototype.tim = tim
Vue.prototype.TIM = TIM

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.$echarts = echarts

Vue.component('avatar', Avatar)
Vue.component('icon-svg', IconSvg)

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Swiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
