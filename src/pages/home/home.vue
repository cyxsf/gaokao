<template>
    <div>
      <div class="header"></div>
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
      </section>
      </div>
      <foot-guide></foot-guide>
    </div>
</template>
<script>
import footGuide from '@/components/common/footer'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
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
    footGuide,
    swiper,
    swiperSlide
  },
  methods: {
    goToAddress (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
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
