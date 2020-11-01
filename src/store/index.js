import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requisites: null,
    permissions: null
  },
  getters: {
    GET_CURRENT_REQUISITES: state => state.requisites,
    GET_CURRENT_PERMISSIONS: state => state.permissions
  },
  mutations: {
    UPDATE_CURRENT_REQUISITES(state, requisites) {
      state.requisites = requisites;
    },
    UPDATE_CURRENT_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
    }
  },
  actions: {
    SAVE_USER_INFORMATION({ commit }, { requisites, permissions }) {
      commit("UPDATE_CURRENT_REQUISITES", requisites);
      commit("UPDATE_CURRENT_PERMISSIONS", permissions);
    }
  },
  modules: {}
});
