<template>
  <div class="toolbar-wrap">
    <div id="toolbar" slot="toolbar">
      <button class="ql-bold" title="加粗" v-if="$parent.customOptions.bold"></button>
      <button class="ql-italic" title="斜体" v-if="$parent.customOptions.bold"></button>
      <button class="ql-underline" title="下划线" v-if="$parent.customOptions.underline"></button>
      <button class="ql-strike" title="删除线" v-if="$parent.customOptions.strike"></button>
      <!-- <select class="ql-size" title="字体大小">
          <option value="12px">12px</option>
          <option selected></option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
      </select>-->
      <button class="ql-list" value="ordered" title="有序列表" v-if="$parent.customOptions.ol"></button>
      <button class="ql-list" value="bullet" title="无序列表" v-if="$parent.customOptions.ul"></button>
      <button class="ql-script" value="super" title="上标" v-if="$parent.customOptions.super"></button>
      <button class="ql-script" value="sub" title="下标" v-if="$parent.customOptions.sub"></button>
      <button class="ql-link" title="插入超链接" @click="showLink" v-if="$parent.customOptions.link"></button>
      <button class="ql-ask" title="插入标准问" @click="showAsk" v-if="$parent.customOptions.ask"></button>
      <select class="ql-color" value="color" title="字体颜色" v-if="$parent.customOptions.color"></select>
      <select class="ql-background" value="color" title="背景颜色" v-if="$parent.customOptions.background"></select>
      <button class="ql-image" title="插入图片" @click="insertImage" v-if="$parent.customOptions.image"></button>
      <button class="ql-video" title="插入视频" @click="insertVideo" v-if="$parent.customOptions.video"></button>
      <button class="ql-source" title="源码模式" @click="showSource" v-if="$parent.customOptions.source"></button>
      <button class="ql-table" title="插入表格" v-if="$parent.customOptions.table"></button>
      <button class="ql-point" title="插入锚点" @click="showPoint" v-if="$parent.customOptions.point"></button>
    </div>
    <modal ref="modal" @hide="hideSource" />
    <video-dialog ref="videoDialog" v-if="$parent.customOptions.video" />
    <template v-if="$parent.customOptions.link">
      <link-dialog ref="linkDialog" />
      <link-wrap ref="link" :visibile="linkWrapShow" />
    </template>
    <template v-if="$parent.customOptions.ask">
      <ask-dialog ref="askDialog"  />
      <ask-wrap ref="ask" :visibile="askWrapShow" />
    </template>
    <template v-if="$parent.customOptions.point">
      <point-dialog ref="pointDialog" @save="afterInsert($event)" />
      <point-wrap ref="point" :visibile="pointWrapShow" />
    </template>
    <table-wrap ref="table" :visibile="tableWrapShow" v-if="$parent.customOptions.table" />
    <image-wrap ref="image" />
  </div>
