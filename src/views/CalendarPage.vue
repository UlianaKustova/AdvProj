<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GiftModal from '@/components/giftModal.vue'
import { useAdventCalendar } from '@/hooks/useAdventCalendar'
import ErrorMessage from '@/components/errorMessage.vue'

const router = useRouter()

const {
  gifts,
  isModalOpen,
  selectedGift,
  openGift,
  loadState,
  errorMessage,
  clearError
} = useAdventCalendar()

const closeModal = () => {
  isModalOpen.value = false
  clearError()
}

const goBack = () => {
  router.push('/')
}

const goToRules = () => {
  router.push({ path: '/rules', query: { from: 'calendar' } })
}

function getSizeClass(day: number) {
  if (day === 1) return 'size-big'
  if (day % 7 === 0) return 'size-big'
  if (day % 5 === 0) return 'size-wide'
  if (day % 3 === 0) return 'size-tall'
  return 'size-small'
}

onMounted(() => {
  loadState()
})
</script>

<template>
  <VContainer fluid class="calendar-page pa-4">
    <VRow class="header mb-6">
      <VCol cols="auto">
        <VBtn
          variant="text"
          color="white"
          class="back-btn"
          @click="goBack"
        >
          Назад
        </VBtn>
      </VCol>
      <VCol class="text-center flex-grow-1">
        <h1>Адвент-календарь</h1>
      </VCol>
      <VCol cols="auto">
        <VBtn
          variant="text"
          color="white"
          class="back-btn"
          @click="goToRules"
        >
          Правила
        </VBtn>
      </VCol>
    </VRow>
    
    <ErrorMessage v-model="errorMessage" />

    <div class="calendar-grid">
      <VCard
        v-for="gift in gifts"
        :key="gift.day"
        :class="[
          'gift-card',
          getSizeClass(gift.day),
          { opened: gift.isOpen, closed: !gift.isOpen }
        ]"
        :elevation="gift.isOpen ? 4 : 2"
        :variant="gift.isOpen ? 'elevated' : 'flat'"
        :color="gift.isOpen ? 'yellow-lighten-5' : 'transparent'"
        @click="openGift(gift.day)"
      >
        <template v-if="!gift.isOpen">
          <span class="day-number">{{ gift.day }}</span>
          <VIcon size="36" color="white" class="gift-icon">mdi-gift</VIcon>
        </template>
        <template v-else>
          <span class="gift-name">{{ gift.gift }}</span>
        </template>
      </VCard>
    </div>

    <GiftModal
      :is-open="isModalOpen"
      :gift-name="selectedGift?.gift || ''"
      :day="selectedGift?.day || 0"
      @close="closeModal"
    />
  </VContainer>
</template>

<style scoped>
.calendar-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(19, 107, 76), rgb(23, 136, 96));
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin-bottom: 4rem;
  color: white;
  gap: 1rem;
  position: relative;
}

.header h1 {
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.back-btn {
  padding: 0.6rem 1.2rem !important;
  border: none !important;
  border-radius: 12px !important;
  font-size: 0.9rem !important;
  cursor: pointer;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  position: relative;
  z-index: 1;
  min-width: auto !important;
  text-transform: none !important;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.25) !important;
  transform: scale(1.05);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(8, 120px);
  gap: 0.8rem;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  grid-auto-flow: dense;
}

.gift-card {
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.gift-card.closed {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 215, 0, 0.3);
}

.gift-card.closed:hover:not(.opened) {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 215, 0, 0.6);
}

.gift-card.opened {
  background: rgba(255, 215, 0, 0.15) !important;
  border-color: #ffd700;
  cursor: default;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
}

.day-number {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
}

.gift-name {
  font-size: 12px;
  color: white;
  text-align: center;
  font-weight: 500;
  line-height: 1.2;
  max-width: 90%;
  word-break: break-word;
}

.size-wide,
.size-big {
  grid-column: span 2;
}
.size-tall,
.size-small {
  grid-column: span 1;
}

@media (max-width: 360px) {
  .calendar-page {
    padding: 0.25rem !important;
  }

  .header {
    margin-bottom: 1rem !important;
    gap: 0.25rem !important;
  }

  .header h1 {
    font-size: 1.6rem !important;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }

  .back-btn {
    font-size: 0.85rem !important;
    padding: 0.5rem 1rem !important;
    border-radius: 10px !important;
  }

  .calendar-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    grid-auto-rows: 110px !important;
    gap: 0.6rem !important;
    max-width: 100% !important;
  }

  .gift-card {
    border-radius: 14px !important;
    border-width: 2px !important;
    padding: 4px !important;
  }

  .gift-card.closed {
    background: rgba(255,255,255,0.12) !important;
  }

  .gift-card.opened {
    background: rgba(255,215,0,0.2) !important;
  }

  .day-number {
    font-size: 14px !important;
    top: 4px !important;
    right: 6px !important;
    color: rgba(255,255,255,0.7) !important;
  }

  .gift-name {
    font-size: 14px !important;
    line-height: 1.3 !important;
    max-width: 95% !important;
  }

  .gift-icon {
    font-size: 42px !important;
  }

  .size-wide,
  .size-big {
    grid-column: span 2 !important;
  }
  .size-tall,
  .size-small {
    grid-column: span 1 !important;
  }

  .header .v-col {
    padding: 0 !important;
  }
}

</style>