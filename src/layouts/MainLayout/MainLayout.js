import apiAuth from "@/api/auth.api";
import EventBus from "@/EventBus";

export default {
  name: "MainLayout",
  data: () => ({
    leftDrawerOpen: false
  }),
  methods: {
    async signOut() {
      try {
        await apiAuth.signOut();
        await this.$router.replace("/");
      } catch (e) {
        EventBus.$emit("error", e);
      }
    }
  }
};
