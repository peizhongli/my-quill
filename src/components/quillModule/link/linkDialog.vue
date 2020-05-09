<template>
  <el-dialog :visible.sync="visible" title="设置链接" append-to-inner width="674px">
    <el-form :model="form">
      <el-form-item label="引导话术：" required label-width="100px">
        <el-input v-model="form.inner" autocomplete="off" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="链接地址：" required label-width="100px">
        <el-input v-model="form.href" autocomplete="off" class="small-input"></el-input>
        <el-button >访问</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        inner: '',
        href: '',
      }
    }
  },
  methods: {
    show() {
      let parent = this.$parent.$parent // 父组件
      let quill = parent.quill // quill组件
      let range = parent.range  // 当前选择的内容
      // 返回所选文字的内容——包含格式数据的Delta数据。
      let ops = quill.getContents(range.index,range.length).ops
      this.form.inner = parent.selectionText
      if(ops.length==1&&ops[0].attributes&&ops[0].attributes.link) {
        this.form.href = ops[0].attributes.link
      }
      this.visible = true
    },
    hide() {
      this.visible = false
      this.form.inner = ''
      this.form.href = ''
    },
    save() {
      let data = {
        inner: this.form.inner,
        href: this.form.href,
      }
      let quill = this.$parent.$parent.quill // quill组件
      let range = this.$parent.$parent.range  // 当前选择的内容
      let insertLength = data.inner.length // 插入链接的文本部分的长度

      // 如果选中文字的话 先把这段文字删除 再插入a标签内的文本
      if(range.length > 0){
        quill.deleteText(range.index,range.length)
      }
      quill.insertText(range.index, data.inner, 'link',  "user")
      // 
      quill.setSelection(range.index,insertLength,  "api")
      quill.format('link', data.href, 'user');
      if(range.length == 0) {
        console.log('设置光标')
        quill.setSelection(range.index + insertLength, 0,  "api")
      }
      this.$emit('save',data)
      this.hide()
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.el-dialog {
    .el-form-item__content {
      display: flex;
      .el-button {
        margin-left: 10px;
      }
    }
  }
  
</style>