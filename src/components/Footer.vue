<template>
  <section class="p-8">
    <footer class="footer p-6 bg-base-100 text-base-content">
      <div>
        <span class="footer-title text-secondary opacity-100">Services</span>
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </div>
      <div>
        <span class="footer-title text-secondary opacity-100">Company</span>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </div>
      <div>
        <span class="footer-title text-secondary opacity-100">Legal</span>
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
      </div>
    </footer>
    <footer class="footer px-6 py-4 border-t bg-base-100 text-base-content border-base-100">
      <div class="items-center grid-flow-col">
        <LogoButton class="h-8 w-8 mr-2" />
        <p>Movie Library © 2023</p>
      </div>
    </footer>
  </section>
</template>
<script setup>
import LogoButton from "./buttons/LogoButton.vue";
</script>
