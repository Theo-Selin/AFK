import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
