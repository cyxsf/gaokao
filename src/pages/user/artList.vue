<template>
  <div class="myarticle-page">
    <headTop title="我的文章"></headTop>
    <ul class="list" v-for="item in artList" :key="item.id">
      <li class="item">
        <section @click="select(item.id)">
          <span>{{item.title}}</span>
          <span>{{item.date}}</span>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
import { getFullTime } from '../../config/date'
export default {
  data () {
    return {
      artList: {},
      time: ''
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
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/pub/myArtList', {
        uid
      }).then(res => {
        this.artList = res.data
        this.artList.forEach(function (item, index) {
          item.date = getFullTime(new Date(item.date))
        })
      })
    },
    select (id) {
      this.$router.push({
        path: '/Article',
        query: {id}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.myarticle-page {
  padding-top: 60px;
}
</style>
