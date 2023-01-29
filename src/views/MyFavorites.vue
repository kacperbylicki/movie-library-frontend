<template>
  <section class="grid grid-cols-1 lg:grid-cols-6 gap-10 w-full md:px-20 px-8">
    <h1 class="flex font-bold leading-tight text-2xl mt-6 mb-2 items-center">
      My Favorites
      <span class="badge badge-secondary badge-md ml-2">{{ favoriteMovies.length }}</span>
    </h1>
  </section>
  <TransitionGroup
    name="favorite-movies-list"
    tag="section"
    class="grid grid-cols-1 md:grid-cols-6 gap-10 mt-10 md:px-20 px-8"
  >
    <div v-for="(movie, index) in favoriteMovies" :key="index" class="indicator">
      <div class="indicator-item indicator-top">
        <FavoriteButton :movie-id="movie.uuid" @toggle-favorite="handleToggleFavoriteMovie" />
      </div>
      <MoviesCarouselItem :poster-url="movie.posterUrl" @click="redirectToMoviePage(movie)" />
    </div>
  </TransitionGroup>
</template>
<script setup>
import FavoriteButton from "../components/buttons/FavoriteButton.vue";
import MoviesCarouselItem from "../components/movies/MoviesCarouselItem.vue";
import { computed, defineEmits, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const errorMessage = ref(null);
const favoriteMovies = ref([]);

const movies = computed(() => store.getters.movies);
const favoritedMovies = computed(() => store.getters.favoriteMovies);

const getFavoriteMovies = (favoritedMoviesList) => {
  return favoritedMoviesList
    .filter((favMovie) => favMovie.isFavorite === true)
    .map((favMovie) => movies.value.find((movie) => movie.uuid === favMovie.movieId));
};

favoriteMovies.value = getFavoriteMovies(favoritedMovies.value);

const emit = defineEmits(["moviePicked"]);

const resetErrorMessage = () => {
  setTimeout(() => {
    errorMessage.value = null;
  }, 3000);
};

const redirectToMoviePage = async (movie) => {
  await router.push(`/movie/${movie.uuid}`);
  emit("moviePicked");
};

const handleToggleFavoriteMovie = async ({ movieId, isFavorite }) => {
  try {
    const { error } = await store.dispatch("toggleFavoriteMovie", {
      movieId: movieId,
      isFavorite,
    });

    errorMessage.value = error?.title;

    resetErrorMessage();
  } catch (error) {
    errorMessage.value = error.message;

    resetErrorMessage();
  }
};

watch(
  () => store.getters.favoriteMovies,
  (newFavoriteMovies) => {
    favoriteMovies.value = getFavoriteMovies(newFavoriteMovies);
  },
  { deep: true, immediate: true },
);
</script>
<style scoped>
.favorite-movies-list-leave-active {
  animation: zoom-out 0.25s ease-out forwards;
}

@keyframes zoom-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  30% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}
</style>
