import { ref, computed } from "vue";
import {
  symbols,
  type MemoryPair,
  type GameCard,
} from "@/data/memoryGameCards";

interface Difficulty {
  pairs: number;
  hp: number;
}

function getDifficulty(day: number): Difficulty {
  if (day <= 4) return { pairs: 5, hp: 10 };
  if (day <= 9) return { pairs: 6, hp: 9 };
  if (day <= 14) return { pairs: 6, hp: 8 };
  if (day <= 19) return { pairs: 7, hp: 8 };
  if (day <= 24) return { pairs: 9, hp: 7 };
  return { pairs: 10, hp: 8 };
}

export function useMemoryGame() {
  const cards = ref<GameCard[]>([]);
  const moves = ref(0);
  const isLocked = ref(false);
  const health = ref(6);
  const maxHealth = ref(6);
  const currentDay = ref(1);

  const shuffleCards = (array: MemoryPair[]): MemoryPair[] => {
    const res = [...array];
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res[i], res[j]] = [res[j]!, res[i]!];
    }
    return res;
  };

  const totalCards = computed(() => cards.value.length);

  const openedCount = computed(
    () => cards.value.filter((c) => c.isFlipped || c.isMatched).length,
  );

  const matchedPairs = computed(
    () => cards.value.filter((c) => c.isMatched).length / 2,
  );

  const isWon = computed(
    () => cards.value.length > 0 && cards.value.every((c) => c.isMatched),
  );

  const isLost = computed(() => health.value <= 0);

  function resetGame(day?: number) {
    if (day !== undefined) currentDay.value = day;
    const { pairs, hp } = getDifficulty(currentDay.value);
    maxHealth.value = hp;
    health.value = hp;
    moves.value = 0;
    isLocked.value = false;

    const selectedSymbols = symbols.slice(0, pairs);
    const deck: MemoryPair[] = [...selectedSymbols, ...selectedSymbols];
    const shuffled = shuffleCards(deck);
    cards.value = shuffled.map((card, index) => ({
      ...card,
      uid: index,
      isFlipped: false,
      isMatched: false,
    }));
  }

  function flipBack() {
    cards.value.forEach((card) => {
      if (!card.isMatched) {
        card.isFlipped = false;
      }
    });
    isLocked.value = false;
  }

  async function flipCard(uid: number) {
    if (isLocked.value || isWon.value || isLost.value) return;

    const card = cards.value.find((c) => c.uid === uid);
    if (!card || card.isMatched || card.isFlipped) return;

    const opened = cards.value.filter((c) => c.isFlipped && !c.isMatched);
    if (opened.length >= 2) return;

    card.isFlipped = true;

    if (opened.length === 1) {
      const first = opened[0]!;
      moves.value++;
      isLocked.value = true;

      if (first.id === card.id) {
        first.isMatched = true;
        card.isMatched = true;
        isLocked.value = false;
      } else {
        health.value = Math.max(0, health.value - 1);
        await new Promise((resolve) => setTimeout(resolve, 700));
        flipBack();
        if (isLost.value) {
          isLocked.value = true;
        }
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
    isLost,
    health,
    maxHealth,
    resetGame,
    flipCard,
  };
}
