<template>
  <div class="chat-bubble" @mousedown.stop @contextmenu.prevent>
    <el-dropdown trigger="" ref="dropdown" v-if="!message.isRevoked" @command="handleCommand">
      <div class="message-content" :class="bubbleStyle">
        <slot></slot>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="revoke" v-if="isMine">撤回</el-dropdown-item>
        <!-- <el-dropdown-item command="delete">删除</el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>
    <div class="group-tip-element-wrapper" v-if="message.isRevoked">
      {{text}}
      <el-button type="text" size="mini" class="edit-button" v-show="isEdit" @click="reEdit">&nbsp;重新编辑</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBubble',
  data () {
    return {
      isTimeout: false
    }
  },
  props: {
    isMine: {
      type: Boolean
    },
    isNew: {
      type: Boolean
    },
    message: {
      type: Object,
      required: true
    }
  },
  created () {
    this.isTimeoutHandler()
  },
  mounted () {
    if (this.$refs.dropdown && this.$refs.dropdown.$el) {
      this.$refs.dropdown.$el.addEventListener('mousedown', this.handleDropDownMousedown)
    }
  },
  beforeDestroy () {
    if (this.$refs.dropdown && this.$refs.dropdown.$el) {
      this.$refs.dropdown.$el.removeEventListener('mousedown', this.handleDropDownMousedown)
    }
  },
  computed: {
    bubbleStyle () {
      let classString = ''
      if (this.isMine) {
        classString += 'message-send'
      } else {
        classString += 'message-received'
      }
      if (this.isNew) {
        classString += 'new'
      }
      return classString
    },
    text () {
      if (this.message.conversationType === 'C2C' && !this.isMine) {
        return '对方撤回了一条消息'
      }
      if (this.message.conversationType === 'GROUP' && !this.isMine) {
        return `${this.message.from}撤回了一条消息`
      }
      return '你撤回了一条消息'
    },
    isEdit () {
      if (!this.isMine) {
        return false
      }
      if (this.message.type !== this.TIM.TYPES.MSG_TEXT) {
        return false
      }
      if (this.isTimeout) {
        return false
      }
      return true
    }
  },
  methods: {
    handleDropDownMousedown (e) {
      if (!this.isMine || this.isTimeout) {
        return
      }
      if (e.buttons === 2) {
        if (this.$refs.dropdown.visible) {
          this.$refs.dropdown.hide()
        } else {
          this.$refs.dropdown.show()
        }
      }
    },
    handleCommand (command) {
      switch (command) {
        case 'revoke':
          this.tim.revokeMessage(this.message).then(() => {
            this.isTimeoutHandler()
          }).catch((err) => {
            this.$store.commit('showMessage', {
              message: err,
              type: 'warning'
            })
          })
          break
        default:
          break
      }
    },
    isTimeoutHandler () { // 从发送消息时间开始算起，两分钟内可以编辑
      let now = new Date()
      if (parseInt(now.getTime() / 1000) - this.message.time > 2 * 60) {
        this.isTimeout = true
        return
      }
      setTimeout(this.isTimeoutHandler, 1000)
    },
    reEdit () {
      this.$bus.$emit('reEditMessage', this.message.payload.text)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
