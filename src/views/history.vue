<template>
  <div id="history" :class="{ center: !historyShow }">
    <div class="hide" v-if="!historyShow">无历史记录</div>
    <div class="gohome center" @click="goHome('')" v-if="!refShow">回主页</div>
    <div class="refpage center" @click="refPage()" v-if="refShow || !historyShow">刷新</div>
    <ul class="his-page" v-if="historyShow">
      <li v-for="index in nowData.length" :key="index">
        <div class="his-page-left">
          <div class="his-page-left-left">
            <div class="his-page-grade">
              {{ nowData[nowData.length - index].grade }}
            </div>
            <div>———</div>
            <div class="his-page-gradesum">
              {{ nowData[nowData.length - index].topicLength }}
            </div>
          </div>
          <div class="his-page-center">分</div>
        </div>
        <div class="his-page-right">
          <h3 style="text-align: center">
            {{ nowData[nowData.length - index].head }}
          </h3>
          <div
            class="his-page-right-detail"
            @click="goErr(nowData.length - index)"
          >
            查看详情
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {  
  created() {
    // 判断刷新按钮是否显示
    this.$route.query.ss == 1 ? (this.refShow = true) : (this.refShow = false);
    
    // 判断
    let nowData = JSON.parse(window.localStorage.getItem("historyData"));
    if (nowData == null) {
      this.historyShow = false;
      this.refShow = false;
      return;
    }
    
    this.nowData = nowData;
  },
  data() {
    return {
      nowData: [],
      historyShow: true,
      refShow: false,
    };
  },
  methods: {
    // 刷新获取历史纪录
    refPage() {
      if (!this.historyShow) {
        return;
      }
      let nowData = JSON.parse(window.localStorage.getItem("historyData"));
      if (nowData.length > 10) {
        nowData.splice(0, nowData.length - 10);
      }
      this.nowData = nowData;
    },
    goHome(res) {
      this.$router.push(`/${res}`);
    },
    goErr(index) {
      this.$router.push({
        path: "/Errtopic",
        query: {
          num: index,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
#history {
  // height: 100%;
  box-sizing: border-box;
  padding: 30px 20px 10px 20px;
  background-color: #e9ebe6;
  .gohome {
    position: absolute;
    right: 80px;
    top: 10px;
    background-color: #1abc9c;
    border-radius: 10px;
    border: 4px double #fff;
    padding: 2px 10px 2px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .refpage {
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
  .his-page {
    height: 100%;
    background-color: #e9ebe6;
    li {
      height: 150px;
      box-sizing: border-box;
      padding: 10px;
      margin: 16px 10px;
      border: 1px solid #000;
      border-radius: 15px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
      .his-page-left {
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        .his-page-left-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .his-page-grade {
          font-size: 30px;
        }
      }
      .his-page-right {
        .his-page-right-detail {
          width: 80px;
          background-color: #1abc9c;
          border-radius: 6px;
          padding: 6px;
          font-size: 16px;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>