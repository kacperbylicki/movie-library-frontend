<template>
  <section class="grid place-items-end">
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <LogoButton class="h-10 w-10" />
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <div class="flex-none">
          <ul class="menu menu-horizontal gap-4">
            <SearchButton />
            <CreateMovieButton v-if="isAdminOrModerator" />
            <LoginButton v-if="!isAuthenticated" />
            <LogoutButton v-if="isAuthenticated" />
          </ul>
        </div>
      </div>
    </div>
  </section>

  <SearchModal />
</template>

<script setup>
import CreateMovieButton from "./buttons/CreateMovieButton.vue";
import LoginButton from "./buttons/LoginButton.vue";
import LogoButton from "./buttons/LogoButton.vue";
import LogoutButton from "./buttons/LogoutButton.vue";
import SearchButton from "./buttons/SearchButton.vue";
import SearchModal from "./SearchModal.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const isAdminOrModerator = computed(() => store.getters.isAdminOrModerator);
</script>
