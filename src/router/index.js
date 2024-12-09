import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Setting from "../views/Setting.vue";
import Result from "@/views/Result.vue";
import SignIn from "@/views/SignIn.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/setting",
      component: Setting,
    },
    {
      path: "/result/:id",
      component: Result,
    },
    {
      path: "/signIn",
      component: SignIn,
    },
  ],
});

export default router;
