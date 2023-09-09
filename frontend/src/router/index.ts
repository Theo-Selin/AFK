import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/main/HomeView.vue";
import RegisterView from "../views/login/RegisterView.vue";
import LoginView from "../views/login/LoginView.vue";
import axios from "axios";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    // Check if user is authenticated
    axios
      .get("/api/auth/protected")
      .then(() => next())
      .catch(() => {
        next("/login");
      });
  }
});

export default router;
