<template>
  <div class="card bg-base-100 shadow-xl overflow-y-auto">
    <div class="card-body p-6">
      <ErrorAlert v-if="errorMessage" class="mx-auto w-full mt-2" :error-message="errorMessage" />

      <h2 class="card-title justify-between">
        {{ movie.title }}
        <div v-if="isAdmin" class="dropdown dropdown-end">
          <MenuButton />
          <MovieMenu :movie-id="movie.uuid" @delete-movie="handleDeleteMovie" />
        </div>
        <FavoriteButton
          v-if="!isAdmin && isAuthenticated"
          :movie-id="movie.uuid"
          @toggle-favorite="handleToggleFavoriteMovie"
        />
        <!-- <span class="badge badge-accent badge-md">{{ calculateAvgRating(movie.ratings) }}</span> -->
      </h2>

      <section class="space-x-2 space-y-2">
        <div class="badge badge-secondary badge-md">{{ movie.releaseYear }}</div>
        <div
          v-for="(genre, index) in movie.genre"
          :key="index"
          class="badge badge-primary badge-md"
        >
          {{ genre }}
        </div>
      </section>

      <h5 class="text-xl font-bold dark:text-white mt-4">Plot</h5>
      <section class="p-2 text-justify text-sm">{{ movie.plot }}</section>

      <h5 class="text-xl font-bold dark:text-white mt-4">Producers</h5>
      <section v-for="(producer, index) in movie.producers" :key="index" class="p-2">
        <div v-if="producer.image" class="avatar items-center">
          <div class="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img :src="producer.image" />
          </div>
          <p class="ml-4">{{ producer.fullName }}</p>
        </div>
        <div v-else class="avatar placeholder items-center">
          <div
            class="bg-neutral-focus text-neutral-content rounded-full w-12 ring ring-secondary ring-offset-base-100 ring-offset-2"
          >
            <span>{{ getInitials(producer?.fullName ?? producer) }}</span>
          </div>
          <p class="ml-4">{{ producer?.fullName ?? producer }}</p>
        </div>
      </section>

      <h5 class="text-xl font-bold dark:text-white mt-4">Directors</h5>
      <section v-for="(director, index) in movie.directors" :key="index" class="p-2">
        <div v-if="director.image" class="avatar items-center">
          <div class="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img :src="director.image" />
          </div>
          <p class="ml-4">{{ director.fullName }}</p>
        </div>
        <div v-else class="avatar placeholder items-center">
          <div
            class="bg-neutral-focus text-neutral-content rounded-full w-12 ring ring-secondary ring-offset-base-100 ring-offset-2"
          >
            <span>{{ getInitials(director?.fullName ?? director) }}</span>
          </div>
          <p class="ml-4">{{ director?.fullName ?? director }}</p>
        </div>
      </section>

      <h5 class="text-xl font-bold dark:text-white mt-4">Roles</h5>
      <section v-for="(role, index) in movie.roles" :key="index" class="p-2 mb-4">
        <div v-if="role.actor.image" class="avatar items-center">
          <div class="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img :src="role.actor.image" />
          </div>
          <p class="ml-4">
            {{ role.actor.fullName }} / <span class="font-semibold">{{ role.character }}</span>
          </p>
        </div>
        <div v-else class="avatar placeholder items-center">
          <div
            class="bg-neutral-focus text-neutral-content rounded-full w-12 ring ring-secondary ring-offset-base-100 ring-offset-2"
          >
            <span>{{ getInitials(role.actor?.fullName ?? role.actor) }}</span>
          </div>
          <span>
            <p class="ml-4">
              {{ role.actor?.fullName ?? role.actor }} /
              <span class="font-semibold">{{ role.character }}</span>
            </p>
          </span>
        </div>
      </section>
      <RentMovieButton v-if="!isAdmin && isAuthenticated" class="mt-auto" />
    </div>
  </div>

  <RentMovieModal />
</template>

<script setup>
import ErrorAlert from "../ErrorAlert.vue";
import FavoriteButton from "../buttons/FavoriteButton.vue";
import MenuButton from "../buttons/MenuButton.vue";
import MovieMenu from "./MovieMenu.vue";
import RentMovieButton from "../buttons/RentMovieButton.vue";
import RentMovieModal from "./RentMovieModal.vue";
import { computed, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isAdmin = computed(() => store.getters.isAdmin);
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const props = defineProps({
  movie: {
    type: Object,
    default: () => {},
  },
});

const { movie } = toRefs(props);

const errorMessage = ref(null);

const resetErrorMessage = () => {
  setTimeout(() => {
    errorMessage.value = null;
  }, 3000);
};

const getInitials = (nameSurname) => {
  const [name, surname] = nameSurname.split(" ");

  if (!surname) {
    return `${name?.charAt(0)}`;
  }

  return `${name?.charAt(0)}${surname?.charAt(0)}`;
};

const handleDeleteMovie = async (movieId) => {
  try {
    const { error } = await store.dispatch("deleteMovie", {
      movieId,
    });

    if (!error) {
      router.push("/");
    }

    errorMessage.value = error?.title;
    resetErrorMessage();
  } catch (error) {
    errorMessage.value = error.message;
    resetErrorMessage();
  }
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
</script>
