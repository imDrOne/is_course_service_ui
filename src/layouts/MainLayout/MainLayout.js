import EventBus from "@/EventBus";
import { permissions } from "@/components/mixins/permissions";

export default {
  name: "MainLayout",
  data: () => ({}),
  mixins: [permissions],
  async created() {
    await this.$store.dispatch("SAVE_USER_INFORMATION", {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      requisites: JSON.parse(localStorage.getItem("requisites"))
    });
  },
  async mounted() {
    if (this.permissionsCodes) {
      if (this.permissionsCodes.includes("can__ViewUsers")) {
        try {
          await this.$store.dispatch("users/LOAD_USERS", {});
        } catch (e) {
          if (e === "try") {
            await this.$store
              .dispatch("users/LOAD_USERS", {})
              .catch(err => EventBus.$emit("error", err));
          } else EventBus.$emit("error", e);
        }
      }
    }
  }
};
