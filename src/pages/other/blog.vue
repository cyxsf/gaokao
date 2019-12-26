<template>
 <div class="hello">
    <form action="">
      姓名：<input type="text" name="username" v-model="userName"><br>
      年龄：<input type="text" name="age" v-model="age"><br>
      <button type="button" @click="addUser">提交信息</button>
    </form>
    <form action="">
      <input type="text" v-model="keywords" placeholder="输入姓名查询">
      <button type="button" @click="selectUser">查询</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'blog',
  props: {
    msg: String
  },
  data () {
    return {
      userName: '',
      age: '',
      keywords: ''
    }
  },
  methods: {
    addUser () {
      let name = this.userName
      let age = this.age
      axios.post('/api/user/addUser', {
        name, age
      }).then(res => {
        alert('信息添加成功')
      }).catch(err => {
        console.log(err)
      })
    },
    selectUser () {
      let name = this.keywords
      axios.post('api/user/selectUser', {
        name
      }).then(res => {
        let data = res.data[0]
        this.userName = data.name
        this.age = data.age
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
