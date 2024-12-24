import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"; 
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
  plugins: [
    createPersistedState({
      key: "vuex", 
      paths: ["auth"], 
    }),
  ],
});

export default store;
