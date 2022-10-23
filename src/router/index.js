import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/create-movie",
    name: "Create Movie",
    component: () => import(/* webpackChunkName: "create-movie" */ "../views/CreateMovie.vue"),
  },
  {
    path: "/",
    name: "List Movies",
    component: () => import(/* webpackChunkName: "list-movies" */ "../views/ListMovies.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
