import apiAuth from "@/api/auth.api";
import EventBus from "@/EventBus";

export default {
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
  methods: {
    handler(data) {
      if (typeof data === "string") return this.redirectionTo(data);
      else return this.signOut();
    },
    async signOut() {
      try {
        await apiAuth.signOut();
        await this.$router.replace("/");
      } catch (e) {
        EventBus.$emit("error", e);
      }
    },
    async redirectionTo(pathName = "test") {
      await this.$router.replace({ path: pathName });
    }
  }
};
