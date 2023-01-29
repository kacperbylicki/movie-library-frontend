<template>
  <section class="p-8">
    <footer class="footer p-6 bg-base-100 text-base-content">
      <div>
        <span class="footer-title text-secondary opacity-100">Platforms</span>
        <a class="link link-hover" href="https://www.netflix.com" target="_blank">Netflix</a>
        <a class="link link-hover" href="https://www.hbomax.com/" target="_blank">HBO Max</a>
        <a class="link link-hover" href="https://www.disneyplus.com" target="_blank">Disney+</a>
      </div>
      <div>
        <span class="footer-title text-secondary opacity-100">Social Media</span>
        <a class="link link-hover">Instagram</a>
        <a class="link link-hover">Facebook</a>
        <a class="link link-hover">Twitter</a>
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
