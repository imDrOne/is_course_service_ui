import apiUsers from "@/api/users.api";

export default {
  LOAD_USERS({ commit }) {
    return apiUsers.getAllUsers().then(response => {
      const { data } = response;
      commit("UPDATE_USERS", data);
    });
  }
};
