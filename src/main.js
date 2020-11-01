import Vue from "vue";
import App from "./App/App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import "./styles/index.scss";
import "./components";

Vue.config.productionTip = false;
import { isAuthenticated } from "@/utils/validations";
import apiAuth from "@/api/auth.api";
import apiUsers from "@/api/users.api";

(async () => {
  try {
    await isAuthenticated();
    apiAuth.defaults.headers.common["token"] = localStorage.getItem(
      "accessToken"
    );
    apiUsers.defaults.headers.common["token"] = localStorage.getItem(
      "accessToken"
    );
  } catch (e) {
    localStorage.clear();
    await router.replace({ path: "/login" });
  } finally {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})();
