<template>
  <div class="my-quill">
    <!-- <slot name="toolbar"></slot> -->
    <toolbar />
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
    }
  },
  mounted() {
    // 初始化编辑器
    this._initEditor()
    this.quill = new Quill(this.$refs.editor, this.options);
    this.quill.setContents(this.value)
    this.$el.querySelector('.ql-table-insert-row').innerHTML = `—`
    this.$el.querySelector('.ql-table-insert-column').innerHTML = `|`
    this.$el.querySelector('.ql-table-delete-row').innerHTML = `-—`
    this.$el.querySelector('.ql-table-delete-column').innerHTML = `-|`
    this.quill.on('text-change', () => {
      this.$emit('input', this.quill.getContents())
    });
  },
  methods: {
    _initEditor() {
      // 初始化编辑器 传入dom和option
      this.quill = new Quill(this.$refs.editor, this.options);
      // 双向绑定
      this.quill.on('text-change', () => {
        const quill = this.quill
        let text = this.quill.getText()
        let html = this.quill.root.innerHTML

        this.$emit('input', {html,quill,text})
      })
      this.quill.on('selection-change', range => {
        if (!range) {
          this.$emit('blur', this.quill)
        } else {
          this.$emit('focus', this.quill)
        }
      })
    }
  },
  watch: {
    // 监听外部值的传入，用于将值赋予编辑器
    value (newVal, oldVal) {
      // 如果编辑器没有初始化，则停止赋值
      if (!this.editor) {
        return
      }

      // 获取编辑器当前内容
      let content = this.editor.root.innerHTML

      // 外部传入了新值，而且与当前编辑器的内容不一致
      if (newVal && newVal !== content) {
        // 将外部传入的HTML内容转换成编辑器识别的delta对象
        let delta = this.editor.clipboard.convert({
          html: newVal
        })

        // 编辑器的内容需要接收delta对象
        this.editor.setContents(delta)
      }
    }
  },
}
</script>