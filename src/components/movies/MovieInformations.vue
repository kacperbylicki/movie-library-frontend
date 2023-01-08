<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-6">
      <ErrorAlert v-if="errorMessage" class="mx-auto w-full mt-2" :error-message="errorMessage" />

      <h2 class="card-title justify-between">
        {{ movie.title }}
        <div v-if="isAdmin" class="dropdown dropdown-end">
          <MenuButton />
          <MovieMenu :movie-id="movie.uuid" @delete-movie="handleDeleteMovie" />
        </div>
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

      <h5 class="text-xl font-bold dark:text-white mt-4">Producers</h5>
      <div class="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        <div v-for="(producer, index) in movie.producers" :key="index" class="carousel-item">
          <div class="tooltip tooltip-secondary tooltip-right" :data-tip="producer">
            <div class="avatar placeholder">
              <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>{{ getInitials(producer) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 class="text-xl font-bold dark:text-white mt-4">Directors</h5>
      <div class="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        <div v-for="(director, index) in movie.directors" :key="index" class="carousel-item">
          <div class="tooltip tooltip-secondary tooltip-right" :data-tip="director">
            <div class="avatar placeholder">
              <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>{{ getInitials(director) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 class="text-xl font-bold dark:text-white mt-4">Roles</h5>
      <div class="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        <div v-for="(role, index) in movie.roles" :key="index" class="carousel-item">
          <div
            class="tooltip tooltip-secondary tooltip-right"
            :data-tip="`${role.character} - ${role.actor}`"
          >
            <div class="avatar placeholder">
              <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>{{ getInitials(role.actor) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorAlert from "../ErrorAlert.vue";
import MenuButton from "../buttons/MenuButton.vue";
import MovieMenu from "./MovieMenu.vue";
import { computed, ref, toRefs } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isAdmin = computed(() => store.getters.isAdmin);

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

  return `${name.charAt(0)}${surname.charAt(0)}`;
};

const handleDeleteMovie = async (movieId) => {
  try {
    const { error } = await store.dispatch("deleteMovie", {
      movieId,
    });

    errorMessage.value = error?.title;

    resetErrorMessage();
  } catch (error) {
    errorMessage.value = error.message;

    resetErrorMessage();
  }
};
</script>
