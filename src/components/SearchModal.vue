<template>
  <input id="searchModal" ref="searchModal" type="checkbox" class="modal-toggle" />
  <label for="searchModal" class="modal cursor-pointer">
    <label class="modal-box relative max-w-[64rem]">
      <input
        :value="searchPrompt"
        type="text"
        placeholder="What are you looking for?"
        class="input input-bordered input-secondary w-full"
        :class="{ 'mb-4': searchPrompt }"
        @input="(event) => filterMovies(event)"
      />

      <MoviesCarousel
        v-if="searchPrompt && filteredMovies.length"
        :movies="filteredMovies"
        :padding="0"
        :margin="0"
        @movie-picked="resetPrompt"
      />
    </label>
  </label>
</template>
<script setup>
import MoviesCarousel from "./movies/MoviesCarousel.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const movies = computed(() => store.getters.movies);

const searchPrompt = ref(null);
const searchModal = ref(null);
const filteredMovies = ref([]);

const filterMovies = (event) => {
  searchPrompt.value = event.target.value;

  filteredMovies.value = movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchPrompt.value.toLowerCase()),
  );
};

const resetPrompt = () => {
  searchPrompt.value = null;
  searchModal.value.checked = false;
};
</script>
