import { useCookies } from "vue3-cookies";
import axios from "axios";
import axiosInstance from "@/services/base";

const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    needLogin: true,
    userId: "",
  },
  mutations: {
    setAuthentication(state, data) {
      state.needLogin = data.needLogin;
      state.userId = data.userId || "";
    },
  },
  getters: {
    needLogin(state) {
      return state.needLogin
    },
    getUserId(state) {
      return state.userId
    }
  },
  actions: {
    login({ commit }, params) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            import.meta.env.VITE_APP_BASE_URL +"/api/auth/login",
            params
          );
          if (response.data.result === "success") {
            const accessToken = response.data.data.access_token;
            const expire = response.data.data.expires_in;
            const userId = response.data.data.user_id;
            cookies.set("accessToken", accessToken, expire, "/");
            commit("setAuthentication", {
              userId,
              needLogin: false,
            });
          }
          resolve(response.data.message);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
    refreshToken({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axiosInstance.post("/api/auth/refresh");
          if (response.statusText === "OK") {
            const accessToken = response.data.data.access_token;
            const expire = response.data.data.expires_in;
            const userId = response.data.data.user_id;
            cookies.set("accessToken", accessToken, expire);
            commit("setAuthentication", {
              userId,
              needLogin: false,
            });
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
  },
};
