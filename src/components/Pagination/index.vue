<template>
  <div class="Pagination">
    <button
      :disabled="myCurrentPage <= 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <button :class="{ active: myCurrentPage === 1 }" @click="setCurrentPage(1)">
      1
    </button>
    <button v-show="startEnd.start > 2">...</button>
    <button
      v-for="item in mapBtnsCount"
      :key="item"
      @click="setCurrentPage(startEnd.start + item - 1)"
      :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
    >
      {{ startEnd.start + item - 1 }}
    </button>
    <button v-show="startEnd.end < totalPages - 1">...</button>
    <button
      :class="{ active: myCurrentPage === totalPages }"
      v-show="totalPages > 1"
      @click="setCurrentPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="myCurrentPage >= totalPages"
      @click="setCurrentPage(myCurrentPage + 1)"
    >
      下一页
    </button>
    <button>总共{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    //单前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    //显示按钮的数量
    pagerCount: {
      validator(val) {
        return val > 5 && val < 21 && val % 2 === 1;
      },
      default: 7,
    },
    //每页数量
    pageSize: {
      type: Number,
      default: 10,
    },
    //总数
    total: {
      type: Number,
      requierd: 0,
    },
  },
  data() {
    return {
      myCurrentPage: this.currentPage,
    };
  },
  watch: {
    myCurrentPage(currentPage) {
      this.$emit("current-change", currentPage);
    },
    currentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
  computed: {
    //总页数
    totalPages() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算中间安按钮的开始和结束的按钮值
    startEnd() {
      const { myCurrentPage, pagerCount, totalPages } = this;
      //不计算开始和结束的值
      const count = pagerCount - 2;
      //中间的一半，向下取整
      const halfCount = Math.floor(count / 2);
      let start, end;

      if (myCurrentPage >= totalPages - halfCount) {
        start = totalPages - count;
      } else {
        start = myCurrentPage - halfCount;
      }

      if (start <= 1) {
        start = 2;
      }

      end = start + count - 1;

      if (end >= totalPages) {
        end = totalPages - 1;
      }

      return {
        start,
        end,
      };
    },

    //需要遍历的按钮数量
    mapBtnsCount() {
      const { start, end } = this.startEnd;
      const count = end - start + 1;
      return count >= 1 ? count : 0;
    },
  },
  methods: {
    setCurrentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
};
</script>

<style lang="less" scoped>
.Pagination {
  display: flex;
  font-weight: 700;
  white-space: nowrap;

  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }

  button.active {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
