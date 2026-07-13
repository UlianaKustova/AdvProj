import { ref, computed } from 'vue'
import { symbols, totalCards, type MemoryPair, type GameCard } from '@/data/memoryGameCards'

export function useMemoryGame() {
  const cards = ref<GameCard[]>([])
  const moves = ref(0)
  const isLocked = ref(false)

  const shuffleCards = (array: MemoryPair[]): MemoryPair[] => {
    const res = [...array]
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[res[i], res[j]] = [res[j]!, res[i]!]
    }
    return res
  }

  const openedCount = computed(() =>
    cards.value.filter((c) => c.isFlipped || c.isMatched).length
  )

  const matchedPairs = computed(() =>
    cards.value.filter((c) => c.isMatched).length / 2
  )

  const isWon = computed(() =>
    cards.value.length > 0 && cards.value.every((c) => c.isMatched)
  )

  function resetGame() {
    moves.value = 0
    isLocked.value = false

    cards.value = shuffleCards([...symbols, ...symbols]).map((card, index) => ({
      ...card,
      uid: index,
      isFlipped: false,
      isMatched: false,
    }))
  }

  function flipBack() {
    cards.value.forEach((card) => {
      if (!card.isMatched) {
        card.isFlipped = false
      }
    })
    isLocked.value = false
  }

  async function flipCard(uid: number) {
    if (isLocked.value || isWon.value) return

    const card = cards.value.find((c) => c.uid === uid)
    if (!card || card.isMatched || card.isFlipped) return

    const opened = cards.value.filter((c) => c.isFlipped && !c.isMatched)
    if (opened.length >= 2) return

    card.isFlipped = true

    if (opened.length === 1) {
      const first = opened[0]!
      moves.value++
      isLocked.value = true

      if (first.id === card.id) {
        first.isMatched = true
        card.isMatched = true
        isLocked.value = false
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700))
        flipBack()
      }
    }
  }

  return {
    cards,
    moves,
    openedCount,
    matchedPairs,
    totalCards,
    isWon,
    resetGame,
    flipCard,
  }
}