</template>
<script>
// import Quill from 'quill'
import modal from "./../quillModule/modal/modal";
import tableWrap from "./../quillModule/table/tableWrap";
import linkDialog from "./../quillModule/link/linkDialog";
import askDialog from "./../quillModule/ask/askDialog";
import videoDialog from "./../quillModule/video/videoDialog";
import pointDialog from "./../quillModule/point/pointDialog";
import linkWrap from "./../quillModule/link/linkWrap";
import askWrap from "./../quillModule/ask/askWrap";
import pointWrap from "./../quillModule/point/pointWrap";
import imageWrap from "./../quillModule/image/imageWrap";
export default {
  components: {
    modal,
    tableWrap,
    linkDialog,
    linkWrap,
    videoDialog,
    askWrap,
    askDialog,
    pointDialog,
    pointWrap,
    imageWrap
  },
  data() {
    return {
      tableWrapShow: false,
      linkWrapShow: false,
      askWrapShow: false,
      pointWrapShow: false,
      domIndex: null,
      dom: null,
      domType: '',
    };
  },
  methods: {
    // 插入图片
    insertImage() {
      this.$refs.image.addFile()
    },
    // 插入视频
    insertVideo() {
      this.$refs.videoDialog.show();
    },
    // 显示超链接对话框
    showLink() {
      this.$refs.linkDialog.show();
    },
    showAsk() {
      this.$refs.askDialog.show();
    },
    showPoint() {
      this.$refs.pointDialog.show();
    },
    // 获取是否需要显示工具条
    setItem(flag) {
      let itemArr = ["table", "link", "ask", "point"];
      itemArr.forEach(name => {
        this.hideWrap(name);
      });
      if(flag) {
        if(flag=='table') {
          this.showWrap('table')
        } else if(Array.isArray(flag)) {
          this.dom = flag[0].domNode
          let curIndex = this.$parent.range.index
          this.domIndex = curIndex - flag[1]
          this.domType = flag[2]
          this.showWrap(flag[2])
        }
      } else {
        this.range = null
        this.dom = null
        this.domType = ''
      }
      
    },
    // 显示对应模块的工具栏
    showWrap(wrapName) {
      let that = this;
      that[`${wrapName}WrapShow`] = false;
      
      this.$nextTick(()=>{
        that[`${wrapName}WrapShow`] = true;
        let quill = this.$parent.quill;
        let position = quill.getBounds(this.$parent.range.index);
        let el = this.$refs[`${wrapName}`].$el;
        let editorWidth = quill.root.clientWidth;
        this.$nextTick(() => {
          if (position.left + el.clientWidth > editorWidth) {
            el.style.right = "20px";
            el.style.left = 'auto'
          } else {
            el.style.left = position.left + "px";
          }
          el.style.top = position.top + 55 + "px";
        });
      })
      
    },
    afterInsert(data) {
      // let index = data.range.index + data.insertLength
      // this.$nextTick(()=>{
      //   this.$parent.quill.setSelection(index, 0,  "api")
      // })
    },
    // 隐藏对应模块的工具栏
    hideWrap(wrapName) {
      let that = this;
      that[`${wrapName}WrapShow`] = false;
    },
    // 显示源码
    showSource() {
      this.$refs.modal.showModal();
    },
    // 关闭源码模式
    hideSource() {
      let quill = this.$parent.quill.container.firstChild;
      quill.innerHTML = quill.innerText.trim();
    },
    // 初始化工具栏所有按钮
    initBtnGroup() {
      let quill = document.querySelector(".my-quill");
      // 清空所有按钮的默认样式 svg
      let btnGroup = quill.querySelectorAll("#toolbar>button");
      btnGroup.forEach(i => {
        i.innerHTML = "";
      });

      // 字体颜色和背景颜色按钮需要特殊处理
      let colorBtn = quill.querySelector("#toolbar .ql-color .ql-picker-label");
      let bgBtn = quill.querySelector(
        "#toolbar .ql-background .ql-picker-label"
      );
      if(colorBtn) {  
        colorBtn.innerHTML = `<span class="color-bar"></span>`;
      }
      if(bgBtn) {
        bgBtn.innerHTML = "";
      }

      // 监听点击事件
      quill.addEventListener("click", () => {
        if(colorBtn) {
          // 如果字体颜色按钮被设置了value 就显示对应颜色的颜色条
          if (colorBtn.dataset.value) {
            colorBtn.querySelector(".color-bar").style.background =
              colorBtn.dataset.value;
          } else {
            colorBtn.querySelector(".color-bar").style.background = "";
          }
        }
        if(bgBtn) {
          // 如果背景颜色按钮被设置里value 就把按钮的背景颜色显示为对应的颜色
          if (bgBtn.dataset.value) {
            bgBtn.style.backgroundColor = bgBtn.dataset.value;
          } else {
            bgBtn.style.backgroundColor = "";
          }
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initBtnGroup();
    });
  }
};
</script>

<style lang="less" scoped>
/deep/#toolbar {
  height: 32px;
  line-height: 1;
  border-color: #dcdfe6;
  & > button,
  & > span {
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
  .ql-picker-options {
    margin-top: 1px;
  }
  .ql-bold {
    background-image: url(../../../assets/img/icons/bold.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/bold_active.png);
    }
  }
  .ql-italic {
    background-image: url(../../../assets/img/icons/italic.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/italic_active.png);
    }
  }
  .ql-underline {
    background-image: url(../../../assets/img/icons/underline.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/underline_active.png);
    }
  }
  .ql-strike {
    background-image: url(../../../assets/img/icons/strike.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/strike_active.png);
    }
  }
  .ql-list[value="ordered"] {
    background-image: url(../../../assets/img/icons/ol.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/ol_active.png);
    }
  }
  .ql-list[value="bullet"] {
    background-image: url(../../../assets/img/icons/ul.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/ul_active.png);
    }
  }
  .ql-script[value="super"] {
    background-image: url(../../../assets/img/icons/super.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/super_active.png);
    }
  }
  .ql-script[value="sub"] {
    background-image: url(../../../assets/img/icons/sub.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/sub_active.png);
    }
  }
  .ql-color .ql-picker-label {
    background-image: url(../../../assets/img/icons/color.png);
    .color-bar {
      display: block;
      width: 14px;
      height: 2px;
      margin: 12px 0 0 -5px;
      background: transparent;
    }
  }
  .ql-background .ql-picker-label {
    background-color: #4a4a51;
    background-image: url(../../../assets/img/icons/background.png);
  }
  .ql-image {
    background-image: url(../../../assets/img/icons/image.png);
    background-color: attr(data-value);
    &.ql-active {
      background-image: url(../../../assets/img/icons/image_active.png);
    }
  }
  .ql-video {
    background-image: url(../../../assets/img/icons/video.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/video_active.png);
    }
  }
  .ql-table {
    background-image: url(../../../assets/img/icons/table.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/table_active.png);
    }
  }
  .ql-source {
    background-image: url(../../../assets/img/icons/source.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/source_active.png);
    }
  }
  .ql-link {
    background-image: url(../../../assets/img/icons/link.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/link_active.png);
    }
  }
  .ql-point {
    background-image: url(../../../assets/img/icons/point.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/point_active.png);
    }
  }
  .ql-ask {
    background-image: url(../../../assets/img/icons/ask.png);
    &.ql-active {
      background-image: url(../../../assets/img/icons/ask_active.png);
    }
  }
}
.toolbar-wrap {
  position: relative;
}
/deep/.el-dialog {
  .el-dialog__header {
    line-height: 24px;
    padding: 18px 0;
    text-align: center;
    border-bottom: 1px solid #dddfe6;
    .el-dialog__title {
      color: #676767;
    }
  }
  .el-dialog__body {
    padding: 16px 30px;
    .el-form-item {
      margin-bottom: 18px;
    }
    .el-form-item__content {
      line-height: 1;
    }
    .el-form-item__label {
      line-height: 32px;
    }
  }
}
/deep/.el-dialog {
  top: 50%;
  transform: translateY(-50%);
  .el-button {
    padding: 10px 13px;
  }
}
</style>