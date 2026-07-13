<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  giftName: string
  day: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const dialogModel = computed({
  get: () => props.isOpen,
  set: (value) => {
    if (!value) {
      emit('close')
    }
  }
})
</script>

<template>
  <VDialog v-model="dialogModel" max-width="500">
    <template v-slot:default="{ isActive }">
      <VCard class="rounded-card">
          <VBtn
            class="close-btn"
            icon="mdi-close"
            color="grey-darken-3"
            variant="text"
            @click="isActive.value = false"
          ></VBtn>
        
        <VCardText class="text-center pb-6">
          <p class="modal-title mb-1">Поздравляю!</p>
          <p class="text-body-1 mt-0 mb-4">
            Вы открыли <strong>день {{ day }}</strong>!
          </p>



          <div class="modal-gift pa-4 mb-4">
            {{ giftName }}
          </div>
          <p class="text-body-2 text-medium-emphasis">Приятного дня!</p>
        </VCardText>
      </VCard>
    </template>
  </VDialog>
</template>


<style scoped>
.rounded-card {
  border-radius: 24px !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
}

.modal-title {
  font-size: 32px;
  font-weight: 500;
  color: #1b1b1b;
}

.close-btn {
  position: absolute !important;
  top: 8px;
  right: 8px;
}

.modal-gift {
  background: #f0f8f0;
  border: 2px dashed #4CAF50;
  border-radius: 16px;
  font-size: 24px;
  color: #2e7d32;
  font-weight: bold;
  word-break: break-word;
}

@media (max-width: 360px) {
  .rounded-card {
    border-radius: 32px !important;
    padding: 6px !important;
  }

  .modal-title {
    font-size: 1.5rem !important;
  }

  .modal-gift {
    font-size: 1.1rem !important;
    padding: 16px 12px !important;
  }

  .text-body-1 {
    font-size: 1rem !important;
  }

  .text-body-2 {
    font-size: 0.9rem !important;
  }

  .close-btn {
    top: 14px !important;
    right: 14px !important;
    font-size: 36px !important;
  }

  .v-card-text {
    padding: 32px 18px 24px !important;
  }

  :deep(.v-overlay__content) {
  margin: 12px !important;
  max-width: calc(100vw - 24px) !important;
}
}
</style>