<template>
  <div class="articles-page" @click="more=false">
    <headTop title="文章列表"></headTop>
    <ul class="list">
      <li class="item" v-for="item in artList" :key="item.id">
        <section class="article">
          <span class="title" @click="select(item.id)">{{item.title}}</span>
          <span class="writer">作者：{{item.name}}</span>
          <section class="info">
            <span class="date">{{item.date}}</span>
          </section>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
import { getFullDate } from '../../config/date'
export default {
  data () {
    return {
      artList: {}
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
      this.axios.post('/api/pub/allArt')
        .then(res => {
          let that = this
          that.artList = res.data
          that.artList.forEach(function (item, index) {
            let uid = item.userid
            that.axios.post('/api/data/basSelect', {uid})
              .then((res) => {
                item.name = res.data[0].name
                item.date = getFullDate(new Date(item.date))
              })
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
.articles-page {
  padding-top: 60px;
  height: 100%;
}
.list {
  list-style: none;
  border-bottom: 1px solid #cccccc;
}
.item {
  border-top: 1px solid #cccccc;
}
.article {
  padding: 12px 10px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 2;
  margin-right: 15px;
}
.info {
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: #909090;
}
.date {
  margin-right: 15px;
}
</style>
