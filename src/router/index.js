import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Setting from "../views/Setting.vue";
import Result from "@/views/Result.vue";
import SignIn from "@/views/SignIn.vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export default function (store) {
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
  router.beforeEach(async (to, from, next) => {
    const accessToken = cookies.get("accessToken");

    if (accessToken) {
      store.commit("auth/needLogin", false);

      if (to.path === "/signIn") {
        return next("/");
      }
    } else {
      store.commit("auth/needLogin", true);

      if (to.path !== "/signIn") {
        return next("/signIn");
      }
    }

    next();
  });

  return router;
}
