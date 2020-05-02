<template>
    <div class="table-wrap" v-show="visibile">
      <button class="ql-table-delete" title="删除表格" @click="deleteTable">删除表格</button>
      <button class="ql-table-insert-row" title="上插入行" @click="insertRowUp" ref="btn">
          上插入行
      </button>
      <button class="ql-table-insert-row" title="下插入行" @click="insertRowDown">下插入行</button>
      <button class="ql-table-delete-row" title="删除行" @click="deleteColumn">删除行</button>
      <button class="ql-table-insert-column" title="左插入列" @click="insertColumnLeft">
          左插入列
      </button>
      <button class="ql-table-insert-column" title="右插入列" @click="insertColumnRight">右插入列</button>
      <button class="ql-table-delete-column" title="删除列" @click="deleteRow">删除列</button>
    </div>
</template>
<script>
// import insertIcon from '../../assets/icons/table.svg';
// import deleteIcon from '../assets/icons/table.svg';
// import tableIcon from '../assets/icons/table.svg';
// import tableIcon from '../assets/icons/table.svg';

export default {
    props: {
        visibile: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        insertRowUp(){
            this.$parent.$parent.quill.getModule('table').insertRowAbove()
        },
        insertRowDown(){
            this.$parent.$parent.quill.getModule('table').insertRowBelow()
        },
        insertColumnLeft(){
            this.$parent.$parent.quill.getModule('table').insertColumnLeft()
        },
        insertColumnRight(){
            this.$parent.$parent.quill.getModule('table').insertColumnRight()
        },
        deleteColumn(){
            this.$parent.$parent.quill.getModule('table').deleteRow()
        },
        deleteRow(){
            this.$parent.$parent.quill.getModule('table').deleteColumn()
        },
        deleteTable(){
            this.$parent.$parent.quill.getModule('table').deleteTable()
        },
        
    },
    mounted() {
        // let tableBtn = this.$refs.btn
        // console.log(insertIcon)
        // tableBtn.innerHTML = `<img src='${insertIcon}'>`
    }
}
</script>
<style lang="less" scoped>
    .table-wrap {
        position: absolute;
        z-index: 99;
    }
</style>