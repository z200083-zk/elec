<template>
  <div id="ertoc">
    <div class="errsub" @click="errPageShow = true">报错</div>
    <div class="gohistory center" @click="goHome('History')">历史记录</div>
    <div class="gohome center" @click="goHome('')">回主页</div>
    <!-- 题目 -->
    <div class="topic">
      <div class="itemContent">
        {{ nowPage }}、{{ optionss.topicData[nowPage - 1].topic }}
      </div>
      <div class="map center">
        <img
          :src="optionss.topicData[nowPage - 1].img"
          style="max-width: 80%; max-height: 30%"
        />
      </div>
      <ul class="optionList">
        <li
          v-for="(item, index) in optionss.topicData[nowPage - 1].select"
          :key="index"
          :class="[
            {
              yes: index + 1 == yesNum,
            },
            { err: index + 1 == errNum },
          ]"
        >
          {{ item }}
        </li>
      </ul>
      <div class="judge">
        <p>正确答案：{{ yesCot }}</p>
        <p>你的选择：{{ errCot }}</p>
        <p :style="{ color: judgeColor ? 'yellowgreen' : 'red' }">
          {{ judge }}
        </p>
      </div>
    </div>
    <!-- 功能按钮 -->
    <div class="page">
      <div class="pageUp page-btn" @click="onPageUp()">上一题</div>
      <div class="pageDown page-btn" @click="onPageDown()">下一题</div>
      <!-- <div class="complete page-btn" @click="submit()">提交</div> -->
      <div class="pagenum center" @click="showOptionPage = true">
        {{ this.nowPage + "/" + optionss.topicData.length }}
      </div>
    </div>
    <div class="err-page center" v-show="errPageShow">
      <div class="err-back" @click="errPageShow = false"></div>
      <div class="err-text" @click="errPageShow = true">
        <p>问题描述:</p>
        <input type="text" v-model="errText" />
        <div class="err-btm">
          <div class="err-btm-right">{{ errHint }}</div>
          <div class="err-sub" @click="errSub()">报错</div>
        </div>
      </div>
    </div>

    <optionPage
      v-show="showOptionPage"
      :pageNum="optionss.topicData.length"
      :pageDate="optionss.answer"
      :showDpage="showDpage"
      :toChangePage="toChangePage"
      :judgeColor="judgeColor"
      :optionss="optionss"
    ></optionPage>
  </div>
