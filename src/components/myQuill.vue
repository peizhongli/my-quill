<template>
  <div class="my-quill">
    <toolbar ref="toolbar" />
    <div ref="editor"></div>
  </div>
</template>

<script>
// 引入Quill@2.0.0核心组件
import Quill from 'quill'
// 引入样式
import 'quill/dist/quill.snow.css'
import config from './quillModule/config2.js'
import toolbar from './quillModule/toolbar.vue'
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
      options: {
        theme: 'snow',
        
        modules: {
          toolbar: config,
          table: true,
        },
        placeholder: '点击输入 ...'
      },
      focusIndex: 0, // 当前聚焦位置
    }
  },
  mounted() {
    // 初始化编辑器
    this._initEditor()
  },
  methods: {
    _initEditor() {
      console.log(this.value)

      // 初始化编辑器 传入dom和option
      this.quill = new Quill(this.$refs.editor, this.options);

      let delta = this.quill.clipboard.convert({
          html: this.value
      })
      // 编辑器的内容需要接收delta对象
      this.quill.setContents(delta)

      // 双向绑定
      this.quill.on('text-change', () => {
        const quill = this.quill
        let text = this.quill.getText()
        let html = this.quill.root.innerHTML
        if (html === '<p><br></p>') {
          html = ''
          this.quill.setText(html)
        }
        this.$emit('input', html)
        this.$emit('change', {html,quill,text})
        this.setTable()
        
      })
      this.quill.on('selection-change', range => {
        if (!range) {
          this.$emit('blur', this.quill)
        } else {
          this.$emit('focus', this.quill,range)
          this.focusIndex = range.index
          if (range.length == 0) {
            console.log('User cursor is on', range.index);
            this.setTable()
          } else {
            var text = this.quill.getText(range.index, range.length);
            console.log('User has highlighted', text);
          }
        }
      });
      
    },
    setTable() {
      let line = this.quill.getLine(this.focusIndex)[0]
      console.log(line.constructor.name)
      if(line.constructor.name=='TableCell') {
        console.log('show')
        this.$refs.toolbar.showTableWrap()
      } else {
        console.log('hide')
        this.$refs.toolbar.hideTableWrap()
      }
    }
  },
  watch: {
    // 监听外部值的传入，用于将值赋予编辑器
    value (val) {
      
      console.log(val)
      // 如果编辑器没有初始化，则停止赋值
      if (!this.quill) {
        return
      }

      // 获取编辑器当前内容
      let content = this.quill.root.innerHTML

      // 外部传入了新值，而且与当前编辑器的内容不一致
      if (val && val !== content) {
        // 将外部传入的HTML内容转换成编辑器识别的delta对象
        let delta = this.quill.clipboard.convert({
          html: val
        })

        // 编辑器的内容需要接收delta对象
        this.quill.setContents(delta)
      }
    }
  },
}
</script>
<style lang="less" scoped>
/deep/.ql-container {
  border-top: 0;
  table {
    width: auto;
    td {
      min-width: 100px;
    }
  }
}
</style>