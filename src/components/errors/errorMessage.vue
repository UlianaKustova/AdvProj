<template>
  <VSnackbar
    v-model="isVisible"
    :timeout="timeout"
    color="red"
    location="top end"
    variant="flat"
    class="error-snackbar"
  >
    <span class="error-message-text error-message-text" color="white">{{ modelValue }}</span>

    <template #actions>
      <VBtn
        variant="text"
        icon="mdi-close"
        color="white"
        @click="isVisible = false"
      />
    </template>
  </VSnackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | null
  timeout?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: null): void
}>()

const isVisible = computed({
  get: () => !!props.modelValue,
  set: (val) => {
    if (!val) {
      emit('update:modelValue', null)
    }
  }
})
</script>

<style scoped>
@media (max-width: 360px) {
  .error-snackbar :deep(.v-snackbar__wrapper) {
    max-width: calc(100vw - 16px) !important;
    margin: 8px !important;
  }
  .error-message-text {
    font-size: 0.9rem !important;
    line-height: 1.3;
    word-break: break-word;
  }
}
</style>