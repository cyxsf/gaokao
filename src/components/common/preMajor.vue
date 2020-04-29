<template>
  <div class="precity-page">
    <headTop title='专业偏好' :showRight='true' @goSend='goSend'></headTop>
    <div class="tips back">
      <span class="main">您对哪些专业感兴趣?(可多选)</span>
      <span class="sub">您的选择会影响推荐专业的顺序</span>
    </div>
    <el-tree
      :data="major"
      accordion
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      >
    </el-tree>
  </div>
</template>

<script>
import headTop from '@/components/common/header'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      major: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      reg: ''
    }
  },
  computed: {
    ...mapState({
      currentUserProfile: state => state.user.currentUserProfile
    })
  },
  methods: {
    initData () {
      let uid = this.currentUserProfile.userID
      this.axios.post('/api/data/preMajor', {
        uid
      }).then(res => {
        res.data.map(item => {
          if (item.level === 1) {
            let obj = {
              label: item.major,
              id: item.id,
              children: []
            }
            this.major.push(obj)
          }
        })
        for (let i = 0; i < this.major.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].parentnodeid === this.major[i].id) {
              let obj = {
                label: res.data[j].major,
                id: res.data[j].id,
                children: []
              }
              this.major[i].children.push(obj)
            }
          }
        }
      })
      this.axios.post('/api/data/basSelect', {
        uid
      }).then(res => {
        this.preApp = res.data.preapp
        this.reg = res.data[0].prereg
        let choose = res.data[0].premajor
        let cateid = res.data[0].cateid
        if (choose === null && cateid) {
          this.axios.post('/api/data/resSelect', {
            cateid
          }).then(res => {
            let temp = res.data[0].major
            let result = [...temp.split('、')]
            let keyItems = []
            result.forEach(item => {
              this.axios.post('/api/data/majorSel', {
                item
              }).then(res => {
                for (let i = 0; i < res.data.length; i++) {
                  keyItems.push(res.data[i].id)
                  this.$refs.tree.setCheckedKeys(keyItems)
                }
              })
            })
          })
        } else if (choose) {
          let result = [...choose.split(' ')]
          let keyItems = []
          result.forEach(item => {
            this.axios.post('/api/data/majorSel', {
              item
            }).then(res => {
              for (let i = 0; i < res.data.length; i++) {
                keyItems.push(res.data[i].id)
                this.$refs.tree.setCheckedKeys(keyItems)
              }
            })
          })
        }
      })
    },
    goSend (name) {
      let uid = this.currentUserProfile.userID
      let temp = []
      this.$refs.tree.getCheckedNodes().map(item => {
        if (item.children.length === 0 && temp.indexOf(item.label) === -1) {
          temp.push(item.label)
        }
      })
      let major = temp.join(' ')
      let reg = this.reg
      let preApp = this.preApp
      this.axios.post('/api/data/preUpdate', {
        preApp, reg, major, uid
      }).then(res => {
        this.$router.push('/prefer')
      })
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
.precity-page {
  padding-top: 60px;
}
.tips {
  height: 60px;
  display: flex;
  padding: 5px 15px;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid #cccccc;
  background-color: #dddddd;
}
.sub {
  color: #5f5f5f;
  margin-top: 4px;
}
.el-tree /deep/ .el-tree-node .el-tree-node__content{
  width: 100%;
  height: 50px;
  margin: 1px 0;
}
</style>
