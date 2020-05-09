<template>
  <div class="toolbar-wrap">
    <div id="toolbar" slot="toolbar">
      <button class="ql-bold" title="加粗"></button>
      <button class="ql-italic" title="斜体"></button>
      <button class="ql-underline" title="下划线"></button>
      <button class="ql-strike" title="删除线"></button>
      <!-- <select class="ql-size" title="字体大小">
          <option value="12px">12px</option>
          <option selected></option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
      </select> -->
      <button class="ql-list" value="ordered" title="有序列表"></button>
      <button class="ql-list" value="bullet" title="无序列表"></button>
      <button class="ql-script" value="super" title="上标"></button>
      <button class="ql-script" value="sub" title="下标"></button>
      <button class="ql-link" title="超链接" @click="showLink"></button>
      <select class="ql-color" value="color" title="字体颜色"></select>
      <select class="ql-background" value="color" title="背景颜色"></select>
      <button class="ql-image" title="图片" @click="insertImage"></button>  <!-- 插入图片 -->
      <button class="ql-video" title="视频" @click="insertVideo"></button>  <!-- 插入视频 -->
      <button class="ql-source" title="源码模式" @click="showSource">源码模式</button>  <!-- 插入视频 -->
      <button class="ql-table" title="插入表格"></button>
    </div>
    <modal ref="modal" @hide="hideSource"/>
    <video-dialog ref="videoDialog" />
    <link-dialog ref="linkDialog" />
    <table-wrap ref="table" :visibile="tableWrapShow" />
    <link-wrap ref="link" :visibile="linkWrapShow" />
  </div>
</template>
<script>
// import Quill from 'quill'
import modal from './../quillModule/modal/modal'
import tableWrap from './../quillModule/table/tableWrap'
import linkDialog from './../quillModule/link/linkDialog'
import videoDialog from './../quillModule/video/videoDialog'
import linkWrap from './../quillModule/link/linkWrap'
export default {
  components: {modal,tableWrap,linkDialog,linkWrap,videoDialog},
  data() {
    return {
      tableWrapShow: false,
      linkWrapShow: false,
    }
  },
  methods: {
    // 插入图片
    insertImage() {
      
    },
    // 插入视频
    insertVideo() {
      this.$refs.videoDialog.show()
    },
    // 显示超链接对话框
    showLink() {
      this.$refs.linkDialog.show()
    },
    // 获取是否需要显示工具条
    setItem(curFormat) {
      console.log('聚焦元素',curFormat)
      let itemArr = ['table','link']
      itemArr.forEach( name =>{
        if(curFormat[name]) {
          this.showWrap(name)
        } else {
          this.hideWrap(name)
        }
      })
    },
    // 显示对应模块的工具栏
    showWrap(wrapName) {
      let that = this
      that[`${wrapName}WrapShow`] = true
      let position = this.$parent.quill.getBounds(this.$parent.focusText.index)
      this.$refs[`${wrapName}`].$el.style.left = position.left + 'px'
      this.$refs[`${wrapName}`].$el.style.top = position.top + 'px'

    },
    // 隐藏对应模块的工具栏
    hideWrap(wrapName) {
      let that = this
      that[`${wrapName}WrapShow`] = false
    },
    // 显示源码
    showSource() {
      this.$refs.modal.showModal()
      
    },
    // 关闭源码模式
    hideSource() {
      let quill = this.$parent.quill.container.firstChild
      quill.innerHTML = quill.innerText.trim();
    },
    // 初始化工具栏所有按钮
    initBtnGroup() {
      let quill = document.querySelector('.my-quill')
      // 清空所有按钮的默认样式 svg
      let btnGroup = quill.querySelectorAll('#toolbar>button')
      btnGroup.forEach(i=>{
        i.innerHTML = '';
      })
      
      // 字体颜色和背景颜色按钮需要特殊处理
      let colorBtn = quill.querySelector('#toolbar .ql-color .ql-picker-label')
      let bgBtn = quill.querySelector('#toolbar .ql-background .ql-picker-label')
      colorBtn.innerHTML = `<span class="color-bar"></span>`
      bgBtn.innerHTML = ''

      // 监听点击事件 
      quill.addEventListener("click", ()=>{
        // 如果字体颜色按钮被设置了value 就显示对应颜色的颜色条
        if(colorBtn.dataset.value) {
          colorBtn.querySelector('.color-bar').style.background = colorBtn.dataset.value
        } else {
          colorBtn.querySelector('.color-bar').style.background = ''
        }
        // 如果背景颜色按钮被设置里value 就把按钮的背景颜色显示为对应的颜色
        if(bgBtn.dataset.value) {
          bgBtn.style.backgroundColor = bgBtn.dataset.value
        } else {
          bgBtn.style.backgroundColor = ''
        }
      })
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.initBtnGroup()
    })
    
  },
}
</script>

