<template>
  <el-dialog :visible.sync="visible" title="设置链接" append-to-inner width="674px" @closed="hide">
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
      },
      linkRange: {
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
      // 如果选中/聚焦的文字包含链接 需要获取链接文字的index和长度
      if(current.link) {
        this.form.href = current.link.href
        this.form.inner = current.link.inner
        let innerLen = current.link.inner.length
        let curIndex = parent.range.index
        let curContent = quill.getContents(curIndex,innerLen).ops
        // 从当前元素向前查找 长度为当前超链接的长度 如果getContents的结果只包含一种 说明这是完整的链接内容 存住这个index和length
        while(!(curContent.length==1&&curContent[0].attributes&&curContent[0].attributes.link)) {
          curIndex --
          curContent = quill.getContents(curIndex,innerLen).ops
        }
        this.linkRange.index = curIndex
        this.linkRange.length = innerLen
        console.log(this.linkRange.index,this.linkRange.length)
      }
      this.visible = true
    },
    hide() {
      // 弹窗关闭后重置所有值
      this.visible = false
      this.form.inner = ''
      this.form.href = ''
      this.linkRange.index = 0
      this.linkRange.length = 0
    },
    save() {
      let data = {
        inner: this.form.inner,
        href: this.form.href,
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
      if(this.linkRange.length > 1) {
        range.index = this.linkRange.index
        range.length = this.linkRange.length
      } 
      if(curContent.length > 1) {
        range.index = parent.range.index
        range.length = parent.range.length
      } 
      // 如果选中文字/修改链接的话 先把这段文字删除 再插入更新后a标签内的文本
      if(range.length > 0){
        quill.deleteText(range.index,range.length)
      }
      // 插入link格式的文本
      quill.insertText(range.index, data.inner,"user")
      quill.removeFormat(range.index, insertLength, "api")
      // // 把插入的文本选中
      quill.setSelection(range.index, insertLength , "user")
      // // 将这段文本设置为link格式 传入href
      quill.format('link', data.href, 'user');
      // // 如果没选中文字 把光标放到插入链接后的位置
      // if(range.length == 0) {
      //   console.log('设置光标')
      //   quill.setSelection(range.index + insertLength, 0,  "api")
      // }
      quill.setSelection(range.index + insertLength, 0,  "api")
      this.$emit('save',data)
      this.hide()
      this.$parent.linkWrapShow = false
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