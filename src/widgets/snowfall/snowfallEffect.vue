<script setup lang="ts">
import { ref, onMounted } from "vue";

const flakeRefs = ref<HTMLElement[]>([]);

function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndFloat(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(1));
}

onMounted(() => {
  flakeRefs.value.forEach((flake) => {
    flake.style.fontSize = getRndFloat(0.7, 1.5) + "em";
    flake.style.animationDuration = getRndInteger(20, 30) + "s";
    flake.style.animationDelay = getRndInteger(-1, 15) + "s";
  });
});
</script>

<template>
  <div class="snow" aria-hidden="true">
    <div v-for="i in 50" :key="i" class="snow__flake" ref="flakeRefs">﹡</div>
  </div>
</template>

<style scoped>
.snow {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.snow__flake {
  position: relative;
  top: -1.5em;
  color: #c1dcec;
  animation-name: snowfall;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform;
}

@keyframes snowfall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(100vh + 2em));
  }
}
</style>
