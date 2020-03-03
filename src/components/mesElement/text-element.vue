<template>
  <message-bubble :isMine=isMine :message=message>
    <template v-for="(item, index) in contentList">
      <span :key="index" v-if="item.name === 'text'">{{ item.text }}</span>
      <img v-else-if="item.name === 'img'" :src="item.src" width="20px" height="20px" :key="index"/>
    </template>
  </message-bubble>
  <!-- <div class="chat-bubble">
    <div class="message-content" :class="isMine ? 'message-send' : 'message-received'">
      <template v-for="(item, index) in contentList">
        <span :key="index" v-if="item.name === 'text'">{{ item.text }}</span>
        <img v-else-if="item.name === 'img'" :src="item.src" width="20px" height="20px" :key="index"/>
      </template>
    </div>
  </div> -->
</template>

<script>
import MessageBubble from '@/pages/community/message/mesBubble'
import { decodeText } from '@/config/decodeText'

export default {
  name: 'TextElement',
  components: {
    MessageBubble
  },
  props: {
    payload: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    isMine: {
      type: Boolean
    }
  },
  computed: {
    contentList () {
      return decodeText(this.payload)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
