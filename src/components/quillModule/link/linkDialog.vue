<template>
  <el-dialog :visible.sync="visible" title="设置链接" append-to-inner width="674px" @closed="hide" top="0" :modal="false">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="引导话术：" prop="inner" label-width="100px">
        <el-input v-model="form.inner" autocomplete="off" placeholder size="medium"></el-input>
      </el-form-item>
      <el-form-item label="链接地址：" prop="href" label-width="100px">
        <el-input v-model="form.href" autocomplete="off" class="small-input" size="medium"></el-input>
        <el-button size="medium" @click="visit">访问</el-button>
        <el-button type="primary" @click="beforeSave" size="medium">确定</el-button>
      </el-form-item>
    </el-form>
    <image-text />
  </el-dialog>
</template>
<script>
import imageText from './imageText'
const whiteList = ['http', 'https', 'mailto', 'tel']
export default {
  components: {
    imageText
  },
  data() {
    return {
      visible: false,
      form: {
        inner: '',
        href: '',
      },
      rules: {
        inner: [
            { required: true, message: '请输入引导话术', trigger: 'blur' },
          ],
          href: [
            { validator: this.checkHref }
          ],
      },
      fromVisit: false,
    }
  },
  methods: {
    visit() {
      this.fromVisit = true;
      this.$refs.form.validateField("href", error => {
        return;
      });
      this.fromVisit = false;
      let url = this.form.href
      if(url.indexOf('#')==0) {
        return;
      }else if(!whiteList.find(i=>url.indexOf(i)==0)){
        url = `http://${url}`
      }
      window.open(url);
    },
    show() {
      let toolbar = this.$parent // 工具栏组件
      let quill = this.$parent.$parent.quill
      this.form.inner = this.$parent.$parent.selectionText
      // 如果选中/聚焦的文字包含链接 需要获取链接文字的index和长度
      if(toolbar.domType=='link') {
        this.form.inner = toolbar.dom.innerText
        this.form.href = quill.getFormat().link
      }
      this.visible = true
    },
    hide() {
      // 弹窗关闭后重置所有值
      this.visible = false
      this.form.inner = ''
      this.form.href = ''
      this.fromVisit = false
      this.$refs.form.resetFields()
    },
    checkHref (rule, value, callback) {
      if(this.fromVisit && value.trim()==='') {
        callback(new Error('请输入链接地址'));
      } else {
        callback()
      }
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
      if(toolbar.domType=='link') {
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
      // 插入link格式的文本
      quill.insertText(range.index, this.form.inner, 'link', this.form.href, "user")
      // quill.removeFormat(range.index, insertLength, "api")
      // // 把插入的文本选中
      // quill.setSelection(range.index, insertLength , "api")
      // // 将这段文本设置为link格式 传入href
      // quill.format('link', data.href, 'user');
      // // 如果没选中文字 把光标放到插入链接后的位置
      // if(range.length == 0) {
      //   console.log('设置光标')
      //   quill.setSelection(range.index + insertLength, 0,  "api")
      // }
      quill.setSelection(range.index + insertLength, 0,  "api")
      this.$emit('save')
      this.hide()
      this.$parent.linkWrapShow = false
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-dialog {
  top: 50%;
  transform: translateY(-50%);
  .el-form-item__content {
    display: flex;
    .el-button {
      margin-left: 10px;
      padding: 10px 13px;
    }
  }
}
</style>