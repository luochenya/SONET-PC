<template>
  <div class="paginations">
    <div class="containers">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :current-page="currentpage"
        layout="prev, pager, next"
        :hide-on-single-page="isHidePage"
        :total="total"
        :prev-text="prevText"
        :next-text="nextText"
        :pager-count="5"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    total: Number,
    pagesize: Number,
    currentpage: Number,
    handleCurrentChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      prevText: "上頁",
      nextText: "下頁",
      isHidePage: true
    };
  }
};
</script>

<style lang="scss">
.paginations {
  width: 100%;
  padding-top: 20px;
  padding-right: 30px;
  .containers {
    display: flex;
    justify-content: flex-end;
    // 數字選中狀態
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      color: #FFFFFF;
      background: #1DB3CE;
      border-radius: 2px;
    }
    .el-pagination .el-pager li {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
      line-height: 30px;
    }
    .el-pagination.is-background .el-pager li {
      margin: 0;
      width: 30px !important;
      height: 30px !important;
      background: transparent;
      border-radius: 2px;
    }

    // 省略號
    .el-pager .more::before {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }
    // 左箭頭
    .el-pagination.is-background .btn-prev {
      margin-right: 13px;
      width: 56px;
      height: 30px;
      background: #F6F7F8;
      border-radius: 2px;
      font-size: 16px;
      font-weight: 400;
      color: #9BA1A9;
      line-height: 22px;
      // .el-icon-arrow-left:before {
      //   content: "";
      // }
    }
    // 右箭頭
    .el-pagination.is-background .btn-next {
      margin-left: 13px;
      width: 56px;
      height: 30px;
      background: #1DB3CE;
      border-radius: 2px;
      font-size: 16px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 22px;
    }
    .el-pagination button,
    .el-pagination span:not([class*="suffix"]) {
      min-width: 0;
    }
  }
}
</style>
