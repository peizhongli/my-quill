<template>
  <div v-loading="loading" element-loading-text="Loading" class="wrap">
    <span @click="select" class="title">
      {{show?'收起图文方案':'选择图文方案'}}
      <i :class="show ? 'el-icon-arrow-up':'el-icon-arrow-down'"></i>
    </span>
    <div v-show="show" class="box">
      <el-input v-model="title" size="medium">
        <el-button slot="append" @click="getList">搜索</el-button>
      </el-input>
      <el-table :data="tableData" style="width: 100%" @row-click="selectItem">
        <el-table-column width="17"></el-table-column>
        <el-table-column prop="title" label="标题" width="250"></el-table-column>
        <el-table-column prop="fileName" label="文件名"></el-table-column>
      </el-table>
      <el-pagination
        :current-page="current"
        @current-change="handleCurrentChange"
        :page-sizes="[pageSize]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { upgradeCenterMessage } from "@/common/util";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      current: 1,
      pageSize: 10,
      total: 0,
      show: false,
      title: "" // 搜索标题
    };
  },
  methods: {
    select() {
      this.show = !this.show;
      if (this.show) {
        this.getList();
      } else {
        this.current = 1;
        this.total = 0;
        this.title = ''
      }
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getList();
    },
    selectItem(row) {
      this.$parent.$parent.form.href = row.url;
    },
    getList() {
      this.loading = true;
      this.$handleRequest(
        {
          method: "get",
          route: `/getImageTextList/`,
          data: {
            pageNum: this.current,
            pageSize: this.pageSize,
            name: this.title
          }
        },
        data => {
          this.loading = false;
          this.tableData = data.list;
          this.total = data.list.length;
        },
        error => {
          this.loading = false;
          upgradeCenterMessage(this, "error", error.message);
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  padding-left: 18px;
  position: relative;
  .box {
    margin-top: 8px;
  }
  max-height: 180px;
  overflow: auto;
  .el-input {
    width: 328px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .el-button {
    padding: 10px 13px;
    color: #419eff;
  }
  /deep/.el-table {
    th {
      line-height: 23px;
      padding: 6px 0;
      background-color: #f7f8fa;
      color: #676767;
    }
    td {
      padding: 6px 0;
    }
    tbody {
      tr {
        cursor: pointer;
      }
    }
  }

  .el-pagination {
    text-align: right;
    margin-top: 10px;
  }
  .title {
    cursor: pointer;
  }
}
</style>