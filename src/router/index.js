import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Exam from "../views/exam.vue"
import Topic from "../views/topic.vue"
import Grade from "../views/grade.vue"
import Errtopic from "../views/errtopic.vue"
import History from "../views/history.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Topic",
    name: "Topic",
    component: Topic,
  },
  {
    path: "/Exam",
    name: "Exam",
    component: Exam,
  },
  {
    path: "/Grade",
    name: "Grade",
    component: Grade,
  },
  {
    path: "/Errtopic",
    name: "Errtopic",
    component: Errtopic,
  },
  {
    path: "/History",
    name: "History",
    component: History,
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
