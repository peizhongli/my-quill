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
      this.form.inner = this.$parent.$parent.selectionText
      let range = this.$parent.$parent.focusText
      let containLink = this.$parent.$parent.quill.getContents(range.index,range.length).ops.find(i=>i.attributes&&i.attributes.link)
      if(containLink) {
        this.form.inner = this.$parent.$parent.selectionText
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
      let range = this.$parent.$parent.focusText
      let len = data.inner.length
      // 如果选中文字的话 先把这段文字删除 再插入a标签内的文本
      if(range.length > 0){
        this.$parent.$parent.quill.deleteText(range.index,range.length)
      }
      this.$parent.$parent.quill.insertText(range.index, data.inner, 'link',  "user")
      // 
      this.$parent.$parent.quill.setSelection(range.index,len,  "api")
      this.$parent.$parent.quill.format('link', data.href, 'user');
      if(range.length == 0) {
        console.log('设置光标')
        this.$parent.$parent.quill.setSelection(range.index + len, 0,  "api")
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