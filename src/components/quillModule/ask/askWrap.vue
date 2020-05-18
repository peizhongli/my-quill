<template>
    <div class="ask-wrap" v-show="visibile" v-clickOutside="hide">
        <div>
            调用标准问：<a href="javascript:void(0);">{{ask}}</a>
        </div>
        <section class="btn-group">
            <span @click="modify">修改</span>
            <span @click="clear">清除</span>
        </section>
    
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
                ask: ''
            }
        },
        methods: {
            modify() {
                this.$parent.showAsk()
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
                if(this.$parent.askWrapShow) {
                    this.$parent.askWrapShow = false
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
                    if (quill && current.ask) {
                        this.ask = current.ask.href
                    } else {
                        this.ask = ''
                    }
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .ask-wrap {
        position: absolute;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 14px 20px;
        width: 573px;
        height: 45px;
        line-height: 18px;
        font-size: 13px;
        background-color: #f4f4f5;
        border: 1px solid #dddfe6;
        border-radius: 3px;
        z-index: 99;
        a {
            max-width: 345px;
            display: inline-block;
            vertical-align: bottom;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #0486FE;
        }
        .btn-group {
            flex-shrink: 0;
            span {
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