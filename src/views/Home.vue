<template>
  <LoadingIndicator v-if="isLoading" />
  <!--  <section v-if="movies?.length > 0" class="grid place-items-center">-->
  <!--    <div class="overflow-x-auto">-->
  <!--      <table class="table table-fixed w-full">-->
  <!--        <thead>-->
  <!--          <tr>-->
  <!--            <th></th>-->
  <!--            <th>Title</th>-->
  <!--            <th>Release Year</th>-->
  <!--            <th>Genres</th>-->
  <!--            <th>Directors</th>-->
  <!--            <th>Producers</th>-->
  <!--            <th>Roles</th>-->
  <!--          </tr>-->
  <!--        </thead>-->
  <!--        <tbody>-->
  <!--          <tr v-for="(movie, index) in movies" :key="index">-->
  <!--            <th>{{ index + 1 }}</th>-->
  <!--            <td>{{ movie.title }}</td>-->
  <!--            <td>{{ movie.releaseYear }}</td>-->
  <!--            <td>{{ movie.genre }}</td>-->
  <!--            <td>{{ movie.directors }}</td>-->
  <!--            <td>{{ movie.producers }}</td>-->
  <!--            <td>{{ movie.roles }}</td>-->
  <!--          </tr>-->
  <!--        </tbody>-->
  <!--      </table>-->
  <!--    </div>-->
  <MoviesCarousel
    v-for="[category, movies] in this.movies"
    :key="category"
    :category="category"
    :movies="movies"
  />
</template>
<script>
import LoadingIndicator from "../components/LoadingIndicator.vue";
import MoviesCarousel from "../components/movie-items/MoviesCarousel.vue";
import { getMovies } from "../services/index.js";
import { mapMutations } from "vuex";

export default {
  components: {
    LoadingIndicator,
    MoviesCarousel,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      movies: [],
    };
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
          this.movies = this.groupMoviesByGenre(movies);
        }

        this.isLoading = false;
        this.errorMessage = error?.message;
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.message;
      }
    },
  },
};
</script>
