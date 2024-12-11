import { createStore } from "vuex";
import auth from "./auth/auth";

const store = createStore({
  state: {
    rootState: "",
  },
  mutations: {
    rootState(state, payload) {
      state.rootState = payload;
    },
  },
  getters: {
    rootState(state) {
      return state.rootState;
    },
  },
  modules: {
    auth,
  },
});

export default store;
