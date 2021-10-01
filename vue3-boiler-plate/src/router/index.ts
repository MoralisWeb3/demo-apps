import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ProtectedPages from "../components/ProtectedPages.vue";
import RouterGuard from "./router.guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: RouterGuard.Login,
  },
  {
    path: "/",
    name: "ProtectedPages",
    component: ProtectedPages,
    beforeEnter: RouterGuard.App,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
