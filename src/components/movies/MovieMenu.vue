<template>
  <ul
    tabindex="0"
    class="menu menu-compact dropdown-content mt-1 p-2 shadow bg-neutral rounded-box w-auto"
  >
    <!-- <li>
      <a class="justify-between hover:bg-neutral">
        <span class="badge badge-secondary w-20">Edit</span>
      </a>
    </li> -->
    <li>
      <a class="justify-between hover:bg-neutral" @click="emitDeleteMovie(movieId)">
        <span class="badge badge-error w-20">Delete</span>
      </a>
    </li>
  </ul>
</template>
<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  movieId: {
    type: String,
    default: "",
  },
});

const { movieId } = toRefs(props);

const emit = defineEmits(["deleteMovie"]);

const emitDeleteMovie = (movieId) => {
  emit("deleteMovie", movieId);
};
</script>
