<template>
  <div id="exam" v-if="ifShow">
    <h3 class="head">{{ head }}</h3>
    <!-- 题目 -->
    <div class="topic">
      <div class="itemContent">
        {{ nowPage }}、{{ optionss[nowPage - 1].topic }}
      </div>
      <div class="map center">
        <img
          :src="optionss[nowPage - 1].img"
          style="max-width: 100%; max-height: 180px"
        />
      </div>
      <ul class="optionList">
        <li
          v-for="(item, index) in optionss[nowPage - 1].select"
          :key="index"
          @click="onStyle(index + 1)"
          :class="{ yes: pitchOn == index + 1 }"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- 功能按钮 -->
    <div class="page">
      <div class="pageUp page-btn" @click="changePage('up')" v-show="upShow">
        上一题
      </div>
      <div
        class="pageDown page-btn"
        @click="changePage('down')"
        v-show="downShow"
      >
        下一题
      </div>
      <div class="pagenum center" @click="showOptionPage = true">
        {{ this.nowPage + "/" + correct.length }}
      </div>
    </div>
    <div class="subcom" @click="submit()">提交</div>

    <!-- 选择导航遮罩 -->
    <div
      class="option-shade"
      @click="showDpage()"
      v-show="showOptionPage == true"
    ></div>

    <!-- 选择导航 -->
    <optionPage
      v-show="showOptionPage"
      :pageNum="correct.length"
      :pageDate="answer"
      :showDpage="showDpage"
      :toChangePage="toChangePage"
      :submit="submit"
    ></optionPage>
  </div>
