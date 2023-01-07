<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-6">
      <h2 class="card-title">
        {{ movie.title }}
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
import { toRefs } from "vue";

const props = defineProps({
  movie: Object,
});

const { movie } = toRefs(props);

const getInitials = (nameSurname) => {
  const [name, surname] = nameSurname.split(" ");

  return `${name.charAt(0)}${surname.charAt(0)}`;
};
</script>
