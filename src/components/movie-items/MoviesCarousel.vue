<template>
  <section class="md:p-4">
    <div class="badge badge-secondary badge-lg p-4 m-2">{{ category }}</div>
    <div class="carousel carousel-center max-w-80 p-4 m-2 space-x-4 bg-neutral rounded-box">
      <MovieCarouselItem v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
  </section>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

import MovieCarouselItem from "./MovieCarouselItem.vue";

const props = defineProps({
  category: String,
  movies: Array,
});

const { category, movies } = toRefs(props);
</script>
