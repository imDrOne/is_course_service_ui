import Vue from "vue";
import App from "./App/App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import "./styles/index.scss";

Vue.config.productionTip = false;
import { isAuthenticated } from "@/utils/validations";

(async () => {
  try {
    await isAuthenticated();
  } catch (e) {
    await router.replace({ path: "/login" });
  } finally {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})();
