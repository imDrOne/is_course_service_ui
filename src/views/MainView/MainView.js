import { mapGetters } from "vuex";
import { permissions } from "@/components/mixins/permissions";

export default {
  name: "MainView",
  mixins: [permissions],
  computed: {
    ...mapGetters({
      users: "users/GET_USERS"
    })
  }
};
