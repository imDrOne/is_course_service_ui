import Vue from "vue";
import VueRouter from "vue-router";

// Layouts
import MainLayout from "@/layouts/MainLayout/index";
import AuthLayout from "@/layouts/AuthLayout/index";

//Views
import MainView from "@/views/MainView/index";

Vue.use(VueRouter);

const routes = [
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
  },
  {
    path: "/",
    redirect: "/auth/login",
    component: AuthLayout,
    name: "Auth"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
