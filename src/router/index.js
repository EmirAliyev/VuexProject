import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/components/MainPage";
import AllPosts from "@/components/AllPosts";
import UserPage from "@/components/UserPage";
Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: MainPage },
  { path: "/lenta", name: "lenta", component: AllPosts },
  { path: "/userPage/:id", name: "userPage", component: UserPage },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
