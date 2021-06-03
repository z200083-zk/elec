import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/base.css"

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   // console.log(next);
//   next();
// })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
