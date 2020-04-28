<template>
  <div class="my-quill">
    <!-- <slot name="toolbar"></slot> -->
    <toolbar />
    <div ref="editor"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import config from './quillModule/config2.js'
import toolbar from './quillModule/toolbar.vue'

export default {
  name: 'editor',
  components: {
    toolbar,
  },
  props: {
    value: Object
  },
  data() {
    return {
      quill:null,
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
    this.quill = new Quill(this.$refs.editor, this.options);
    this.quill.setContents(this.value)
    this.$el.querySelector('.ql-table-insert-row').innerHTML = `—`
    this.$el.querySelector('.ql-table-insert-column').innerHTML = `|`
    this.$el.querySelector('.ql-table-delete-row').innerHTML = `-—`
    this.$el.querySelector('.ql-table-delete-column').innerHTML = `-|`
    this.quill.on('text-change', () => {
      this.$emit('input', this.quill.getContents())
    });
  }
}
</script>