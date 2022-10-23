<template>
  <section class="grid place-items-end">
    <div class="navbar bg-base-100">
      <div class="navbar-start"></div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <div class="flex-none">
          <ul class="menu menu-horizontal p-0">
            <li><a @click="redirectToMoviesList">Movies List</a></li>
            <li><a @click="redirectToMovieCreation">Create Movie</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    redirectToMovieCreation() {
      this.$router.push("/create-movie");
    },
    redirectToMoviesList() {
      this.$router.push("/");
    },
  },
};
</script>
