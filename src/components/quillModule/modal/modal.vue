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
            this.$emit('show')
        },
        hideModal() {
            this.modalShow = false;
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