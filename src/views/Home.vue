<template>
  <section class="grid grid-flow-row w-auto p-2 justify-center">
    <LoadingIndicator v-if="isLoading" />
    <FeaturedMoviesCarousel :movies="movies" />
    <MoviesCarousel
      v-for="[category, movies] in moviesByGenre"
      :key="category"
      :genre="category"
      :movies="movies"
      :padding="4"
    />
    <FooterSection />
  </section>
</template>
<script>
import FeaturedMoviesCarousel from "../components/movies/FeaturedMoviesCarousel.vue";
import FooterSection from "../components/FooterSection.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import MoviesCarousel from "../components/movies/MoviesCarousel.vue";
import { getMovies } from "../services/index.js";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    LoadingIndicator,
    MoviesCarousel,
    FeaturedMoviesCarousel,
    FooterSection,
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
    await this.fetchMovies();
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
        this.isLoading = true;

        const { movies, error } = await getMovies();

        if (!error) {
          this.setMovies(movies);
          this.moviesByGenre = this.groupMoviesByGenre(movies);

          setTimeout(() => {
            this.isLoading = false;
          }, 1000);

          return;
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);

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
