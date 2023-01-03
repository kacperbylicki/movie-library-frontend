import Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";
import { authentication } from "./authentication";
import { createStore } from "vuex";
import { movies } from "./movies";

export const store = createStore({
  modules: {
    authentication,
    movies,
  },
  plugins: [
    createPersistedState({
      key: "authentication",
      paths: ["authentication"],
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, state) => Cookies.set(key, state, { expires: 7, secure: true }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
    createPersistedState({
      key: "movies",
      paths: ["movies"],
    }),
  ],
});
