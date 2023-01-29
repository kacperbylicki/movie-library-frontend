<template>
  <section class="grid grid-flow-row w-auto p-2 justify-center">
    <section class="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:p-10 p-2 lg:max-h-96">
      <MoviePoster :poster-url="movie.posterUrl" />
      <MovieInformations :movie="movie" />
      <MovieComments :movie="movie" />
    </section>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import MovieComments from "../components/movies/MovieComments.vue";
import MovieInformations from "../components/movies/MovieInformations.vue";
import MoviePoster from "../components/movies/MoviePoster.vue";

const route = useRoute();
const store = useStore();

const movie = ref(null);

const { id: movieId } = route.params;

const setMovie = (movieId) => {
  const { value: persistedMovie } = computed(() => store.getters.movie(movieId));
  movie.value = persistedMovie;
};

setMovie(movieId);

watch(
  () => route.params.id,
  async (movieId) => {
    setMovie(movieId);
  },
);
</script>
