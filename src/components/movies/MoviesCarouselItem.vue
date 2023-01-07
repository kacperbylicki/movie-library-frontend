<template>
  <section class="carousel-item w-auto h-80 cursor-pointer">
    <img :src="posterUrl" class="rounded-box object-scale-down" />
  </section>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  posterUrl: String,
});
</script>
