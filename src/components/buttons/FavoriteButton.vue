<template>
  <button class="btn btn-link p-0" @click="emitToggleFavorite(movieId, !isFavorite)">
    <StarIcon v-if="isFavorite" class="w-6 h-6 fill-accent" />
    <StarIconOutline v-else class="w-6 h-6 fill-accent" />
  </button>
</template>
<script setup>
import StarIcon from "../icons/StarIcon.vue";
import StarIconOutline from "../icons/StarIconOutline.vue";

import { defineProps, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  movieId: {
    type: String,
    default: "",
  },
});

const { movieId } = toRefs(props);

const isFavorite = ref(store.getters.isMovieFavorite(movieId));

const emit = defineEmits(["toggleFavorite"]);

const emitToggleFavorite = (movieId, isFavorite) => {
  emit("toggleFavorite", { movieId, isFavorite });
};

watch(
  () => store.getters.favoriteMovies,
  (newFavoriteMovies) => {
    const currentMovie = newFavoriteMovies.find((movie) => movie.movieId === movieId.value);
    isFavorite.value = currentMovie?.isFavorite ?? false;
  },
  { deep: true, immediate: true },
);
</script>
