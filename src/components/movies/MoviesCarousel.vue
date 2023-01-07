<template>
  <section :class="`md:p-${padding}`">
    <div v-if="title" class="badge badge-secondary badge-lg p-4" :class="`m-${margin}`">
      {{ title }}
    </div>
    <div
      class="carousel carousel-center max-w-80 p-4 space-x-4 bg-neutral rounded-box"
      :class="`m-${margin}`"
    >
      <MoviesCarouselItem
        v-for="(movie, index) in movies"
        :key="index"
        :poster-url="movie.posterUrl"
        @click="redirectToMoviePage(movie)"
      />
    </div>
  </section>
</template>

<script setup>
import MoviesCarouselItem from "./MoviesCarouselItem.vue";
import { defineEmits, defineProps, toRefs } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["moviePicked"]);
const props = defineProps({
  title: String,
  movies: Array,
  padding: Number,
  margin: Number,
});

const { title, movies, padding, margin } = toRefs(props);

const redirectToMoviePage = async (movie) => {
  await router.push(`/movie/${movie.uuid}`);
  emit("moviePicked");
};
</script>
