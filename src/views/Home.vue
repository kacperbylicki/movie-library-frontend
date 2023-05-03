<template>
  <section class="grid grid-flow-row w-auto p-2 justify-center">
    <LoadingIndicator v-if="isLoading" />
    <FeaturedMoviesCarousel :movies="movies" />
    <MoviesCarousel
      v-for="[category, groupedMovies] in moviesByGenre"
      :key="category"
      :genre="category"
      :movies="groupedMovies"
      :padding="4"
    />
  </section>
</template>
<script setup>
import FeaturedMoviesCarousel from "../components/movies/FeaturedMoviesCarousel.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import MoviesCarousel from "../components/movies/MoviesCarousel.vue";
import { computed, onMounted, ref } from "vue";
import { getMovies } from "../services/index.js";
import { useStore } from "vuex";

const store = useStore();
const isLoading = ref(false);
const errorMessage = ref(null);
const moviesByGenre = ref([]);

const movies = computed(() => store.getters.movies);

const setMovies = (movies) => store.commit("setMovies", movies);

const groupMoviesByGenre = (movies) => {
  const genreMap = new Map();

  for (const movie of movies) {
    for (const genre of movie.genre) {
      if (!genreMap.has(genre)) {
        genreMap.set(genre, [movie]);
      } else {
        genreMap.get(genre).push(movie);
      }
    }
  }

  return genreMap;
};

const fetchMovies = async () => {
  try {
    isLoading.value = true;

    const { movies, error } = await getMovies();

    if (!error) {
      setMovies(movies);
      moviesByGenre.value = groupMoviesByGenre(movies);

      setTimeout(() => {
        isLoading.value = false;
      }, 1000);

      return;
    }

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);

    errorMessage.value = error?.title;
    // If connection refused, then uses cached movies
    moviesByGenre.value = groupMoviesByGenre(movies.value);
  } catch (error) {
    isLoading.value = false;
    errorMessage.value = error?.title;
  }
};

onMounted(async () => {
  await fetchMovies();
});
</script>
