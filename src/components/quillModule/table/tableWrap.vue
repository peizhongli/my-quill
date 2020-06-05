<template>
    <div class="table-wrap" v-show="visibile">
        
      <button class="insert-row-up" title="上插入行" type='button' @click="insertRowUp">
        
      </button>
      <button class="insert-row-down" title="下插入行" type='button' @click="insertRowDown">
        
      </button>
      <button class="delete-row" title="删除行" type='button' @click="deleteRow">
        
      </button>
      <button class="insert-column-left" title="左插入列" type='button' @click="insertColumnLeft">
        
      </button>
      <button class="insert-column-right" title="右插入列" type='button' @click="insertColumnRight">
          
      </button>
      
      <button class="delete-column" title="删除列" type='button' @click="deleteColumn">
        
      </button>
      <button class="delete" title="删除表格" type='button' @click="deleteTable">
        
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
        deleteRow(){
            this.$parent.$parent.quill.getModule('table').deleteRow()
        },
        deleteColumn(){
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
        line-height: 1;
        position: absolute;
        z-index: 99;
        background-color: #f3f3f3;
        padding: 5px 0 5px 10px;
    }
    button {
        width: 16px;
        height: 16px;
        border: 0;
        margin-right: 10px;
        background: no-repeat center center;
        background-size: 14px auto;
        &.insert-row-up {
            background-image: url(../../../../assets/img/icons/insert-row-up.png);
        }
        &.insert-row-down {
            background-image: url(../../../../assets/img/icons/insert-row-down.png);
        }
        &.insert-column-left {
            background-image: url(../../../../assets/img/icons/insert-column-left.png);
        }
        &.insert-column-right {
            background-image: url(../../../../assets/img/icons/insert-column-right.png);
        }
        &.delete-row {
            background-image: url(../../../../assets/img/icons/delete-row.png);
        }
        &.delete-column {
            background-image: url(../../../../assets/img/icons/delete-column.png);
        }
        &.delete {
            background-image: url(../../../../assets/img/icons/delete.png);
        }
    }
</style>