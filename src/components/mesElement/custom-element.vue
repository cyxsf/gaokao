<template>
<message-bubble :isMine=isMine :message=message>
  <div class="custom-element-wrapper">
    <div class="survey"  v-if="this.payload.data === 'survey'">
      <div class="title">对该用户的评分和建议</div>
      <el-rate
          v-model="rate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
      </el-rate>
      <div class="suggestion">{{this.payload.extension}}</div>
    </div>
    <span class="text" title="您可以自行解析自定义消息" v-else>{{text}}</span>
  </div>
</message-bubble>
</template>

<script>
import MessageBubble from '@/pages/community/message/mesBubble'

export default {
  name: 'CustomElement',
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
  components: {
    MessageBubble
  },
  computed: {
    text () {
      return '[自定义信息]'
    },
    rate () {
      return parseInt(this.payload.description)
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-weight: bold;
}
.title {
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
}
.survey {
  background-color: white;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.suggestion {
  padding-top: 10px;
  font-size: 14px;
}
</style>
