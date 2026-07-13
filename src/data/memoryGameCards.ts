export interface MemoryPair {
  id: number
  icon: string
  label: string
}

export interface GameCard extends MemoryPair {
  uid: number
  isFlipped: boolean
  isMatched: boolean
}

export const symbols: MemoryPair[] = [
  { id: 1, icon: 'mdi-snowflake', label: 'Снежинка' },
  { id: 2, icon: 'mdi-pine-tree', label: 'Ёлка' },
  { id: 3, icon: 'mdi-gift', label: 'Подарок' },
  { id: 4, icon: 'mdi-candle', label: 'Свеча' },
  { id: 5, icon: 'mdi-star', label: 'Звезда' },
  { id: 6, icon: 'mdi-snowman', label: 'Снеговик' },
]

export const totalCards = symbols.length * 2