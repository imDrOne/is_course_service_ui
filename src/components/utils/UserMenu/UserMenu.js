import { mapActions, mapGetters } from "vuex";

import apiAuth from "@/api/auth.api";
import EventBus from "@/EventBus";
import {redirector} from "@/components/mixins/redirector";

export default {
  mixins: [redirector],
  data: vm => ({
    menuItems: [
      {
        icon: "mdi-cogs",
        label: "Настройки профиля",
        action: vm.handler,
        data: "test"
      },
      {
        icon: "mdi-exit-to-app",
        label: "Выход из системы",
        action: vm.handler,
        data: undefined
      }
    ]
  }),
  computed: {
    ...mapGetters({
      requisites: "GET_CURRENT_REQUISITES"
    }),

    fullName() {
      if (!this.requisites) return undefined;
      return `${this.requisites.firstName} ${this.requisites.secondName ||
        String()}`;
    }
  },
  methods: {
    ...mapActions({
      clearUserInformation: "SAVE_USER_INFORMATION"
    }),

    handler(data) {
      if (typeof data === "string") return this.redirectionTo(data);
      else return this.signOut();
    },
    async signOut() {
      try {
        await apiAuth.signOut();
        await this.clearUserInformation({
          requisites: null,
          permissions: null
        });

        this.$store.commit("users/UPDATE_USERS", null);
        await this.$router.replace("/");
      } catch (e) {
        EventBus.$emit("error", e);
      }
    }
  }
};
