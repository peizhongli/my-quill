<template>
    <el-dialog :visible.sync="visible" title="设置视频" append-to-inner width="674px">
    <el-form :model="form">
      <el-form-item label="链接地址/视频代码：" required label-width="160px">
        <el-input v-model="form.href" autocomplete="off" class="small-input"></el-input>
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
        href: '',
      }
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
      this.form.inner = ''
    },
    save() {
      let range = this.$parent.$parent.range
      let quill = this.$parent.$parent.quill
      // 如果选中文字的话 先把这段文字删除 再插入a标签内的文本
      if(range.length > 0){
        quill.deleteText(range.index,range.length)
      }
    //   let regVideo = /.mp4|.webm|.ogg/i
    //   console.log('是否为视频格式',regVideo.test(this.form.href))
    //   if(regVideo.test(this.form.href)) {
    //     quill.insertEmbed(range.index, 'video', this.form.href);
    //   } else {
        quill.insertEmbed(range.index, 'video', this.form.href);
    //   }
      quill.setSelection(range.index + 1,0,'user');
      this.$emit('save')
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