<template>
  <button class="btn gap-2 btn-sm" @click="handleLogin">
    <UserIcon class="w-4 h-4 fill-neutral-content" />
    Login
  </button>
</template>

<script setup>
import UserIcon from "../icons/UserIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogin = () => {
  router.push("/login");
};
</script>
