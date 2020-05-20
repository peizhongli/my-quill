<template>
  <div id="app">
    <myQuill v-model="content" @input="getContent($event)" @change="getContent($event)" @focus="getFocus($event)" />
    <p>当前内容：{{content}}</p>
    <button @click="test">test</button>
  </div>
</template>

<script>
  import myQuill from './components/myQuill.vue'
  
  export default {
    name: 'App',
    components: {
      myQuill,
    },
    data() {
      return {
        content: '<p>hello world<ask value="333">22</ask>hello <a href="http://555" target="_blank">world</a><ask value="333">222</ask><a href="http://555" target="_blank">world</a></p>',
        // content: '<img src="http://resource.robot3.xiqu.servicetest.lenovo/file/guo/1588242125244.png">'
        // content: '<p>hello world</p>'
      }
    },
    methods: {
      getContent(content) {
        console.log(content)
      },
      getFocus(quill) {
        console.log(quill)
      },
      test() {
        this.content = 'I \u2764\uFE0F emoji!'
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
