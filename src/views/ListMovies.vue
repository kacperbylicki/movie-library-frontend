<template>
  <LoadingIndicator v-if="isLoading" />
  <section v-if="movies?.length > 0" class="grid place-items-center">
    <div class="overflow-x-auto">
      <table class="table table-fixed w-full">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Release Year</th>
            <th>Genres</th>
            <th>Directors</th>
            <th>Producers</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movie, index) in movies" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ movie.title }}</td>
            <td>{{ movie.releaseYear }}</td>
            <td>{{ movie.genre }}</td>
            <td>{{ movie.directors }}</td>
            <td>{{ movie.producers }}</td>
            <td>{{ movie.roles }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>
import LoadingIndicator from "../components/LoadingIndicator.vue";
import { getMovies } from "../services/index.js";

export default {
  components: {
    LoadingIndicator,
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
    async fetchMovies() {
      try {
        const { movies, error } = await getMovies();
        console.log(movies);
        if (!error) {
          this.movies = movies;
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
