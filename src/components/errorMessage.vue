<template>
  <VSnackbar
    v-model="isVisible"
    :timeout="timeout"
    color="red"
    location="top end"
    variant="flat"
    class="error-snackbar"
  >
    <span class="error-message-text text-h6" color="white">{{ modelValue }}</span>

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