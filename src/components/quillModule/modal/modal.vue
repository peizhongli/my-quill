<template>
    <div class="modal" v-show="modalShow" @click="hideModal">
        
    </div>
</template>
<script>
export default {
    props: {
    },
    data() {
        return {
            modalShow: false
        }
    },
    methods: {
        showModal() {
            this.modalShow = true;
            let quill = this.$parent.$parent.quill.container.firstChild
            console.log(quill.innerHTML)
            quill.innerText = quill.innerHTML.replace(/<br>/g,'');
            this.$emit('show')
        },
        hideModal() {
            this.modalShow = false;
            let quill = this.$parent.$parent.quill.container.firstChild
            quill.innerHTML = quill.innerText.trim();
            this.$emit('hide')
        },
    }
}
</script>
<style lang="less" scoped>
    .modal {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.6);
    }
</style>