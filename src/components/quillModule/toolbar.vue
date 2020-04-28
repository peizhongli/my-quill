<template>
  <div id="toolbar" slot="toolbar">
    <button class="ql-bold" title="加粗"></button>
    <button class="ql-italic" title="斜体"></button>
    <button class="ql-underline" title="下划线"></button>
    <button class="ql-strike" title="删除线"></button>
    <select class="ql-size" title="字体大小">
        <option value="12px">12px</option>
        <option selected></option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
    </select>
    <button class="ql-list" value="ordered" title="有序列表"></button>
    <button class="ql-list" value="bullet" title="无序列表"></button>
    <button class="ql-script" value="super" title="上标"></button>
    <button class="ql-script" value="sub" title="下标"></button>
    <select class="ql-color" value="color" title="字体颜色" @click="insertImgClick($event)"></select>
    <select class="ql-background" value="color" title="背景颜色"></select>
    <button class="ql-image" title="图片" @click="insertImgClick($event)"></button>  <!-- 插入图片 -->
    <button class="ql-video" title="视频" @click="insertImgClick($event)"></button>  <!-- 插入视频 -->
    <button class="ql-sourceEditor" title="源码模式" @click="changeToSource($event)">源码模式</button>  <!-- 插入视频 -->
    <button class="ql-table" title="插入表格"></button>
    <button class="ql-table-insert-row" title="插入行"></button>
    <button class="ql-table-insert-column" title="插入列"></button>
    <button class="ql-table-delete-row" title="删除行"></button>
    <button class="ql-table-delete-column" title="删除列"></button>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    insertImgClick(e) {
      console.log(e,this)
    },
    fileInsert() {},
    changeToSource() {
      console.log('打开源码模式')
      this.$emit('source')
    }
  },
  mounted() {
    let toolbar = document.querySelector('.my-quill #toolbar')
    toolbar.querySelector('.ql-image').innerHTML = '';
    console.log(toolbar.querySelector('.ql-image').innerHTML)

  },
}
</script>
<style lang="less" scoped>
#toolbar {
  // position: absolute;
  // width: 100%;
  // top: -42px;
  // border-bottom: 0;
  .ql-sourceEditor {
    width: 66px;
    margin: 0 5px;
    border: 1px solid #ccc;
  }
  .ql-image {
    background: url(../../assets/logo.png) no-repeat;
    background-size: contain;
  }
  .ql-image:hover {
    opacity: .7
  }
  
}
</style>