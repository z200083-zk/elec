<template>
  <div id="srtopic">
    <div class="topic-name">
      <h2>题目</h2>
      <input type="text" v-model="topic" />
    </div>
    <div class="topic-img"></div>
    <div class="topic-xz">
      <div class="tobtn">
        <div class="combtn center" @click="selectTopic(1)">选择题</div>
        <div class="combtn center" @click="selectTopic(2)">判断题</div>
      </div>
      <ul class="toopn">
        <li
          class="center"
          v-for="index in topicOption"
          :key="index"
          :class="{ onCor: onCorrect == index }"
        >
          {{ selectQz(index) }}
          <input type="text" v-model="select[index - 1]" />
          <div class="correct-btn" @click="onCorrect = index"></div>
        </li>
      </ul>
    </div>
    <div class="correct"></div>
    <div class="btn center">
      <div class="combtn center" @click="getJson()">获取</div>
      <div class="combtn center" @click="submitData()">提交</div>
      <div class="combtn center" @click="addTopic()">添加</div>
      <div class="combtn center" @click="deleteData()">删除</div>
    </div>
    <div class="showlength">
      <div class="topiclength">
        当前共有题目：
        {{ nowData.length }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  // created() {
  //   axios.get(`http://mp.kuold.com/srtopic`).then((res) => {
  //     console.log(res.data);
  //     let nowData = res.data;
  //     let newData = [];
  //     for (let i = 0; i < nowData.length; i++) {
  //       nowData[i].id = 711 + i;
  //       newData.push(nowData[i]);
  //     }
  //     this.backData = res.data;
  //     this.nowData = res.data;
  //   });
  // },
  methods: {
    selectQz(index) {
      if (index == 1) {
        return "A:";
      } else if (index == 2) {
        return "B:";
      } else if (index == 3) {
        return "C:";
      } else if (index == 4) {
        return "D:";
      }
    },
    //   提交
    submitData() {
      let subData = JSON.stringify(this.nowData);
      //   console.log(subData);
      axios.post("http://mp.kuold.com/xrtopic", subData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    //   题型
    selectTopic(a) {
      this.onCorrect = 0;
      if (a == 1) {
        this.topicOption = 4;
        this.select = [];
      } else {
        this.topicOption = 2;
        this.select = ["正确", "错误"];
      }
    },
    // 获取
    getJson() {
      let name = "sj.json";
      axios.get(`http://mp.kuold.com/srtopic?cat=${name}`).then((res) => {
        this.backData = res.data;
        this.nowData = res.data;
      });
    },
    // 添加
    addTopic() {
      let select = [];
      for (let i = 0; i < this.select.length; i++) {
        if (i == 0) {
          select[i] = "A:" + this.select[i];
        } else if (i == 1) {
          select[i] = "B:" + this.select[i];
        } else if (i == 2) {
          select[i] = "C:" + this.select[i];
        } else if (i == 3) {
          select[i] = "D:" + this.select[i];
        }
      }
      let sj = {
        id: this.nowData.length + 1,
        topic: this.topic,
        select: select,
        correct: this.onCorrect,
      };
      console.log(sj);
      this.nowData.push(sj);
      this.topic = "";
      this.select = [];
      this.onCorrect = 0;
    },
    // 删除
    deleteData() {
      this.nowData.pop();
      console.log(this.nowData);
    },
  },
  data() {
    return {
      onCorrect: 0,
      topicOption: 4,
      topic: "",
      select: [],
      //获取的数据，不动
      backData: [],
      //   可操作的
      nowData: [],
    };
  },
};
</script>
<style lang="less" scoped>
#srtopic {
  .topic-name {
    padding: 20px;
    box-sizing: border-box;
    input {
      text-indent: 10px;
      border-radius: 15px;
      width: 100%;
      height: 50px;
      font-size: 20px;
    }
  }
  .topic-xz {
    box-sizing: border-box;
    padding: 20px;
    .tobtn {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
    }
    .toopn {
      li {
        justify-content: space-between;
      }
      input {
        text-indent: 10px;
        margin-bottom: 10px;
        border-radius: 15px;
        width: 80%;
        height: 40px;
        font-size: 20px;
      }
      .correct-btn {
        border-radius: 20px;
        background-color: #fff;
        width: 30px;
        height: 30px;
      }
      .onCor {
        color: rgb(2, 216, 2) !important;
        input {
          color: rgb(2, 216, 2) !important;
        }
        .correct-btn {
          background-color: rgb(2, 216, 2);
        }
      }
    }
  }
  .showlength {
    margin-top: 50px;
    width: 100%;
    height: 50px;
    background-color: #fff;
    div {
      font-size: 18px;
      width: 50%;
      height: 25px;
    }
  }
  .combtn {
    width: 80px;
    height: 40px;
    background-color: yellowgreen;
    border-radius: 15px;
    margin-right: 20px;
  }
}
</style>