import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    grade: 0,
    nowExamNum: 0
  },
  mutations: {
    editGrade(state, num) {
      state.grade = num;
    },
    editNowExamNum(state,num){
      state.nowExamNum = num;
    }
  },
  actions: {},
  modules: {},
});
