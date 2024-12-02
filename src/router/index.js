import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Setting from "../views/Setting.vue";
import Result from "@/views/Result.vue";

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
  ],
});

export default router;
