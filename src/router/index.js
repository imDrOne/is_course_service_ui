import Vue from "vue";
import VueRouter from "vue-router";

//Utils
import { isAuthenticated } from "@/utils/validations";

// Layouts
import MainLayout from "@/layouts/MainLayout/index";
import AuthLayout from "@/layouts/AuthLayout/index";

//Views
import MainView from "@/views/MainView/index";
import AuthView from "@/views/LoginView/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: AuthLayout,
    name: "Auth",
    children: [
      {
        path: "login",
        component: AuthView,
        name: "Login",
        beforeEnter: (to, from, next) => {
          if (from.path !== "/") {
            isAuthenticated()
              .then(() => next({ name: "Dashboard" }))
              .catch(() => next());
          } else next();
        }
      }
    ]
  },
  {
    path: "/",
    redirect: "/main",
    component: MainLayout,
    name: "Dashboard",
    children: [
      {
        path: "main",
        component: MainView,
        name: "Main"
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
