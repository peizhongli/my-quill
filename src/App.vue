<template>
  <div id="app">
    <myQuill v-model="content" @input="getContent($event)" @focus="getFocus($event)"/>
    <p>{{content}}</p>
    <!-- <tiny /> -->
    <!-- <quill /> -->
  </div>
</template>

<script>
// import tiny from './components/tiny.vue'
// import quill from './components/quill.vue'
import myQuill from './components/myQuill.vue'

export default {
  name: 'App',
  components: {
    // quill,
    myQuill,
    // tiny
  },
data() {    
    return {
      content: '',
    }
  },
  methods: {
    getContent(content) {
      console.log(content)
    },
    getFocus(quill) {
      console.log(quill)
      // console.log(quill.getBounds())
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="less">
.el-dialog {
  .el-dialog__header {
    padding: 18px 0;
    text-align: center;
    border-bottom: 1px solid #dddfe6;
    .el-dialog__title {
      color: #676767;
    }
  }
  .el-dialog__body {
    padding: 16px 30px;
  }
}
  
</style>
