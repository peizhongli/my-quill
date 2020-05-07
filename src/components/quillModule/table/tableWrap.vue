<template>
    <div class="table-wrap" v-show="visibile">
      <button class="insert-row-up" title="上插入行" @click="insertRowUp">
        上插入行
      </button>
      <button class="insert-row-down" title="下插入行" @click="insertRowDown">
        下插入行
      </button>
      <button class="insert-column-left" title="左插入列" @click="insertColumnLeft">
        左插入列
      </button>
      <button class="insert-column-right" title="右插入列" @click="insertColumnRight">
          右插入列
      </button>
      <button class="delete-row" title="删除列" @click="deleteRow">
        删除行
      </button>
      <button class="delete-column" title="删除列" @click="deleteColumn">
        删除列
      </button>
      <button class="delete" title="删除表格" @click="deleteTable">
        删除表格
      </button>
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
        return {}
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
        
    }
}
</script>
<style lang="less" scoped>
    .table-wrap {
        position: absolute;
        z-index: 99;
    }
    button {

    }
</style>