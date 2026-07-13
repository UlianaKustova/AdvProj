<script setup lang="ts">
import { computed, watch } from 'vue'
import { useMemoryGame } from '@/hooks/useMemoryGame'

const props = defineProps<{
  isOpen: boolean
  day: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const {
  cards,
  moves,
  openedCount,
  matchedPairs,
  totalCards,
  isWon,
  resetGame,
  flipCard,
} = useMemoryGame()

const dialogModel = computed({
  get: () => props.isOpen,
  set: (value) => {
    if (!value) emit('close')
  },
})

watch(
  () => props.isOpen,
  (open) => {
    if (open) resetGame()
  }
)

watch(isWon, (won) => {
  if (won) emit('success')
})
</script>

<template>
  <VDialog
    v-model="dialogModel"
    max-width="560"
    :z-index="2000"
    persistent
  >
    <VCard class="memory-game-card pa-4">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h6 font-weight-bold">Игра на память</h2>
        <VBtn
          icon="mdi-close"
          variant="text"
          @click="emit('close')"
        />
      </div>

      <p class="text-body-2 mb-2">
        День {{ day }} — найди все пары, чтобы открыть подарок
      </p>

      <div class="stats mb-4">
        <span>Открыто: {{ openedCount }} / {{ totalCards }}</span>
        <span>Пары: {{ matchedPairs }} / {{ totalCards / 2 }}</span>
        <span>Ходы: {{ moves }}</span>
      </div>

      <div class="memory-grid">
        <button
          v-for="card in cards"
          :key="card.uid"
          type="button"
          class="memory-card"
          :class="{
            flipped: card.isFlipped || card.isMatched,
            matched: card.isMatched,
          }"
          @click="flipCard(card.uid)"
        >
          <VIcon
            v-if="card.isFlipped || card.isMatched"
            :icon="card.icon"
            size="32"
          />
          <span v-else>?</span>
        </button>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped>
.memory-game-card {
  border-radius: 24px;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.95rem;
}

.memory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.memory-card {
  aspect-ratio: 1;
  border-radius: 12px;
  border: 2px solid rgba(27, 163, 115, 0.4);
  background: #f5f5f5;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgb(27, 163, 115);
}

.memory-card.flipped {
  background: #fff;
}

.memory-card.matched {
  border-color: #ffd700;
  background: #fff8dc;
  cursor: default;
}
</style>