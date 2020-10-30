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
        await apiAuth.signOut({
          token: localStorage.getItem("accessToken")
        });
        await this.$router.replace("/");
      } catch (e) {
        EventBus.$emit("error", e);
      }
    }
  }
};
