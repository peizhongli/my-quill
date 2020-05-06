<template>
  <div class="toolbar-wrap">
    <div id="toolbar" slot="toolbar">
      <button class="ql-bold" title="加粗" @click="clickTest"></button>
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
      <select class="ql-color" value="color" title="字体颜色" @click="insertImgClick($event)"></select>
      <select class="ql-background" value="color" title="背景颜色"></select>
      <button class="ql-image" title="图片" @click="insertImgClick($event)"></button>  <!-- 插入图片 -->
      <button class="ql-video" title="视频" @click="insertImgClick($event)"></button>  <!-- 插入视频 -->
      <button class="ql-source" title="源码模式" @click="changeToSource($event)">源码模式</button>  <!-- 插入视频 -->
      <button class="ql-table" title="插入表格"></button>
      

      <div class="modal" v-show="modalShow" @click="hideModal">

      </div>
    </div>
    <link-dialog ref="link" @save="setLink($event)"/>
    <table-wrap :visibile="tableWrapShow" ref="tableBtnGroup"/>
  </div>
</template>
<script>
import Quill from 'quill'
import tableWrap from './tableWrap'
import linkDialog from './linkDialog'
export default {
  components: {tableWrap,linkDialog},
  data() {
    return {
      tableWrapShow: false,
      modalShow: false,
    }
  },
  methods: {
    clickTest(e) {
      console.log(e)
    },
    insertImgClick(e) {
      console.log(e,this)
    },
    fileInsert() {},
    showLink() {
      this.$refs.link.show(this.$parent.selectionText)
    },
    setLink(data) {
      console.log(data)
      if(this.$parent.selectionText!==''){
        this.$parent.quill.deleteText(this.$parent.focusText.index,this.$parent.focusText.length)
      }
      this.$parent.quill.format('link', data, Quill.sources.USER);
    },
    changeToSource() {
      this.modalShow = true;
      let quill = this.$parent.quill.container.firstChild
      quill.innerText = quill.innerHTML.replace(/<br>/g,'');
    },
    showTableWrap() {
      this.tableWrapShow = true
      let position = this.$parent.quill.getBounds(this.$parent.focusText.index)
      console.log(this.$parent.quill.getBounds(this.$parent.focusText.index))
      this.$refs.tableBtnGroup.$el.style.left = position.left + 'px'
      this.$refs.tableBtnGroup.$el.style.top = position.top + 'px'
      console.log(this.$refs.tableBtnGroup.$el.style.left)

    },
    hideTableWrap() {
      this.tableWrapShow = false
    },
    showModal() {
      this.modalShow = true;
    },
    hideModal() {
      console.log('关闭源码模式')
      this.modalShow = false;
      let quill = this.$parent.quill.container.firstChild
      quill.innerHTML = quill.innerText.trim();
    }
  },
  mounted() {
    this.$nextTick(()=>{
      console.log(this)
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
  .modal {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.6);
  }
}
.toolbar-wrap {
  position: relative;
  
}

</style>