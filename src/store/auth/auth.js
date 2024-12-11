import { useCookies } from "vue3-cookies";
import axios from "axios";

const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    needLogin: false,
  },
  mutations: {
    needLogin(state, data) {
      state.needLogin = data;
    },
  },
  getters: {
    needLogin(state) {
      return state.needLogin;
    },
  },
  actions: {
    login({ commit }, params) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            "http://3.36.211.68/api/auth/login",
            params
          );
          if (response.data.result === "success") {
            const accessToken = response.data.data.access_token;
            const expire = response.data.data.expires_in;
            cookies.set("accessToken", accessToken, expire);
            commit("needLogin", false);
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
          const response = await axios.post("/api/auth/refresh");
          if (response.data.ok) {
            const accessToken = response.data.data.access_token;
            const expire = response.data.data.expires_in;
            cookies.set("accessToken", accessToken, expire);
            commit("needLogin", false);
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
  },
};
