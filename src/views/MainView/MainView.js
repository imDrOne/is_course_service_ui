import { mapGetters } from "vuex";

export default {
  name: "MainView",
  computed: {
    ...mapGetters({
      users: "users/GET_USERS"
    })
  }
};
