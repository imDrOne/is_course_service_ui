export default {
  name: "MainLayout",
  data: () => ({}),
  async created() {
    await this.$store.dispatch("SAVE_USER_INFORMATION", {
      permissions: JSON.parse(localStorage.getItem("requisites")),
      requisites: JSON.parse(localStorage.getItem("requisites"))
    });
  }
};
