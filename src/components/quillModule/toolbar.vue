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
      <button class="ql-link" title="超链接"></button>
      <select class="ql-color" value="color" title="字体颜色" @click="insertImgClick($event)"></select>
      <select class="ql-background" value="color" title="背景颜色"></select>
      <button class="ql-image" title="图片" @click="insertImgClick($event)"></button>  <!-- 插入图片 -->
      <button class="ql-video" title="视频" @click="insertImgClick($event)"></button>  <!-- 插入视频 -->
      <button class="ql-source" title="源码模式" @click="changeToSource($event)">源码模式</button>  <!-- 插入视频 -->
      <button class="ql-table" title="插入表格"></button>
      

      <div class="modal" v-show="modalShow" @click="hideModal">

      </div>
    </div>
    <table-wrap :visibile="tableWrapShow" ref="tableBtnGroup"/>
  </div>
</template>
<script>
import tableWrap from './tableWrap'
export default {
  components: {tableWrap},
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
    changeToSource(e) {
      console.log('打开源码模式',e)
      this.modalShow = true;
      let quill = this.$parent.quill.container.firstChild
      quill.innerText = quill.innerHTML.replace(/<br>/g,'');
    },
    showTableWrap() {
      this.tableWrapShow = true
      let position = this.$parent.quill.getBounds(this.$parent.focusIndex)
      console.log(this.$parent.quill.getBounds(this.$parent.focusIndex))
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
      let btnGroup = quill.querySelectorAll('#toolbar>button')
      btnGroup.forEach(i=>{
        i.innerHTML = '';
      })
      let colorBtn = quill.querySelector('#toolbar .ql-color .ql-picker-label')
      let bgBtn = quill.querySelector('#toolbar .ql-background .ql-picker-label')
      colorBtn.innerHTML = `<span class="color-bar"></span>`
      bgBtn.innerHTML = ''
      quill.addEventListener("click", ()=>{
        if(colorBtn.dataset.value) {
          colorBtn.querySelector('.color-bar').style.background = colorBtn.dataset.value
        }
      })
      quill.addEventListener("click", ()=> {
        if(bgBtn.dataset.value) {
          bgBtn.style.backgroundColor = bgBtn.dataset.value
        }
      })
      
      // toolbar.querySelector('.ql-image').innerHTML = '';

      // this.$el.querySelector('.ql-table-insert-row').innerHTML = `—`
      // this.$el.querySelector('.ql-table-insert-column').innerHTML = `|`
      // this.$el.querySelector('.ql-table-delete-row').innerHTML = `-—`
      // this.$el.querySelector('.ql-table-delete-column').innerHTML = `-|`
      // this.$el.querySelector('.ql-table-delete').innerHTML = `x`
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