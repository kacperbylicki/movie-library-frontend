<template>
  <button class="btn btn-sm btn-square" @click="redirectToRentedMovies">
    <MovieTapeIcon class="w-4 h-4 fill-neutral-content" />
  </button>
</template>
<script setup>
import MovieTapeIcon from "../icons/MovieTapeIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToRentedMovies = () => {
  router.push("/rented-movies");
};
</script>
