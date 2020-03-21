<template>
  <div class="publish-page">
    <headTop title="写文章" :showRight='true' @goSend='goSend'></headTop>
    <input class="title" placeholder="请输入标题" v-model='title'/>
    <mavon-editor v-model='content' class='content' @save='saveDoc' ref='editor'/>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
import { getFullTime } from '../../config/date'
export default {
  data () {
    return {
      title: '',
      content: ''
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
  methods: {
    goSend () {
      let uid = this.currentUserProfile.userID
      let title = this.title
      let html = this.$refs.editor.d_render
      let markdown = this.content
      let date = getFullTime(new Date())
      this.axios.post('/api/pub/insertArt', {
        uid, title, markdown, html, date
      }).then(res => {
        console.log(res.data)
        // this.$router.push('/Article')
      })
    },
    saveDoc (markdown, html) {
      console.log('markdown内容' + markdown)
      console.log('html内容:' + html)
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
