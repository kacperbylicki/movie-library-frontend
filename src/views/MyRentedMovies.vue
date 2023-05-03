<template>
  <section class="grid grid-cols-1 lg:grid-cols-6 gap-10 w-full md:px-20 px-8">
    <h1 class="flex font-bold leading-tight text-2xl mt-6 mb-2 items-center">
      My Rentals
      <span class="badge badge-secondary badge-md ml-2">{{ rentedMovies.length }}</span>
    </h1>
  </section>
  <TransitionGroup
    name="favorite-movies-list"
    tag="section"
    class="grid grid-cols-1 md:grid-cols-6 gap-10 mt-10 md:px-20 px-8"
  >
    <div v-for="rentedMovie in rentedMovies" :key="rentedMovie.movie.uuid" class="indicator">
      <MoviesCarouselItem
        :poster-url="rentedMovie.movie.posterUrl"
        @click="getMovieStream(rentedMovie.movie.uuid)"
      />
    </div>
  </TransitionGroup>
  <input id="movieModal" type="checkbox" class="modal-toggle" v-model="movieModal" />
  <label for="movieModal" class="modal cursor-pointer">
    <label class="modal-box relative max-w-[64rem] bg-base-300">
      <video :src="movieUrl" class="w-full h-full" controls></video>
    </label>
  </label>
</template>

<script setup>
import MoviesCarouselItem from "../components/movies/MoviesCarouselItem.vue";
import { getUserRentedMovies, getVideoStream } from "../services";
import { onMounted, ref, watch } from "vue";

const rentedMovies = ref([]);
const movieModal = ref(false);
const movieUrl = ref(null);

const openMovieModal = () => {
  movieModal.value = true;
};

const getMovieStream = async (movieId) => {
  openMovieModal();

  const { streamUrl } = await getVideoStream(movieId);

  movieUrl.value = streamUrl;
}

const resetMoviePlayback = () => {
  if (movieUrl.value) {
    movieUrl.value = null;
  }
};

const fetchRentedMovies = async () => {
  try {
    const { rentedMovies: movies, error } = await getUserRentedMovies();
    if (!error) {
      rentedMovies.value = movies;
    } else {
      console.error("Error fetching rented movies:", error);
    }
  } catch (error) {
    console.error("Error fetching rented movies:", error.message);
  }
};

watch(
  () => movieModal?.value,
  async () => {
    resetMoviePlayback();
    await fetchRentedMovies();
  },
  { immediate: true },
);

onMounted(async () => {
  await fetchRentedMovies();
});
</script>
