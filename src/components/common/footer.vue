<template>
    <div id="foot_guide">
      <section class="guide_item" @click="gotoAddress('/')">
        <icon-svg class="icon" icon-class="icon-home"></icon-svg>
        <span>首页</span>
      </section>
      <section class="guide_item" @click="gotoAddress('/basic')">
        <icon-svg class="icon" icon-class="icon-form"></icon-svg>
        <span>填报推荐</span>
      </section>
      <section class="guide_item" @click="drawer = true">
        <icon-svg class="icon" icon-class="icon-tianjia"></icon-svg>
      </section>
      <section class="guide_item" @click="gotoAddress('/mesList')">
        <icon-svg class="icon" icon-class="icon-xiaoxi"></icon-svg>
        <span>我的消息</span>
      </section>
      <section class="guide_item" @click="gotoAddress('/user')">
        <icon-svg class="icon" icon-class="icon-account"></icon-svg>
        <span>个人中心</span>
      </section>
      <el-drawer
      :visible.sync="drawer"
      direction="btt"
      :with-header="false"
      :before-close="handleClose"
      :append-to-body="true">
        <div class="close" @click="handleClose">
          <icon-svg class="icon" icon-class="icon-cuowu"></icon-svg>
        </div>
        <el-input placeholder="提出问题" @click="gotoAddress('/raiseQue')">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <section class="item-list">
         <section class="guide_item" @click="gotoAddress('/mesList')">
          <icon-svg class="icon" icon-class="icon-xiaoxi"></icon-svg>
          <span>回答问题</span>
          </section>
          <section class="guide_item" @click="gotoAddress('/pubArticle')">
            <icon-svg class="icon" icon-class="icon-account"></icon-svg>
            <span>发表文章</span>
          </section>
        </section>
      </el-drawer>
    </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    gotoAddress (path) {
      this.$router.push(path)
    },
    handleClose (done) { // 点击ESC,drawer会关闭
      this.timer = setTimeout(() => {
        done()
        // 动画关闭需要一定的时间
        setTimeout(() => {
          this.loading = false
        }, 400)
      }, 2000)
    }
  }
}
</script>
<style lang="scss" scoped>
#foot_guide {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 60px;
  align-items: center;
  background: #cccccc;
}
.guide_item {
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;
  flex-direction: column;
}
.icon {
  width: 30px;
  height: 30px;
}
.close {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-list {
  display: flex;
  padding: 25px;
}
</style>