</template>
<script>
import axios from "axios";
import optionPage from "@/components/erroptionPage";
export default {
  created() {
    let nowData = JSON.parse(window.localStorage.getItem("historyData"));
    this.optionss = nowData[this.$store.state.nowExamNum - 1];
    this.changeStyle();
  },
  data() {
    return {
      nowPage: 1,
      optionss: [],
      showOptionPage: false,
      yesNum: 0,
      errNum: 0,
      yesCot: "",
      errCot: "",
      judge: "",
      judgeColor: "",
      errPageShow: false,
      errText: "",
      errHint: "",
    };
  },

  components: {
    optionPage,
  },
  methods: {
    errSub() {
      if (this.errText.trim() == "") {
        this.errHint = "不能为空";
        return;
      } else {
        this.errHint = "";
      }
      let errData = {
        issue: this.errText,
        head: this.optionss.head,
        topicData: this.optionss.topicData[this.nowPage - 1],
      };
      axios
        .post("http://ks.kuold.com/xrerr", errData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          if (res.data == "ok") {
            this.errText = "";
            this.errPageShow = false;
          }else{
            this.errHint="未知错误";
          }
        });
    },
    goHome(res) {
      this.$router.push(`/${res}`);
    },
    changeStyle() {
      this.yesNum = this.optionss.topicData[this.nowPage - 1].correct;
      this.errNum = this.optionss.answer[this.nowPage - 1];
      if (this.yesNum == 1) {
        this.yesCot = "A";
      } else if (this.yesNum == 2) {
        this.yesCot = "B";
      } else if (this.yesNum == 3) {
        this.yesCot = "C";
      } else if (this.yesNum == 4) {
        this.yesCot = "D";
      }

      if (this.errNum == 0) {
        this.errCot = "未选择";
      } else {
        if (this.errNum == 1) {
          this.errCot = "A";
        } else if (this.errNum == 2) {
          this.errCot = "B";
        } else if (this.errNum == 3) {
          this.errCot = "C";
        } else if (this.errNum == 4) {
          this.errCot = "D";
        }
      }

      if (this.yesNum == this.errNum) {
        this.judge = "正确";
        this.judgeColor = true;
      } else {
        this.judge = "错误";
        this.judgeColor = false;
      }
    },
    toChangePage(num) {
      this.nowPage = num;
      this.changeStyle();
    },
    //   隐藏子组件
    showDpage() {
      this.showOptionPage = false;
    },
    // 上一题
    onPageUp() {
      if (this.nowPage == 1) {
        return;
      }
      this.nowPage--;
      this.changeStyle();
    },
    // 下一题
    onPageDown() {
      if (this.nowPage == this.optionss.length) {
        return;
      }
      this.nowPage++;
      this.changeStyle();
    },
  },
};
</script>
<style lang="less" scoped>
#ertoc {
  height: 100%;
  font-size: 18px;
  box-sizing: border-box;
  padding: 50px 20px 50px 20px;
  position: relative;

  .errsub {
    position: absolute;
    left: 10px;
    top: 10px;
    background-color: #e74c3c;
    border-radius: 10px;
    border: 4px double #fff;
    padding: 2px 10px 2px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .gohistory {
    position: absolute;
    right: 100px;
    top: 10px;
    background-color: #1abc9c;
    border-radius: 10px;
    border: 4px double #fff;
    padding: 2px 10px 2px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .gohome {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #1abc9c;
    border-radius: 10px;
    border: 4px double #fff;
    padding: 2px 10px 2px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .err-page {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .err-back {
      width: 100%;
      height: 100%;
      background-color: #00000070;
      position: absolute;
      top: 0;
      left: 0;
    }
    .err-text {
      border-radius: 6px;
      width: 80%;
      height: 120px;
      background-color: #eee;
      box-sizing: border-box;
      padding: 10px;
      position: absolute;
      top: 35%;
      z-index: 2;
      p {
        font-weight: 700;
      }
      input {
        text-indent: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 15px;
        width: 100%;
        height: 30px;
        font-size: 18px;
      }
      .err-btm {
        height: 36px;
        .err-sub {
          width: 32px;
          background-color: #e74c3c;
          border-radius: 10px;
          float: right;
          padding: 2px 10px 2px 10px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        .err-btm-right {
          height: 100%;
          text-align: center;
          color: #f00;
          font-size: 14px;
          float: left;
        }
      }
    }
  }
  .topic {
    margin-bottom: 20px;
    flex-direction: column;
    height: 80%;
    .optionList {
      li {
        margin-bottom: 20px;
      }
    }
    div {
      margin-bottom: 20px;
    }
    .judge {
      box-sizing: border-box;
      border: 1px solid #c3c3c3;
      background-color: #dedede;
      padding: 10px;
      p {
        margin: 4px;
      }
    }
  }
  .page {
    height: 20%;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
    .page-btn {
      background-color: #1abc9c;
      border-radius: 6px;
      // border: 4px solid  rgb(0, 0, 0);
      padding: 6px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
    }
    .pageUp {
      position: absolute;
      left: 10px;
      bottom: 10px;
    }
    .pageDown {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .pagenum {
      // position: absolute;
      left: 36%;
      bottom: 10px;
      font-size: 16px;
      width: 70px;
      background-color: #3498db;
      // border: 4px solid #eee;
      color: #fff;
      padding: 6px;
      border-radius: 6px;
      cursor: pointer;
    }
  }
  .yes {
    color: yellowgreen !important;
  }
  .err {
    color: red;
  }
}
</style>