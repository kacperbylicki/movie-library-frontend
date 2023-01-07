<template>
  <div class="card lg:card-side bg-base-100 shadow-xl">
    <figure class="p-6">
      <img :src="props.posterUrl" class="rounded-lg" alt="Album" />
    </figure>
  </div>
</template>

<script setup>
const props = defineProps({
  posterUrl: String,
});
</script>
