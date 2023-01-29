<template>
  <div class="carousel-item cursor-pointer">
    <div class="w-full flex justify-center items-center">
      <div class="relative z-0">
        <img
          :src="posterUrl"
          class="object-cover blur-lg w-[calc(100vw-5rem)] h-[500px]"
          :alt="`featured-movie-${kebabCase(title)}-bottom`"
        />
        <div class="absolute inset-0 flex justify-center items-center z-10">
          <img
            :src="posterUrl"
            class="object-cover h-[400px] rounded-box"
            :alt="`featured-movie-${kebabCase(title)}-top`"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import kebabCase from "lodash.kebabcase";
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  posterUrl: {
    type: String,
    default: "",
  },
});
</script>
