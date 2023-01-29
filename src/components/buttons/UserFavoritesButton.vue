<template>
  <button class="btn btn-sm btn-square" @click="redirectToFavorites">
    <StarIcon class="w-4 h-4 fill-neutral-content" />
  </button>
</template>
<script setup>
import StarIcon from "../icons/StarIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToFavorites = () => {
  router.push("/favorites");
};
</script>
