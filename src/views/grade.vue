<template>
  <div id="grade">
    <h3 class="header center">考试成绩</h3>
    <div class="time"></div>
    <div class="gnum">
      <div class="gnum-num center">{{grade}}</div>
      <div class="num-text center">分</div>
      <div class="onerrtoc center" @click="goErrtopic()" style="cursor: pointer;">点击查看错题</div>
    </div>
    <div class="gohome center" @click="goHome()">回主页</div>
  </div>
</template>
<script>
export default {
  created(){
    let nowGrade= JSON.parse(window.localStorage.getItem("historyData"));
    this.grade = nowGrade[nowGrade.length-1].grade;
    console.log(nowGrade[nowGrade.length-1].grade);
    // console.log(nowGrade);
  },
  data() {
    return {
      grade: [],
    };
  },
  methods: {
    goHome() {
      this.$store.commit("editGrade", 0);
      this.$router.push("/");
    },
    goErrtopic() {
      this.$router.push("/Errtopic");
    },
  },
};
</script>
<style lang="less" scoped>
#grade {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  .gnum {
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
    height: 50%;
    .gnum-num {
      width: 100%;
      //   height: 200px;
      font-size: 80px;
      font-weight: 700;
    }
    .num-text {
      font-weight: 700;
    }

    .onerrtoc {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 700;
      width: 150px;
      height: 50px;
      background-color: rgb(218, 172, 21);
      color: #c32626;
      border-radius: 15px;
    }
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
}
</style>