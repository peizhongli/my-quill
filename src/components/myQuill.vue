<template>
  <div class="my-quill">
    <toolbar ref="toolbar" />
    <div ref="editor"></div>
    <p>当前字数：{{contentLength}}/3000</p>
  </div>
</template>

<script>
  // 引入Quill@2.0.0核心组件
  import Quill from 'quill'
  // 引入样式
  import 'quill/dist/quill.snow.css'
  import config from './config'
  import Link from './quillModule/link/'
  import Video from './quillModule/video'
  import toolbar from './config/toolbar.vue'
  
  let Size = Quill.import('attributors/style/size');
  Size.whitelist = ['12px', '14px', '16px', '18px'];
  Quill.register(Size, true);
  Quill.register(Link, true)
  Quill.register(Video, true)
  
  export default {
    name: 'editor',
    components: {
      toolbar,
    },
    // 双向绑定
    props: {
      value: String
    },
    data() {
      return {
        // 初始化编辑器后绑定到quill参数上
        quill: null,
        content: '',
        options: config,
        focusText: null,
        selectionText: '', // 当前选中文字 range对象 包括index聚焦位置以及length选中长度
        contentLength: 0, // 内容长度
      }
    },
    mounted() {
      // 初始化编辑器
      this._initEditor()
  
    },
    methods: {
      _initEditor() {
        // 初始化编辑器 传入dom和option
        this.quill = new Quill(this.$refs.editor, this.options);
        // 设置编辑器的内容 编辑器的内容需要接收delta对象
        let delta = this.quill.clipboard.convert({
          html: this.value
        })
        this.quill.setContents(delta)
        this.setContentLength()
  
        // 监听变化并把quill变化的内容绑定到content上
        this.quill.on('text-change', () => {
          console.log('内容改变', this.quill.root.innerHTML)
          const quill = this.quill
          let html = this.quill.root.innerHTML
          if (html === '<p><br></p>') {
            html = ''
            this.quill.setText(html)
          }
          this.content = html;
          this.$emit('input', html)
          this.$emit('change', {
            html,
            quill
          })
  
          if (this.focusText) {
            // 判断是否触发表格
            this.setItemMenu()
          }
  
        })
        // 监听聚焦事件
        this.quill.on('selection-change', range => {
          if (!range) {
            this.$emit('blur', this.quill)
          } else {
            this.$emit('focus', this.quill, range)
            // 聚焦部分
            this.focusText = range
            // 选中文字
            this.selectionText = ''
            if (range.length == 0) {
              console.log('User cursor is on', range.index);
            } else {
              var text = this.quill.getText(range.index, range.length);
              this.selectionText = text
              console.log('User has highlighted', text);
            }
            this.setItemMenu()
          }
        });
  
      },
      // 判断设置项的小菜单是否显示
      setItemMenu() {
        let curFormat = this.quill.getFormat()
        this.$refs.toolbar.setItem(curFormat)
      },
      // 设置最大长度
      setContentLength() {
        this.contentLength = this.quill.getText().length
        if (this.contentLength > 3000) {
          this.quill.deleteText(3000, 4)
        }
      },
      // 纯文本粘贴
      setTextClipboard() {
        this.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
          delta.ops = delta.ops.map(op => {
            return {
              insert: op.insert
            }
          })
          return delta
        })
      }
    },
    watch: {
      //  监听父组件传递的value值，变化后更新quill内容
      value(newVal) {
        if (this.quill) {
          if (newVal && newVal !== this.content) {
            this.content = newVal;
            this.quill.clipboard.dangerouslyPasteHTML(newVal);
          } else if (!newVal) {
            this.quill.setText('');
          }
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  /deep/ .ql-container {
    border-top: 0;
    table {
      width: auto;
      td {
        min-width: 100px;
      }
    }
  }
</style>