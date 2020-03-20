<template>
  <div class="article-page">
    <headTop title="文章展示"></headTop>
    <span class="title">{{title}}</span>
    <mavon-editor
    v-model="markdown"
    :toolbarsFlag='false'
    :subfield='false'
    defaultOpen='preview'
    class="content"/>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      markdown: '',
      title: ''
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
      this.axios.post('/api/pub/selectArt', {
        uid
      }).then(res => {
        this.markdown = res.data[0].markdown
        this.title = res.data[0].title
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-page {
  padding-top: 60px;
  height: 100%;
  overflow: scroll;
}
.title {
  display: block;
  font-size: 30px;
  padding: 10px;
  text-align: center;
}
.content {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>
