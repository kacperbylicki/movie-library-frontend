<template>
  <div class="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:p-10 p-2 lg:max-h-96">
    <div class="card lg:card-side bg-base-100 shadow-xl">
      <figure class="p-6">
        <img :src="movie.posterUrl" class="rounded-lg" alt="Album" />
      </figure>
    </div>
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

    <div class="card bg-base-100 shadow-xl p-6 overflow-y-auto">
      <h5 class="card-title">Add Comment</h5>
      <textarea
        class="textarea textarea-secondary my-4 h-6 min-h-[8rem]"
        :placeholder="isAuthenticated ? `Write a comment` : `Login to write a comment`"
        :disabled="!isAuthenticated"
      ></textarea>
      <button class="btn btn-secondary gap-2">Add Comment</button>

      <h2 class="card-title mt-8">
        Comments <span class="badge badge-secondary badge-md">{{ movie.comments.length }}</span>
      </h2>

      <div
        v-for="(comment, index) in movie.comments"
        :key="index"
        class="card w-full bg-neutral p-4 mt-4"
      >
        <div class="badge badge-secondary">
          {{ comment.user.username }}
        </div>
        <div class="card-body px-1 py-4">
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

const { id: movieId } = route.params;
const { value: movies } = computed(() => store.getters.movies);
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const movie = movies.find((movie) => movie.uuid === movieId);

// const calculateAvgRating = (ratings) => {
//   console.log(ratings);
// };

const getInitials = (nameSurname) => {
  const [name, surname] = nameSurname.split(" ");

  return `${name.charAt(0)}${surname.charAt(0)}`;
};
</script>
