<template>
  <div class="my-quill">
    <toolbar ref="toolbar" />
    <div ref="editor"></div>
    <p>当前字数：{{contentLength}}</p>
  </div>
</template>

<script>
// 引入Quill@2.0.0核心组件
import Quill from 'quill'
// 引入样式
import 'quill/dist/quill.snow.css'
import config from './quillModule/config2.js'
import Link from './quillModule/link.js'
import Video from './quillModule/video.js'
import toolbar from './quillModule/toolbar.vue'

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
      options: {
        theme: 'snow',
        
        modules: {
          toolbar: config,
          table: true,
          // clipboard: {
          //     matchVisual: false
          // },
        },
        placeholder: '点击输入 ...'
      },
      focusText: null,
      // focusIndex: 0, // 当前聚焦位置
      selectionText: '', // 当前选中文字
      contentLength: 0, // 内容长度
    }
  },
  mounted() {
    // 初始化编辑器
    this._initEditor()
    // this.quill = new Quill(this.$refs.editor, this.options);

    // 纯文本粘贴
    // this.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
    //   delta.ops = delta.ops.map(op => {
    //     return {
    //       insert: op.insert
    //     }
    //   })
    //   return delta
    // })
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
        // 设置最大长度
        this.contentLength = quill.getText().length
        if(this.contentLength>10) {
          quill.deleteText(10, 4)
        }
        // 判断是否触发表格
        this.setTable()
        
      })
      this.quill.on('selection-change', range => {
        if (!range) {
          this.$emit('blur', this.quill)
        } else {
          this.$emit('focus', this.quill,range)
          // 聚焦部分
          this.focusText = range
          // 选中文字
          this.selectionText = ''
          if (range.length == 0) {
            console.log('User cursor is on', range.index);
            this.setTable()
          } else {
            var text = this.quill.getText(range.index, range.length);
            this.selectionText = text
            console.log('User has highlighted', text);
          }
        }
      });
      
    },
    setTable() {
      let line = this.quill.getLine(this.focusText.index)[0]
      if(line.constructor.name=='TableCell') {
        console.log('showtablerwrap')
        this.$refs.toolbar.showTableWrap()
      } else {
        this.$refs.toolbar.hideTableWrap()
      }
    }
  },
  watch: {
    // 监听外部值的传入，用于将值赋予编辑器
    // value (val) {
      
    //   console.log(val)
    //   // 如果编辑器没有初始化，则停止赋值
    //   if (!this.quill) {
    //     return
    //   }

    //   // 获取编辑器当前内容
    //   let content = this.quill.root.innerHTML

    //   // 外部传入了新值，而且与当前编辑器的内容不一致
    //   if (val && val !== content) {
    //     // 将外部传入的HTML内容转换成编辑器识别的delta对象
    //     let delta = this.quill.clipboard.convert({
    //       html: val
    //     })

    //     // 编辑器的内容需要接收delta对象
    //     this.quill.setContents(delta)
    //   }
    // }
    // value(newVal) {
    //   let content =this.quill.root.innerHTML
    //     if (this.quill) {
    //         console.log('newVal',newVal)

    //       if (newVal && newVal !== content) {
    //         this.content = newVal
    //         this.quill.clipboard.dangerouslyPasteHTML(this.focusIndex, newVal);
    //         // this.quill.pasteHTML(newVal)
    //       } else if(!newVal) {
    //         this.quill.setText('')
    //       }
    //     }
    //   },
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