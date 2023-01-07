<template>
  <LoadingIndicator v-if="isLoading" />
  <MoviesCarousel
    v-for="[category, movies] in moviesByGenre"
    :key="category"
    :title="category"
    :movies="movies"
    :padding="4"
  />
</template>
<script>
import LoadingIndicator from "../components/LoadingIndicator.vue";
import MoviesCarousel from "../components/movies/MoviesCarousel.vue";
import { getMovies } from "../services/index.js";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    LoadingIndicator,
    MoviesCarousel,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      moviesByGenre: [],
    };
  },
  computed: {
    ...mapGetters(["movies"]),
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchMovies();
    this.isLoading = false;
  },
  methods: {
    ...mapMutations(["setMovies"]),
    groupMoviesByGenre(movies) {
      const genreMap = new Map();

      for (const movie of movies) {
        for (const genre of movie.genre) {
          if (!genreMap.has(genre)) {
            genreMap.set(genre, [movie]);
          } else {
            genreMap.get(genre).push(movie);
          }
        }
      }

      return genreMap;
    },
    async fetchMovies() {
      try {
        const { movies, error } = await getMovies();

        if (!error) {
          this.setMovies(movies);
          this.moviesByGenre = this.groupMoviesByGenre(movies);

          return;
        }

        this.isLoading = false;
        this.errorMessage = error?.title;
        // If connection refused, then uses cached movies
        this.moviesByGenre = this.groupMoviesByGenre(this.movies);
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.title;
      }
    },
  },
};
</script>
