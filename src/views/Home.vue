<template>
  <div class="intermediate">
    <div class="gohistory center" @click="goHome('History')">历史记录</div>
    <div class="inte-box">
      <h3 class="top center">中级</h3>
      <div class="one center tic" @click="goStart('one')">{{ one }}</div>
      <div class="two center tic" @click="goStart('two')">{{ two }}</div>
      <div class="three center tic" @click="goStart('three')">{{ three }}</div>
      <div class="four center tic" @click="goStart('four')">{{ four }}</div>
      <div class="five center tic" @click="goStart('five')">{{ five }}</div>
      <div class="exam center tic" @click="goStart('all')">{{ all }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    try {
      axios.get("http://ks.kuold.com/newTopic").then(async (res) => {
        let nowTopicVs = window.localStorage.getItem("newTopic");
        if (res.data == nowTopicVs) {
          return;
        } else {
          window.localStorage.removeItem("topicData");
          window.localStorage.removeItem("allTopicData");
          window.localStorage.setItem("newTopic", res.data);
        }
      });
    } catch {
      axios.get("http://ks.kuold.com/newTopic").then(async (res) => {
        window.localStorage.removeItem("topicData");
        window.localStorage.removeItem("allTopicData");
        window.localStorage.setItem("newTopic", res.data);
      });
    }
  },
  methods: {
    goStart(ms) {
      axios
        .get(`http://ks.kuold.com/queryData?name=${ms}`)
        .then(async (res) => {
          this.goUp = res.data;
          if (this.goUp == "模拟考试已完成") {
            this.go(ms);
          } else if (this.goUp == "第一单元已完成") {
            this.go(ms);
          } else if (this.goUp == "第二单元已完成") {
            this.go(ms);
          } else if (this.goUp == "第三单元已完成") {
            this.go(ms);
          } else if (this.goUp == "第四单元已完成") {
            this.go(ms);
          } else if (this.goUp == "第五单元已完成") {
            this.go(ms);
          } else {
            if (this.goUp == "模拟考试未完成") {
              this.all = "该题库尚未完成";
            } else if (this.goUp == "第一单元未完成") {
              this.one = "该题库尚未完成";
            } else if (this.goUp == "第二单元未完成") {
              this.two = "该题库尚未完成";
            } else if (this.goUp == "第三单元未完成") {
              this.three = "该题库尚未完成";
            } else if (this.goUp == "第四单元未完成") {
              this.four = "该题库尚未完成";
            } else if (this.goUp == "第五单元未完成") {
              this.five = "该题库尚未完成";
            }
          }
        });
    },
    go(ms) {
      this.$router.push({
        path: "/Exam",
        query: {
          ms: ms,
        },
      });
    },
    goHome(res) {
      this.$router.push(`/${res}`);
    },
  },
  data() {
    return {
      goUp: 0,
      one: "第一单元",
      two: "第二单元",
      three: "第三单元",
      four: "第四单元",
      five: "第五单元",
      all: "模拟考试",
    };
  },
};
</script>
<style lang="less" scoped>
.intermediate {
  width: 100%;
  height: 100%;
  background-color: #f7e986;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-around;
  // align-content: center;
  // position: relative;
  .inte-box {
    width: 100%;
    height: 100%;
    background-color: #f7e986;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
    position: relative;
    .tic {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin: 10px;
      color: #fff;
      box-sizing: border-box;
      padding: 8px;
    }
    .top {
      position: absolute;
      top: 20px;
      color: #000;

      height: 20px;
    }
    .one {
      background-color: #1abc9c;
      cursor: pointer;
    }
    .two {
      background-color: #2ecc71;
      cursor: pointer;
    }
    .three {
      background-color: #3498db;
      cursor: pointer;
    }
    .four {
      background-color: #9b59b6;
      cursor: pointer;
    }
    .five {
      background-color: #34495e;
      cursor: pointer;
    }
    .exam {
      background-color: #f1c40f;
      cursor: pointer;
    }
  }
  .gohistory {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #1abc9c;
    border-radius: 10px;
    border: 4px double #fff;
    padding: 2px 10px 2px 10px;
    font-size: 16px;
    color: #fff;
    z-index: 10;
    cursor: pointer;
  }
}
</style>
