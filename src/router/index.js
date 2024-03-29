import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store";

const routes = [
  {
    path: "/create-movie",
    name: "Create Movie",
    component: () => import(/* webpackChunkName: "create-movie" */ "../views/CreateMovie.vue"),
    meta: {
      requiresAdminOrModeratorAccess: true,
      requiresAuthentication: true,
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
    path: "/favorites",
    name: "My Favorites",
    component: () => import(/* webpackChunkName: "my-favorites" */ "../views/MyFavorites.vue"),
    meta: {
      requiresCommonUserRole: true,
      requiresAuthentication: true,
    },
  },
  {
    path: "/rented-movies",
    name: "Rented Movies",
    component: () => import(/* webpackChunkName: "rented-movies" */ "../views/MyRentedMovies.vue"),
    meta: {
      requiresCommonUserRole: true,
      requiresAuthentication: true,
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
    store.getters.isAccountConfirmed
  ) {
    await router.push({ name: "Home" });
  }

  if (
    to.matched.some((record) => record?.meta?.requiresAdminOrModeratorAccess) &&
    !store.getters.isAdminOrModerator
  ) {
    await router.push({ name: "Home" });
  }

  if (
    to.matched.some((record) => record?.meta?.requiresCommonUserRole) &&
    store.getters.isAdminOrModerator
  ) {
    await router.push({ name: "Home" });
  }

  if (
    to.matched.some((record) => record?.meta?.requiresAuthentication) &&
    !store.getters.isAuthenticated
  ) {
    await router.push({ name: "Home" });
  }
});
