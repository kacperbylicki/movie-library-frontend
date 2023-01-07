<template>
  <section :class="`grid p-${padding}`">
    <div v-if="title" class="m-2 badge badge-secondary badge-lg p-4">
      {{ title }}
    </div>
    <div class="m-2 carousel carousel-center max-w-80 p-4 space-x-4 bg-neutral rounded-box">
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
  title: {
    type: String,
    default: "",
  },
  movies: {
    type: Array,
    default: () => [],
  },
  padding: {
    type: Number,
    default: 4,
  },
});

const { title, movies, padding } = toRefs(props);

const redirectToMoviePage = async (movie) => {
  await router.push(`/movie/${movie.uuid}`);
  emit("moviePicked");
};
</script>
