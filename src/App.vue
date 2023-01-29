<template>
  <section class="p-2">
    <NavBar />
    <section v-if="isLoading">
      <LoadingIndicator />
    </section>
    <section v-else>
      <router-view />
    </section>
  </section>
</template>

<script setup>
import LoadingIndicator from "./components/LoadingIndicator.vue";
import NavBar from "./components/NavBar.vue";
</script>
