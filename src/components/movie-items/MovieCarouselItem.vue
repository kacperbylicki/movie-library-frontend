<template>
  <section class="carousel-item w-auto h-80 cursor-pointer" @click="redirectToMoviePage">
    <img :src="movie.posterUrl" class="rounded-box object-scale-down" />
  </section>
</template>

<script setup>
import { defineProps, toRefs } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  movie: Object,
});

const { movie: movieRef } = toRefs(props);

const redirectToMoviePage = async () => {
  await router.push({
    name: "Movie",
    params: {
      id: movieRef.value.uuid,
    },
  });
};
</script>
