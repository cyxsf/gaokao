<template>
  <div class="publish-page">
    <headTop title="写文章" :showRight='true' @goSend='goSend'></headTop>
    <input class="title" placeholder="请输入标题" v-model='title'/>
    <mavon-editor v-model='content' class='content' ref='editor'/>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
import { getFullTime, getFullDate } from '../../config/date'
export default {
  data () {
    return {
      title: '',
      content: '',
      id: ''
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
    this.id = this.$route.query.id
    this.initData(this.id)
  },
  methods: {
    initData (id) {
      this.axios.post('/api/pub/selectArt', {
        id
      }).then(res => {
        if (res.data[0]) {
          this.title = res.data[0].title
          this.content = res.data[0].markdown
        }
      })
    },
    goSend () {
      let uid = this.currentUserProfile.userID
      let title = this.title
      let html = this.$refs.editor.d_render
      let markdown = this.content
      let date = getFullDate(new Date())
      let pid = uid + getFullTime(new Date())
      let id = this.id
      this.axios.post('/api/pub/selectArt', {
        id
      }).then(res => {
        if (res.data[0]) {
          this.axios.post('/api/pub/updateArt', {
            uid, title, markdown, html, date, id
          }).then(res => {
            this.$router.push('/user/artList')
          })
        } else {
          this.axios.post('/api/pub/insertArt', {
            pid, uid, title, markdown, html, date
          }).then(res => {
            this.$router.push('/user/artList')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-page {
  padding-top: 60px;
  height: 100%;
  overflow: scroll;
}
.title {
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  border-bottom: 1px solid #000000;
}
.content {
  width: 100%;
  height: 100%;
  overflow: scroll;
  font-size: 18px;
}
</style>
