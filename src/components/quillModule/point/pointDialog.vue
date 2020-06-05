<template>
  <el-dialog :visible.sync="visible" title="设置锚点" append-to-inner width="674px" @closed="hide" top="0" :modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="锚点内容：" label-width="100px" prop="inner">
        <el-input v-model="form.inner" autocomplete="off" placeholder="" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="锚点标识：" prop="value" label-width="100px">
        <el-input v-model="form.value" autocomplete="off" class="small-input" size="medium"></el-input>
      </el-form-item>
      <section style="text-align: right;">
        <el-button type="primary" @click="beforeSave" size="medium">确定</el-button>
      </section>
    </el-form>
  </el-dialog>
</template>
<script>
import { upgradeCenterMessage } from "@/common/util";
export default {
  data() {
    return {
      visible: false,
      form: {
        inner: '',
        value: '',
      },
      rules: {
        inner: [
            { required: true, message: '请输入锚点内容', trigger: 'blur' },
          ],
          value: [
            { required: true, message: '锚点标识', trigger: 'blur' },
          ],
      },
    }
  },
  methods: {
    show() {
      let toolbar = this.$parent // 工具栏组件
      let quill = this.$parent.$parent.quill
      this.form.inner = this.$parent.$parent.selectionText
      // 如果选中/聚焦的文字包含链接 需要获取链接文字的index和长度
      if(toolbar.domType=='point') {
        this.form.inner = toolbar.dom.innerText
        this.form.value = quill.getFormat().point
      }
      this.visible = true
    },
    hide() {
      // 弹窗关闭后重置所有值
      this.visible = false
      this.form.inner = ''
      this.form.value = ''
      this.$refs.form.resetFields()
    },
    beforeSave() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.save()
        }
      });
    },
    save() {
      let parent = this.$parent.$parent
      let quill = parent.quill // quill组件
      let toolbar = this.$parent
      let range = {
          index: parent.range.index,
          length: parent.range.length
        }  // 当前选择的内容
      let insertLength = this.form.inner.length // 插入链接的文本部分的长度

      // 如果是修改链接 要先删除原本的链接 这个链接就是show方法中while循环出来的
      if(toolbar.domType=='point') {
        range.index = toolbar.domIndex
        range.length = toolbar.dom.innerText.length
      }
      if(toolbar.dom) {
        quill.removeFormat(toolbar.domIndex, toolbar.dom.innerText.length)
      }

      // 如果选中文字/修改链接的话 先把这段文字删除 再插入更新后a标签内的文本
      if(range.length > 0){
        quill.deleteText(range.index, range.length)
      }
      // 插入point格式的文本
      quill.insertText(range.index, this.form.inner, 'point', this.form.value, "user")
      quill.setSelection(range.index + insertLength, 0,  "api")
      this.$emit('save')
      // this.$emit('save',{
      //   name: 'point',
      //   range,
      //   insertLength,
      // })
      this.hide()
      this.$parent.pointWrapShow = false
      // this.$parent.pointWrapShow = false
      // quill.setSelection(range.index + insertLength, 0,  "api")
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