<template>
  <div class="myarticle-page" @click="more=false">
    <headTop title="我的文章"></headTop>
    <ul class="list">
      <li class="item" v-for="(item,index) in artList" :key="item.id">
        <section class="article">
          <span class="title" @click="select(item.id)">{{item.title}}</span>
          <section class="info">
            <span class="date">{{item.date}}</span>
            <div @click.stop="msgShow(index)">
              <icon-svg icon-class="icon-shenglvehao"></icon-svg>
            </div>
            <div class="menu" v-if="activeIndex===index && more">
              <ul class="menu-list" @click="handleEdit(item.id)">
                <li>编辑</li>
                <li>删除</li>
              </ul>
            </div>
          </section>
        </section>
      </li>
    </ul>
    <alert-tip
    v-if="showAlert"
    @closeTip="showAlert =!showAlert"
    @submitTip="delArt"
    :alertText="alertText"/>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
import { getFullDate } from '../../config/date'
import alertTip from '@/components/common/alertTip'
export default {
  inject: ['reload'],
  data () {
    return {
      artList: {},
      more: false,
      activeIndex: -1,
      showAlert: false,
      alertText: '是否删除已经发表的文章',
      tid: ''
    }
  },
  components: {
    headTop,
    alertTip
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
          item.date = getFullDate(new Date(item.date))
        })
      })
    },
    select (id) {
      this.$router.push({
        path: '/Article',
        query: {id}
      })
    },
    msgShow (index) {
      this.more = true
      this.activeIndex = this.activeIndex === index ? !index : index
    },
    handleEdit (id) {
      let dom = event.target || event.srcElement
      if (dom.innerHTML === '编辑') {
        this.$router.push({
          path: '/pubArticle',
          query: {id}
        })
      } else {
        this.showAlert = true
        this.tid = id
      }
    },
    delArt () {
      let id = this.tid
      this.axios.post('/api/pub/delArt', {
        id
      }).then(res => {
        this.reload()
        // this.initData()
        // this.showAlert = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.myarticle-page {
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
.menu-list {
  position: absolute;
  padding: 10px;
  white-space: nowrap;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  box-shadow: 0 1px 2px 1px hsla(0,0%,95%,.5);
  list-style: none;
}
</style>