</template>
<script>
import axios from "axios";
import optionPage from "@/components/optionPage";
export default {
  created() {
    // localStorage.clear();

    let ms = this.$route.query.ms;
    if (ms == "one") {
      this.head = "第一单元";
    } else if (ms == "two") {
      this.head = "第二单元";
    } else if (ms == "three") {
      this.head = "第三单元";
    } else if (ms == "four") {
      this.head = "第四单元";
    } else if (ms == "five") {
      this.head = "第五单元";
    } else if (ms == "all") {
      this.head = "模拟考试";
    }

    this.startTime = this.getDate();

    if (localStorage.getItem("allData") != null) {
      this.allData = JSON.parse(window.localStorage.getItem("allData"));
      this.getAllData(ms);
      this.changePage();
    } else {
      axios.get(`https://ks.kuold.com/gettopic?name=all`).then(async (res) => {
        this.allData = {
          choice: JSON.parse(res.data.one),
          judge: JSON.parse(res.data.two),
        };
        window.localStorage.setItem("allData", JSON.stringify(this.allData));
        this.getAllData(ms);
        this.changePage();
      });
    }
  },
  components: {
    optionPage,
  },

  methods: {
    // 获取开始 or 结束时间
    getDate() {
      let onDate = new Date();
      let month = onDate.getMonth() + 1 + "月";
      let date = onDate.getDate() + "日";
      let hour =
        onDate.getHours() < 10 ? "0" + onDate.getHours() : onDate.getHours();
      let minutes =
        onDate.getMinutes() < 10
          ? "0" + onDate.getMinutes()
          : onDate.getMinutes();
      let seconds =
        onDate.getSeconds() < 10
          ? "0" + onDate.getSeconds()
          : onDate.getSeconds();
      let inDate = month + date + "\t" + hour + ":" + minutes + ":" + seconds;
      return inDate;
    },
    // 切割第一 至 第五单元题目
    getTopicData(one, two, beginOne, beginTwo) {
      let a = 0;
      for (let i = beginOne; i < one; i++) {
        this.optionss.push(this.allData.choice[i]);
        this.correct.push(this.optionss[a].correct);
        a++;
      }
      for (let i = beginTwo; i < two; i++) {
        this.optionss.push(this.allData.judge[i]);
        this.correct.push(this.optionss[a].correct);
        a++;
      }
    },
    // 模考随机80+20道题
    getAllTopicData() {
      let a = 0;
      for (let i = 0; i < 80; i++) {
        let snum = Math.floor(Math.random() * this.allData.choice.length + 1);
        this.optionss.push(this.allData.choice.splice(snum - 1, 1)[0]);
        this.correct.push(this.optionss[a].correct);
        a++;
      }
      for (let i = 0; i < 20; i++) {
        let snum = Math.floor(Math.random() * this.allData.judge.length + 1);
        this.optionss.push(this.allData.judge.splice(snum - 1, 1)[0]);
        this.correct.push(this.optionss[a].correct);
        a++;
      }
    },
    // 判断单元 并 显示页面
    getAllData(ms) {
      if (ms == "one") {
        this.getTopicData(53, 18, 0, 0);
      } else if (ms == "two") {
        this.getTopicData(252, 98, 53, 18);
      } else if (ms == "three") {
        this.getTopicData(382, 144, 252, 98);
      } else if (ms == "four") {
        this.getTopicData(517, 195, 382, 144);
      } else if (ms == "five") {
        this.getTopicData(710, 271, 517, 195);
      } else {
        this.getAllTopicData();
      }
      this.ifShow = true;
    },

    // 选择导航触发
    toChangePage(num) {
      // 遮罩隐藏
      this.showDpage();

      for (let i = 0; i < num; i++) {
        if (this.answer[i] == undefined) {
          this.answer.splice(i, 0, 0);
        }
      }

      this.nowPage = num;
      if (this.nowPage == 1) {
        this.upShow = false;
        this.downShow = true;
      } else if (this.nowPage == this.optionss.length) {
        this.downShow = false;
        this.upShow = true;
      } else {
        this.downShow = true;
        this.upShow = true;
      }

      if (this.answer[this.nowPage - 1] != 0) {
        this.pitchOn = this.answer[this.nowPage - 1];
      } else {
        this.pitchOn = 0;
      }
    },
    // 隐藏子组件
    showDpage() {
      this.showOptionPage = false;
    },
    // 单选变色
    onStyle(index) {
      this.pitchOn = index;
      this.answer.splice(this.nowPage - 1, 1, this.pitchOn);
    },

    // 换页 存储答案
    changePage(on) {
      if (this.pitchOn < 1 || this.pitchOn == undefined) {
        this.pitchOn = 0;
      }

      this.answer.splice(this.nowPage - 1, 1, this.pitchOn);

      if (on == "up") {
        this.nowPage -= 1;
        this.downShow = true;

        if (this.nowPage == 1) {
          this.upShow = false;
        }
      } else if (on == "down") {
        this.nowPage += 1;
        this.upShow = true;

        if (this.nowPage == this.optionss.length) {
          this.downShow = false;
        }
      }

      if (this.answer[this.nowPage - 1] != 0) {
        this.pitchOn = this.answer[this.nowPage - 1];
      } else {
        this.pitchOn = 0;
      }
    },
    // 提交
    submit() {
      let answer = this.answer;
      let correct = this.correct;
      let grade = 0;
      let topicId = [];
      for (let i = 0; i < correct.length; i++) {
        if (answer[i] == correct[i]) {
          grade++;
        } else if (answer[i] == undefined) {
          this.answer.splice(i, 1, 0);
        }
      }

      for (let i = 0; i < this.optionss.length; i++) {
        topicId.push(this.optionss[i].id);
      }
      this.correct = [];
      this.endTime = this.getDate();
      let onCom = {
        head: this.head,
        topicLength: this.optionss.length,
        answer: answer,
        grade: grade,
        topicId: topicId,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      let oldData = JSON.parse(window.localStorage.getItem("historyData"));
      if (oldData != null) {
        oldData.push(onCom);
        window.localStorage.setItem("historyData", JSON.stringify(oldData));
      } else {
        oldData = [];
        oldData.push(onCom);
        window.localStorage.setItem("historyData", JSON.stringify(oldData));
      }
      this.$store.commit("editNowExamNum", oldData.length);
      this.$router.push("Grade");
    },
  },
  data() {
    return {
      head: "",
      ifShow: false,
      nowPage: 1,
      pitchOn: 0,
      answer: [],
      correct: [],
      optionss: [],
      showOptionPage: false,
      allData: {},
      upShow: false,
      downShow: true,
      startTime: 0,
      endTime: 0,
    };
  },
};
</script>
<style lang="less" scoped>
#exam {
  height: 100%;
  font-size: 18px;
  box-sizing: border-box;
  padding: 60px 20px 50px 20px;
  position: relative;
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
  }
  .head {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .option-shade {
    width: 100%;
    height: 100%;
    background-color: #00000070;
    position: absolute;
    top: 0;
    left: 0;
  }
  .subcom {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #2ecc71;
    border-radius: 10px;
    border: 4px double #fff;
    padding: 2px 10px 2px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .page {
    height: 20%;
    position: relative;
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
      position: absolute;
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
    color: yellowgreen;
  }
}
</style>