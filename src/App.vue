<template>
  <div id="app">
    <myQuill :value="content" v-model="delta" @input="getContent($event)"/>
    <p>{{text}}</p>
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
      content: '222',
      delta: {},
      text: ''
    }
  },
  methods: {
    getContent(content) {
      this.text = content
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
