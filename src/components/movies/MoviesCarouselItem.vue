<template>
  <section class="carousel-item w-auto h-80 cursor-pointer">
    <img :src="posterUrl" class="rounded-box object-scale-down shadow-md" />
  </section>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  posterUrl: {
    type: String,
    default: "",
  },
});
</script>
