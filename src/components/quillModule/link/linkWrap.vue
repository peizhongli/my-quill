<template>
    <div class="link-wrap" v-show="visibile" v-clickOutside="hide">
        <span class="title">调用超链接：</span>
        <a :href="link" target="_blank">{{link}}</a>
        <span class="btn" @click="modify">修改</span>
        <span class="btn" @click="clear">清除</span>
    </div>
</template>

<script>
    export default {
        props: {
            visibile: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                link: ''
            }
        },
        methods: {
            modify() {
                this.$parent.showLink()
            },
            clear() {
                let quill = this.$parent.$parent.quill
                let range = this.$parent.$parent.range // 当前选择的内容
                // 如果选中文字的话 先把这段文字删除 再插入a标签内的文本
                if (range.length > 0) {
                    quill.deleteText(range.index, range.length)
                }
            },
            hide() {
                if(this.$parent.linkWrapShow) {
                    this.$parent.linkWrapShow = false
                }
            }
        },
        computed: {},
        watch: {
            visibile(value) {
                if (value) {
                    let quill = this.$parent.$parent.quill // quill组件
                    // 返回所选文字的内容——包含格式数据的Delta数据。
                    let current = quill.getFormat()
                    // 如果选中的文字包含链接
                    if (quill && current.link) {
                        this.link = current.link.href
                    } else {
                        this.link = ''
                    }
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .link-wrap {
        position: absolute;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 14px 20px;
        max-width: 573px;
        width: 80%;
        height: 45px;
        font-size: 13px;
        background-color: #f4f4f5;
        border: 1px solid #dddfe6;
        border-radius: 3px;
        z-index: 99;
        a {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #0486FE;
        }
        span {
            flex: 0 0;
            white-space: nowrap;
            &.btn{
                margin-left: 22px;
                color: #0486FE;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>