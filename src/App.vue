<template>
  <section class="p-2">
    <NavBar />
    <section class="grid justify-center grid-flow-row w-auto p-2">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
