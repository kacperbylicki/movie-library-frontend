export const movies = {
  state: {
    movies: new Map(),
  },
  mutations: {
    setMovies: (state, movies) => {
      state.movies = movies;
    },
  },
  getters: {
    movies: (state) => state.movies,
  },
};