<style lang="less" scoped>
/deep/#toolbar {
  &>button , &>span {
    width: 14px;
    height: 14px;
    margin-right: 18px;
    background: no-repeat center;
    background-size: 14px 14px;
    .ql-picker-label {
      background: no-repeat center;
      background-size: 14px 14px;
    }
  }
  
  .ql-bold {
    background-image: url(../../assets/icons/bold.png);
    &.ql-active {
      background-image: url(../../assets/icons/bold_active.png);
    }
  }
  .ql-italic {
    background-image: url(../../assets/icons/italic.png);
    &.ql-active {
      background-image: url(../../assets/icons/italic_active.png);
    }
  }
  .ql-underline {
    background-image: url(../../assets/icons/underline.png);
    &.ql-active {
      background-image: url(../../assets/icons/underline_active.png);
    }
  }
  .ql-strike {
    background-image: url(../../assets/icons/strike.png);
    &.ql-active {
      background-image: url(../../assets/icons/strike_active.png);
    }
  }
  .ql-list[value=ordered] {
    background-image: url(../../assets/icons/ol.png);
    &.ql-active {
      background-image: url(../../assets/icons/ol_active.png);
    }
  }
  .ql-list[value=bullet] {
    background-image: url(../../assets/icons/ul.png);
    &.ql-active {
      background-image: url(../../assets/icons/ul_active.png);
    }
  }
  .ql-script[value=super] {
    background-image: url(../../assets/icons/super.png);
    &.ql-active {
      background-image: url(../../assets/icons/super_active.png);
    }
  }
  .ql-script[value=sub] {
    background-image: url(../../assets/icons/sub.png);
    &.ql-active {
      background-image: url(../../assets/icons/sub_active.png);
    }
  }
  .ql-color .ql-picker-label {
    background-image: url(../../assets/icons/color.png);
    .color-bar {
      display: block;
      width: 14px;
      height: 2px;
      margin: 12px 0 0 -5px;
      background: transparent;
    }
  }
  .ql-background .ql-picker-label {
    background-color: #4A4A51;
    background-image: url(../../assets/icons/background.png);
  }
  .ql-image {
    background-image: url(../../assets/icons/image.png);
    background-color: attr(data-value);
    &.ql-active {
      background-image: url(../../assets/icons/image_active.png);
    }
  }
  .ql-video {
    background-image: url(../../assets/icons/video.png);
    &.ql-active {
      background-image: url(../../assets/icons/video_active.png);
    }
  }
  .ql-table {
    background-image: url(../../assets/icons/table.png);
    &.ql-active {
      background-image: url(../../assets/icons/table_active.png);
    }
  }
  .ql-source {
    background-image: url(../../assets/icons/source.png);
    &.ql-active {
      background-image: url(../../assets/icons/source_active.png);
    }
  }
  .ql-link {
    background-image: url(../../assets/icons/link.png);
    &.ql-active {
      background-image: url(../../assets/icons/link_active.png);
    }
  }
  
}
.toolbar-wrap {
  position: relative;
}

</style>