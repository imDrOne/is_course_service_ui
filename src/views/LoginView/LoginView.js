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
    }
  }
};
