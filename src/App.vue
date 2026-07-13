<script setup lang="ts">
import { RouterView } from "vue-router";
import Snowfall from "@/components/snowfallEffect.vue";
</script>

<template>
  <Snowfall />
  <div class="app-content">
    <RouterView />
  </div>
</template>

<style>
html,
body {
  height: 100%;
  background: rgb(27, 163, 115);
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}

#app {
  min-height: 100vh;
  background: rgb(27, 163, 115);
}

.app-content {
  position: relative;
  z-index: 1;
}
</style>
