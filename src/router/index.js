import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store";

const routes = [
  {
    path: "/create-movie",
    name: "Create Movie",
    component: () => import(/* webpackChunkName: "create-movie" */ "../views/CreateMovie.vue"),
    meta: {
      requiresAdminAccess: true,
    },
  },
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "movies" */ "../views/Home.vue"),
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: () => import(/* webpackChunkName: "movie" */ "../views/Movie.vue"),
    params: true,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/confirm-account",
    name: "Confirm Account",
    component: () =>
      import(/* webpackChunkName: "confirm-account" */ "../views/ConfirmAccount.vue"),
    meta: {
      requiresNotConfirmedAccount: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (
    to.matched.some((record) => record?.meta?.requiresNotConfirmedAccount) &&
    store.getters.isConfirmedAccount
  ) {
    await router.push({ name: "Home" });
  }

  if (to.matched.some((record) => record?.meta?.requiresAdminAccess) && !store.getters.isAdmin) {
    await router.push({ name: "Home" });
  }
});
