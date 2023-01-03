<template>
  <button class="btn gap-2 btn-sm" @click="handleLogout">
    <LogoutIcon class="w-4 h-4 fill-neutral-content" />
    Logout
  </button>
</template>

<script setup>
import LogoutIcon from "../icons/LogoutIcon.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    const { error } = await store.dispatch("logout");

    if (!error) {
      await router.push("/login");
    }
  } catch (error) {
    console.log(error.title);
  }
};
</script>
