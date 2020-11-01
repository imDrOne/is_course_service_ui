import EventBus from "@/EventBus";

export default {
  name: "MainLayout",
  data: () => ({}),
  async created() {
    await this.$store.dispatch("SAVE_USER_INFORMATION", {
      permissions: JSON.parse(localStorage.getItem("requisites")),
      requisites: JSON.parse(localStorage.getItem("requisites"))
    });
  },
  async mounted() {
    try {
      await this.$store.dispatch("users/LOAD_USERS", {});
    } catch (message) {
      EventBus.$emit("error", message);
    }
  }
};
