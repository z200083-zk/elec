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
          style="max-width: 80%; max-height: 30%"
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
      <div class="pageUp page-btn" @click="onPageUp()">上一题</div>
      <div class="pageDown page-btn" @click="onPageDown()">下一题</div>
      <div class="pagenum center" @click="showOptionPage = true">
        {{ this.nowPage + "/" + correct.length }}
      </div>
    </div>
    <div class="subcom" @click="submit()">提交</div>
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

    // 从本地提取题库，如果没有发起请求获取

    // 判断本地有无

    if (ms == "all") {
      this.getAllData(ms);
    } else {
      let topicData = JSON.parse(window.localStorage.getItem("topicData"));
      let localaData;
      let locaYes = false;
      if (topicData != null) {
        for (let i = 0; i < topicData.length; i++) {
          if (topicData[i].head == this.head) {
            localaData = topicData[i].topicData;
            locaYes = true;
          }
        }

        // 本地有，遍历提取
        if (locaYes) {
          for (let i = 0; i < localaData.length; i++) {
            this.optionss.push(localaData[i]);
            this.correct.push(this.optionss[i].correct);
          }
          this.ifShow = true;
        } else {
          // 本地没有，请求获取
          axios
            .get(`http://ks.kuold.com/gettopic?name=${ms}`)
            .then(async (res) => {
              let backData = res.data;

              // 获取成功，打入下标存进本地
              let topicNewData = {
                head: this.head,
                topicData: backData,
              };
              topicData.push(topicNewData);
              window.localStorage.setItem(
                "topicData",
                JSON.stringify(topicData)
              );
              for (let i = 0; i < backData.length; i++) {
                this.optionss.push(backData[i]);
                this.correct.push(this.optionss[i].correct);
              }
              this.ifShow = true;
            });
        }
      } else {
        axios
          .get(`http://ks.kuold.com/gettopic?name=${ms}`)
          .then(async (res) => {
            let backData = res.data;
            topicData = [];
            let topicNewData = {
              head: this.head,
              topicData: backData,
            };
            topicData.push(topicNewData);
            window.localStorage.setItem("topicData", JSON.stringify(topicData));
            for (let i = 0; i < backData.length; i++) {
              this.optionss.push(backData[i]);
              this.correct.push(this.optionss[i].correct);
            }
            this.ifShow = true;
          });
      }
    }
  },
  components: {
    optionPage,
  },

  methods: {
    getAllData(ms) {
      try {
        let allTopicData = JSON.parse(
          window.localStorage.getItem("allTopicData")
        );
        for (let i = 0; i < 80; i++) {
          let snum = Math.floor(Math.random() * allTopicData.choice.length + 1);
          this.optionss.push(allTopicData.choice.splice(snum - 1, 1)[0]);
          this.correct.push(this.optionss[i].correct);
        }
        for (let i = 0; i < 20; i++) {
          let snum = Math.floor(Math.random() * allTopicData.judge.length + 1);
          this.optionss.push(allTopicData.judge.splice(snum - 1, 1)[0]);
          this.correct.push(this.optionss[i].correct);
        }
        this.ifShow = true;
      } catch {
        axios
          .get(`http://ks.kuold.com/gettopic?name=${ms}`)
          .then(async (res) => {
            let allTopicData = {
              choice: JSON.parse(res.data.one),
              judge: JSON.parse(res.data.two),
            };
            window.localStorage.setItem(
              "allTopicData",
              JSON.stringify(allTopicData)
            );
            for (let i = 0; i < 80; i++) {
              let snum = Math.floor(
                Math.random() * allTopicData.choice.length + 1
              );
              this.optionss.push(allTopicData.choice.splice(snum - 1, 1)[0]);
              this.correct.push(this.optionss[i].correct);
            }
            for (let i = 0; i < 20; i++) {
              let snum = Math.floor(
                Math.random() * allTopicData.judge.length + 1
              );
              this.optionss.push(allTopicData.judge.splice(snum - 1, 1)[0]);
              this.correct.push(this.optionss[i].correct);
            }
            this.ifShow = true;
          });
      }
    },

    toChangePage(num) {
      for (let i = 0; i < num; i++) {
        if (this.answer[i] == undefined) {
          this.answer.splice(i, 0, 0);
        }
      }
      this.nowPage = num;
      if (this.answer[this.nowPage - 1] != 0) {
        this.pitchOn = this.answer[this.nowPage - 1];
      } else {
        this.pitchOn = 0;
      }
    },
    //   隐藏子组件
    showDpage() {
      this.showOptionPage = false;
    },
    // 单选变色
    onStyle(index) {
      this.pitchOn = index;
      this.answer.splice(this.nowPage - 1, 1, this.pitchOn);
    },
    // 上一题
    onPageUp() {
      if (this.nowPage == 1) {
        return;
      }

      this.changePage("up");
    },
    // 下一题
    onPageDown() {
      if (this.nowPage == this.optionss.length) {
        return;
      }

      this.changePage("down");
    },
    // 换页存储
    changePage(on) {
      if (this.pitchOn < 1) {
        this.pitchOn = 0;
      }
      if (this.pitchOn == undefined) {
        this.pitchOn = 0;
      }

      this.answer.splice(this.nowPage - 1, 1, this.pitchOn);

      if (on == "up") {
        this.nowPage -= 1;
      } else if (on == "down") {
        this.nowPage += 1;
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
      let grade = this.grade;
      let i = 0;
      for (i = 0; i < correct.length; i++) {
        if (answer[i] == correct[i]) {
          grade++;
        } else if (answer[i] == undefined) {
          this.answer.splice(i, 1, 0);
        }
      }

      this.correct = [];

      let onCom = {
        head: this.head,
        topicData: this.optionss,
        answer: answer,
        grade: grade
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
      grade: 0,
      nowPage: 1,
      pitchOn: 0,
      answer: [],
      correct: [],
      optionss: [],
      showOptionPage: false,
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