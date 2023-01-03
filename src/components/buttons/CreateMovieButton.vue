<template>
  <button class="btn btn-secondary btn-square btn-sm" @click="redirectToMovieCreation">
    <PlusSignIcon class="h-4 w-4 fill-base-100" />
  </button>
</template>

<script setup>
import PlusSignIcon from "../icons/PlusSignIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToMovieCreation = () => {
  router.push("/create-movie");
};
</script>
