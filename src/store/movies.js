import { createComment, deleteComment, deleteMovie } from "../services";

export const movies = {
  state: {
    movies: [],
  },
  actions: {
    deleteMovie: async ({ commit }, { movieId }) => {
      const { error } = await deleteMovie(movieId);

      if (!error) {
        commit("pullMovie", { movieId });
      }

      return {
        error,
      };
    },
    createComment: async ({ commit }, { movieId, payload }) => {
      const { comment, error } = await createComment(movieId, payload);

      if (!error) {
        commit("pushComment", { movieId, comment });
      }

      return {
        comment,
        error,
      };
    },
    deleteComment: async ({ commit }, { movieId, commentId }) => {
      const { error } = await deleteComment(movieId, commentId);

      if (!error) {
        commit("pullComment", { movieId, commentId });
      }

      return {
        error,
      };
    },
  },
  mutations: {
    setMovies: (state, movies) => {
      state.movies = movies;
    },
    pullMovie: (state, { movieId }) => {
      const updatedMovies = movies.filter((movie) => movie.uuid !== movieId);

      state.movies = updatedMovies;
    },
    pushComment: (state, { movieId, comment }) => {
      const movie = state.movies.find((movie) => movie.uuid === movieId);

      movie.comments.push(comment);

      const updatedMovies = state.movies.map((m) => (m.uuid === movieId ? movie : m));

      state.movies = updatedMovies;
    },
    pullComment: (state, { movieId, commentId }) => {
      const movie = state.movies.find((movie) => movie.uuid === movieId);

      const updatedComments = movie.comments.filter((comment) => comment.uuid !== commentId);

      movie.comments = updatedComments;

      const updatedMovies = state.movies.map((m) => (m.uuid === movieId ? movie : m));

      state.movies = updatedMovies;
    },
  },
  getters: {
    movies: (state) => state.movies,
    movie: (state) => (uuid) => state.movies.find((movie) => movie.uuid === uuid),
    movieComments: (state) => (uuid) => state.movies.find((movie) => movie.uuid === uuid).comments,
    isCommentOwner: (state, _, rootState) => (movieId, commentId) => {
      const { authentication } = rootState;

      const movie = state.movies.find((movie) => movie.uuid === movieId);
      const comment = movie.comments.find((comment) => comment.uuid === commentId);

      return comment?.user?.uuid === authentication?.user?.uuid;
    },
  },
};
