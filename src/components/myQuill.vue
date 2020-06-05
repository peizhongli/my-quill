<template>
  <div class="my-quill">
    <toolbar ref="toolbar" />
    <div ref="editor"></div>

    <p id="counter"></p>
  </div>
</template>

<script>
// 引入Quill@2.0.0核心组件
import Quill from "quill";
// 引入样式
import "quill/dist/quill.snow.css";
import config from "./config";
import Link from "./quillModule/link/";
import Ask from "./quillModule/ask/";
import Point from "./quillModule/point/";
import Video from "./quillModule/video/iframe.js";
import toolbar from "./config/toolbar.vue";
import Counter from "./quillModule/counter/";
import Table from "./quillModule/table/";

let Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "14px", "16px", "18px"];
Quill.register(Size, true);
Quill.register(Link, true);
Quill.register(Ask, true);
Quill.register(Point, true);
Quill.register(Video, true);
Quill.register("modules/counter", Counter);
Quill.register("modules/table", Table);
export default {
  name: "editor",
  components: {
    toolbar
  },
  // 双向绑定
  props: {
    value: {
      type: String,
      default: ""
    },
    customOptions: {
      type: Object,
      default: () => {
        return {
          placeholder: "请输入内容...", // 占位符
          counter: {
            show: true,
            maxLength: 4000
          }, // 最大长度
          // 工具栏按钮
          bold: true, // 加粗
          italic: true, // 斜体
          underline: true, // 下划线
          strike: true, // 删除线
          ol: true, // 有序列表
          ul: true, // 无序列表
          super: true, // 上标
          sub: true, // 下标
          link: true, // 插入超链接
          ask: true, // 插入标准问
          color: true, // 字体颜色
          background: true, // 背景颜色
          image: true, // 上传图片
          video: true, // 上传视频
          source: true, // 源码
          table: true, // 插入表格
          point: true // 插入锚点
        };
      }
    }
  },
  data() {
    return {
      // 初始化编辑器后绑定到quill参数上
      quill: null,
      content: "",
      options: config,
      range: null,
      selectionText: "", // 当前选中文字 range对象 包括index聚焦位置以及length选中长度
      contentLength: 0, // 内容长度
      curFormatRange: {}
    };
  },
  mounted() {
    // 初始化编辑器
    this._initEditor();
    window.quill = this.quill;
  },
  methods: {
    _initEditor() {
      this.options.modules.counter = this.customOptions.counter;
      this.options.modules.table = this.customOptions.table;
      this.options.placeholder = this.customOptions.placeholder;
      // 初始化编辑器 传入dom和option
      this.quill = new Quill(this.$refs.editor, this.options);
      // 设置编辑器的内容 编辑器的内容需要接收delta对象
      let delta = this.quill.clipboard.convert({
        html: this.value
      });
      this.quill.setContents(delta);
      this.setContentLength();

      // 监听变化并把quill变化的内容绑定到content上
      this.quill.on("text-change", (delta, oldDelta, source) => {
        // delta.forEach(i=>{
        //   if(i.insert && i.insert.image) {
        //     let img = i.insert.image
        //     if(img.url.match(/(https|http):\/\//)) {
              
        //     }
        //   }
        // })
        let quill = this.quill;
        let html = quill.root.innerHTML;
        if (html === "<p><br></p>") {
          html = "";
          quill.setText(html);
        }
        this.content = html;
        if(source=='user') {
          this.$emit("input", html);
          this.$emit("change", {
            html,
            quill
          });
          this.$nextTick(() => {
            this.range = quill.selection.lastRange;
            // 判断是否触发表格
            this.setItemMenu();
            this.setContentLength();
          });
        }
      });
      // 监听聚焦事件
      this.quill.on("selection-change", range => {
        if (!range) {
          this.$emit("blur", this.quill);
        } else {
          this.$emit("focus", this.quill, range);
          // 聚焦部分
          this.range = range;
          // 选中文字
          this.selectionText = "";
          if (range.length == 0) {
          } else {
            var text = this.quill.getText(range.index, range.length);
            this.selectionText = text;
          }
          this.setItemMenu();
        }
      });
      // this.onPasteImage()
    },
    getFocusFormat() {
      let curFormat = this.quill.getFormat();
      if(curFormat.table) {
        return 'table'
      }
      let link = quill.scroll.descendant(Link,this.range.index)
      console.log(link)
      if(link[0]!=null&&(link[1]>0||(link[1]==0&&this.range.length>0))&&curFormat.link) {
        link[2] = 'link'
        return link
      }
      let point = quill.scroll.descendant(Point,this.range.index)
      if(point[0]!=null&&(point[1]>0||(point[1]==0&&this.range.length>0))&&curFormat.point) {
        point[2] = 'point'
        return point
      }
    },
    // 判断设置项的小菜单是否显示
    setItemMenu() {
      let flag = this.getFocusFormat()
      this.$refs.toolbar.setItem(flag);
    },
    // 设置最大长度
    setContentLength() {
      this.contentLength = this.quill.getText().length - 1;
      if (this.contentLength > 3000) {
        this.quill.deleteText(3000, 4);
      }
    },
    // 纯文本粘贴
    setTextClipboard() {
      this.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        delta.ops = delta.ops.map(op => {
          return {
            insert: op.insert
          };
        });
        return delta;
      });
    },
    getHTML() {
      let html = this.quill.container.children[0].innerHTML
      console.log(html)
      return html
    },
    // 图片粘贴
    onPasteImage() {
      this.quill.root.addEventListener("paste", evt => {
        if (!(evt.clipboardData && evt.clipboardData.items)) {
          return;
        }
        // 剪贴板有图片（但是不适用于从word粘贴图片)
        if (
          evt.clipboardData &&
          evt.clipboardData.files &&
          evt.clipboardData.files.length
        ) {
          evt.preventDefault();
          [].forEach.call(evt.clipboardData.files, file => {
            if (!file.type.match(/^image\/(gif|jpe?g|a?png|bmp)/i)) {
              return;
            }
            this.$refs.toolbar.$refs.image.upload(file)
          });
        }
      });
    }
  },
  watch: {
    //  监听父组件传递的value值，变化后更新quill内容
    value(newVal) {
      if (this.quill) {
        if (newVal && newVal !== this.content) {
          this.content = newVal;
          this.quill.clipboard.dangerouslyPasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    }
  }
};
</script>


<style lang="less" scoped>
/deep/ .ql-container {
  border-color: #dcdfe6;
  .ql-editor {
    padding: 10px;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #cacaca;
    }
  }
  border-top: 0;
  table {
    width: auto;
    td {
      min-width: 100px;
    }
  }
  ask {
    color: #70ad47;
    text-decoration: underline;
  }
  .point {
    margin-right: 18px;
    box-sizing: border-box;
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      position: absolute;
      right: -18px;
      top: -1px;
      margin: auto;
      background: url(../../assets/img/icons/point_active.png) no-repeat;
      background-size: 100%;
    }
  }
}
</style>