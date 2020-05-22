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

let Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "14px", "16px", "18px"];
Quill.register(Size, true);
Quill.register(Link, true);
Quill.register(Ask, true);
Quill.register(Point, true);
Quill.register(Video, true);
Quill.register("modules/counter", Counter);
console.log(config)
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
            maxLength: 4000,
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
      contentLength: 0 // 内容长度
    };
  },
  mounted() {
    // 初始化编辑器
    this._initEditor();
    window.quill = this.quill;
    
  },
  methods: {
    _initEditor() {
      this.options.modules.counter = this.customOptions.counter
      this.options.modules.table = this.customOptions.table
      this.options.placeholder = this.customOptions.placeholder
      // 初始化编辑器 传入dom和option
      this.quill = new Quill(this.$refs.editor, this.options);
      // 设置编辑器的内容 编辑器的内容需要接收delta对象
      let delta = this.quill.clipboard.convert({
        html: this.value
      });
      this.quill.setContents(delta);
      this.setContentLength();

      // 监听变化并把quill变化的内容绑定到content上
      this.quill.on("text-change", () => {
        console.log("内容改变", this.quill.root.innerHTML);
        let quill = this.quill;
        let html = quill.root.innerHTML;
        if (html === "<p><br></p>") {
          html = "";
          quill.setText(html);
        }
        this.content = html;
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
            console.log("User cursor is on", range.index);
          } else {
            var text = this.quill.getText(range.index, range.length);
            this.selectionText = text;
            console.log("User has highlighted", text);
          }
          // this.setSpace();
          this.setItemMenu();
        }
      });
    },
    // 判断设置项的小菜单是否显示
    setItemMenu() {
      let curFormat = this.quill.getFormat();
      this.$refs.toolbar.setItem(curFormat);
    },
    // 需要插入空格或移动光标的内容
    setSpace() {
      let curFormat = this.quill.getFormat();
      let list = ["ask", "point"];
      let flag = Object.keys(curFormat).find(i => list.indexOf(i) > -1);

      if (this.range.length == 0 && flag) {
        let inner = curFormat[flag].inner;
        let content = this.quill.getContents(
          this.range.index - inner.length,
          inner.length
        ).ops;
        if (content.length == 1) {
          this.insertEndSpace();
        }
      }
    },
    // 光标后插入空格
    insertEndSpace() {
      let after = this.quill.getText(this.range.index, 1);
      if (after === " ") {
        this.quill.setSelection(this.range.index + 1, 0);
      } else {
        this.quill.insertText(this.range.index, " ", "user");
        this.quill.removeFormat(this.range.index, 1);
        this.quill.setSelection(this.range.index + 1, 0);
      }
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
  border-top: 0;
  .ql-editor {
    padding: 10px;
  }
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
  point {
    position: relative;
    opacity: 0.6;
    &::before {
      content: "";
      display: block;
      width: 10px;
      height: 10px;
      position: absolute;
      left: -5px;
      top: -5px;
      background: url(../assets/icons/point.png) no-repeat;
      background-size: 10px 10px;
    }
  }
}
</style>