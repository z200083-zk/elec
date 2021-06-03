<template>
  <div class="option-page">
    <div class="option-page-top">
      <div class="subtoc" @click="submit()" style="cursor: pointer">交卷</div>
      <div class="show" @click="showDpage()" style="cursor: pointer">关闭</div>
    </div>
    <ul class="option-page-bottom">
      <li
        class="center"
        v-for="index in pageNum"
        :key="index"
        :class="{ yes: pageDate[index - 1] > 0 }"
        @click="toChangePage(index)"
        style="cursor: pointer"
      >
        {{ index }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "OptionPage",
  props: {
    pageNum: Number,
    pageDate: Array,
    showDpage: Function,
    toChangePage: Function,
    submit: Function,
  },
};
</script>
<style lang="less" scoped>
.option-page {
  .yes {
    background-color: #1abc9c !important;
    color: #fff;
  }
  position: fixed;
  width: 100%;
  height: 50%;
  top: 50%;
  left: 0;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  // overflow: auto;
  .option-page-top {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    // margin-bottom: 10px;
    border-bottom: 1px solid #e7e2e2;
    padding-bottom: 8px;
    .subtoc {
      background-color: rgb(11, 180, 81);
      border-radius: 20px;
      border: 4px;
      padding: 8px;
      color: #fff;
    }
  }
  .option-page-bottom {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    // width: 100%;
    // height: 50%;
    overflow: auto;
    width: 100%;
    height: 80%;
    li {
      width: 44px;
      height: 44px;
      background-color: #b8b8b8;
      border-radius: 30px;
      margin: 5px;
    }
  }
}
</style>