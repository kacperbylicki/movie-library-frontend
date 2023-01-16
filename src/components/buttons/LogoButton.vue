<template>
  <a class="cursor-pointer" @click="redirectToMoviesList"><PlayIcon class="fill-secondary" /></a>
</template>

<script setup>
import PlayIcon from "../icons/PlayIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToMoviesList = () => {
  router.push("/");
};
</script>
