<template>
  <div class="article-page">
    <el-backtop style="z-index:2000" :right="20" :bottom="20"></el-backtop>
    <headTop title="文章展示"></headTop>
    <section class="article">
      <span class="title">{{title}}</span>
      <mavon-editor
      v-model="markdown"
      :toolbarsFlag='false'
      :subfield='false'
      defaultOpen='preview'/>
    </section>
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
    let id = this.$route.query.id
    this.initData(id)
  },
  methods: {
    initData (id) {
      this.axios.post('/api/pub/selectArt', {
        id
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
}
.title {
  display: block;
  font-size: 30px;
  padding: 10px;
  text-align: center;
}
.article {
  width: 100%;
  /*
  height: 100%;
  overflow: scroll;
  */
}
</style>
