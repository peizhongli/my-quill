<template>
  <el-dialog :visible.sync="visible" title="设置链接" append-to-body width="674px">
    <el-form :model="form">
      <el-form-item label="引导话术：" required label-width="100px">
        <el-input v-model="form.body" autocomplete="off" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="链接地址：" required label-width="100px">
        <el-input v-model="form.target" autocomplete="off" class="small-input"></el-input>
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
        body: '',
        target: '',
      }
    }
  },
  methods: {
    show(title) {
      this.form.body = title
      this.visible = true
    },
    hide() {
      this.visible = false
      this.form.body = ''
      this.form.target = ''
    },
    save() {
      let data = {
        body: this.form.body,
        target: this.form.target,
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