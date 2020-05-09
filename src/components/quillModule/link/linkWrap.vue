<template>
    <div class="link-wrap" v-show="visibile">
        调用超链接：{{link}}
        <button @click="$emit('modify')">修改</button>
        <button @click="$emit('clear')">清除</button>
    </div>
</template>
<script>
export default {
    props:{
        visibile: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            link: ''
        }
    }
}
</script>
<style lang="less" scoped>
    .link-wrap {
        position: absolute;
        z-index: 99;
    }
</style>