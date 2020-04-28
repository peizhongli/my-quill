<template>
  <div class="my-quill">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @focus="onEditorFocus($event)"
      @blur="onEditorBlur($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)">
    </quill-editor>
    <toolbar ref="toolbar"/>
    <button id="insert-table">insert-table</button>
    <p>当前字数：{{contentLength}}</p>
    <p>{{content}}</p>
  </div>
</template>
<script>
import Quill from 'quill'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import toolbar from './quillModule/toolbar.vue'
import quillConfig from './quillModule/config.js'
// import MyBold from './quillModule/TextBold'
// import Divider from './quillModule/Divider'
import QuillBetterTable from 'quill-better-table'



let Size = Quill.import('attributors/style/size');
Size.whitelist = ['12px', '14px', '16px', '18px'];
Quill.register(Size, true);
// Quill.register(Divider);
Quill.register('modules/better-table', QuillBetterTable, true)
// Quill.register("formats/bold", MyBold, true)


export default {
  components: {
    quillEditor,
    toolbar
  },
  data() {
    return {
      content: '', // 富文本编辑器默认内容
      editorOption: quillConfig, // 富文本编辑器配置
      contentLength: 0,
      quill: null,
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
    // this.editor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
    //   delta.ops = delta.ops.map(op => {
    //     return {
    //       insert: op.insert
    //     }
    //   })
    //   return delta
    // })
    document.body.querySelector('#insert-table').onclick = () => {
      let tableModule = this.quill.getModule('bold')
      // tableModule.insertTable(3, 3)
      console.log(tableModule)
    }
  },
  methods: {
    // 准备富文本编辑器
    onEditorReady (quill) {
      console.log('editor ready!', quill)
      this.quill = quill
    },
    // 富文本编辑器 失去焦点事件
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
      console.log('editor blur!', quill.selection.savedRange)
    },
    // 富文本编辑器 获得焦点事件
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    // 富文本编辑器 内容改变事件
    onEditorChange ({ quill, html, text }) {
      console.log(quill.getText())
      this.contentLength = quill.getText().split(/\s+/).length
      console.log(this.contentLength)
      if(this.contentLength>10) {
        quill.deleteText(10, 4)
      }
      console.log('editor change1', quill)
      console.log('editor change2', html)
      console.log('editor change3', text)
    },
  },

}
</script>
<style lang="less" scoped>
.my-quill {
  position: relative;
  /deep/.quill-editor {
    .ql-editor {
      min-height: 83px;
    }
    
  }
}
</style>