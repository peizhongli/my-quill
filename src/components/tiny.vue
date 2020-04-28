<template>
  <div>
    <editor :init="init"></editor>
  </div>
</template>
<script>
// import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
export default {
  components: {
    // quill,
    Editor
  },
  data() {
    return {
      init: {
        // language_url: '/tinymce/langs/zh_CN.js',// 语言包的路径
        language: 'zh_CN',//语言
        // skin_url: '/tinymce/skins/ui/oxide',// skin路径
        height: 300,//编辑器高度
        branding: false,//是否禁用“Powered by TinyMCE”
        menubar: false,//顶部菜单栏显示
      }
    }
  },
}
</script>