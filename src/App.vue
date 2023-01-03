<template>
  <section class="p-2">
    <NavBar />
    <section v-if="isLoading">
      <LoadingIndicator />
    </section>
    <section v-else class="grid justify-center grid-flow-row w-auto p-2">
      <router-view />
    </section>
  </section>
</template>

<script setup>
import LoadingIndicator from "./components/LoadingIndicator.vue";
import NavBar from "./components/NavBar.vue";
</script>
