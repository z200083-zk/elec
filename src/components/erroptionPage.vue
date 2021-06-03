<template>
  <div class="option-page">
    <div class="option-page-top">
      <div class="show" @click="showDpage()" style="cursor: pointer;">关闭</div>
    </div>
    <ul class="option-page-bottom">
      <li
        class="center"
        v-for="index in pageNum"
        :key="index"
        :style="{ backgroundColor: changeColor(index - 1) }"
        @click="toChangePage(index)"
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
    judgeColor: Boolean,
    showDpage: Function,
    toChangePage: Function,
    optionss: Object,
  },
  data() {
    return {
      comData: [],
    };
  },
  created() {
    this.styleColor();
  },
  methods: {
    styleColor() {
      for (let i = 0; i < this.optionss.answer.length; i++) {
        if (this.optionss.answer[i] == this.optionss.topicData[i].correct) {
          this.comData.push(1);
        } else {
          if (this.optionss.answer[i] == 0) {
            this.comData.push(2);
          } else {
            this.comData.push(0);
          }
        }
      }
      // console.log(this.comData);
    },
    changeColor(num) {
      // console.log(this.comData[num]);
      if (this.comData[num] == 0) {
        return "#e74c3c";
      } else if (this.comData[num] == 1) {
        return "#2ecc71";
      } else {
        return "#b8b8b8";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.option-page {
  .yes {
    background-color: #48ecec !important;
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
    justify-content: flex-end;
    font-size: 14px;
    // margin-bottom: 10px;
    border-bottom: 1px solid #e7e2e2;
    padding-bottom: 8px;
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
      cursor: pointer;
    }
  }
}
</style>