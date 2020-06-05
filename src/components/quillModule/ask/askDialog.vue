<template>
  <el-dialog :visible.sync="visible" title="标准问调用" append-to-inner width="674px" @closed="hide">
    <el-form :model="form">
      <el-form-item label="引导话术：" required label-width="100px">
        <el-input v-model="form.inner" autocomplete="off" placeholder="" size="small"></el-input>
      </el-form-item>
      <el-form-item label="标准问题：" required label-width="100px">
        <el-input v-model="form.value" autocomplete="off" class="small-input" size="small"></el-input>
      </el-form-item>
      <section style="text-align: right;">
        <el-button type="primary" @click="save" size="small">确定</el-button>
      </section>
      
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
        value: '',
      },
      askRange: {
        index: 0,
        length: 0,
      },
    }
  },
  methods: {
    show() {
      let parent = this.$parent.$parent // 父组件
      let quill = parent.quill // quill组件
      this.form.inner = parent.selectionText

      // 返回所选/聚焦文字的内容——包含格式数据的Delta数据。
      let current = quill.getFormat()
      // 如果选中/聚焦的文字包含标准问 就获取标准问文字的index和长度
      if(current.ask) {
        this.form.value = current.ask.value
        this.form.inner = current.ask.inner
        let innerLen = current.ask.inner.length
        let curIndex = parent.range.index
        let curContent = quill.getContents(curIndex,innerLen).ops
        // 从当前元素向前查找 长度为当前超链接的长度 如果getContents的结果只包含一种 说明这是完整的链接内容 存住这个index和length
        while(!(curContent.length==1&&curContent[0].attributes&&curContent[0].attributes.ask)) {
          curIndex --
          curContent = quill.getContents(curIndex,innerLen).ops
        }
        this.askRange.index = curIndex
        this.askRange.length = innerLen
        console.log(this.askRange.index,this.askRange.length)
      }
      this.visible = true
    },
    hide() {
      // 弹窗关闭后重置所有值
      this.visible = false
      this.form.inner = ''
      this.form.value = ''
      this.askRange.index = 0
      this.askRange.length = 0
    },
    save() {
      let data = {
        inner: this.form.inner,
        value: this.form.value,
      }
      let parent = this.$parent.$parent
      let quill = parent.quill // quill组件
      let range = {
          index: parent.range.index,
          length: parent.range.length
        }  // 当前选择的内容
      let insertLength = data.inner.length // 插入链接的文本部分的长度
      // 获取当前内容是否只包含超链接
      let curContent = quill.getContents(parent.range.index,parent.range.length).ops
      
      // 如果是修改链接 要先删除原本的链接 这个链接就是show方法中while循环出来的
      if(this.askRange.length > 0) {
        range.index = this.askRange.index
        range.length = this.askRange.length
      }
      if(curContent.length > 1) {
        range.index = parent.range.index
        range.length = parent.range.length
      } 
      // 如果选中文字/修改标准问的话 先把这段文字删除 再插入更新后a标签内的文本
      if(range.length > 0){
        quill.deleteText(range.index,range.length)
      }
      console.log('range是',range)
      // 插入ask格式的文本
      // quill.insertText(range.index, data.inner, "ask",data.value,"user")
      // 插入文本
      quill.insertText(range.index, data.inner,"user")
      // 移除可能混淆的格式（因为自己创建的标签似乎跳不出格式）
      quill.removeFormat(range.index, insertLength, "api")
      // 把插入的文本选中
      quill.setSelection(range.index,insertLength,  "api")
      // 将这段文本设置为ask格式 传入value
      quill.format('ask', data.value, 'user');
      // 如果没选中文字 把光标放到插入标准问后的位置
      // if(range.length == 0) {
      //   console.log('设置光标')
      //   quill.setSelection(range.index + insertLength, 0,  "api")
      // }
      quill.setSelection(range.index + insertLength, 0,  "api")
      this.$emit('save',data)
      this.hide()
      this.$parent.askWrapShow = false
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