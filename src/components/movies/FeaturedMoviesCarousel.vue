<template>
  <section class="p-6">
    <div class="my-4 badge badge-secondary badge-lg p-4">Newest movies</div>
    <div class="carousel rounded-box">
      <FeaturedMoviesCarouselItem
        v-for="(movie, index) in featuredMovies"
        :key="index"
        :title="movie.title"
        :poster-url="movie.posterUrl"
      />
    </div>
  </section>
</template>
<script setup>
import FeaturedMoviesCarouselItem from "./FeaturedMoviesCarouselItem.vue";
import { defineProps, toRefs } from "vue";

const props = defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
});

const { movies } = toRefs(props);

const featuredMovies = movies.value
  .sort((a, b) => (a.releaseYear < b.releaseYear ? 1 : -1))
  .slice(0, 5);
</script>
