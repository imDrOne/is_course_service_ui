import apiAuth from "@/api/auth.api";
import EventBus from "@/EventBus";

export default {
  name: "LoginView",
  data: () => ({
    login: null,
    password: null
  }),
  computed: {
    responsiveClasses() {
      const { name } = this.$q.screen;
      if (name === "xs") {
        return ["full-width", "q-ma-xs"];
      }
      return "d-auth-card";
    }
  },
  methods: {
    validateNullify(value, message) {
      return !!value || message;
    },
    async onSubmit() {
      try {
        await apiAuth.signIn({
          login: this.login,
          password: this.password
        });
        await this.$router.replace({
          name: "Dashboard"
        });
      } catch (e) {
        EventBus.$emit("error", e);
      }
    }
  }
};
