import { ref, computed } from 'vue'
import { calendarGifts } from '@/data/calendarData'

const STORAGE_KEY = '123'
const COOLDOWN_SECONDS = 30

export function useAdventCalendar() {
  const gifts = ref(calendarGifts)
  const isModalOpen = ref(false)
  const selectedGift = ref<{ day: number; gift: string } | null>(null)
  const lastOpenTimestamp = ref<number | null>(null)
  const errorMessage = ref<string | null>(null)

  const nextAvailableDay = computed(() => {
    const next = gifts.value.find(g => !g.isOpen)
    return next ? next.day : -1
  })

  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const state = JSON.parse(saved)
        if (state.openedDays) {
          gifts.value.forEach(g => {
            g.isOpen = state.openedDays.includes(g.day)
          })
        }
        if (state.lastOpenTimestamp !== undefined) {
          lastOpenTimestamp.value = state.lastOpenTimestamp
        }
      } catch (e) {
        console.warn('Ошибка загрузки состояния:', e)
      }
    }
  }

  function saveState() {
    const openedDays = gifts.value.filter(g => g.isOpen).map(g => g.day)
    const state = {
      openedDays,
      lastOpenTimestamp: lastOpenTimestamp.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  function canOpen(day: number): boolean {
    if (day !== nextAvailableDay.value) {
      errorMessage.value = 'Сначала откройте предыдущие ячейки'
      return false
    }
    if (lastOpenTimestamp.value !== null) {
      const elapsed = (Date.now() - lastOpenTimestamp.value) / 1000
      if (elapsed < COOLDOWN_SECONDS) {
        const remain = Math.ceil(COOLDOWN_SECONDS - elapsed)
        errorMessage.value = `Подождите ещё ${remain} секунд перед открытием следующей ячейки`
        return false
      }
    }
    errorMessage.value = null
    return true
  }

  function openGift(day: number) {
    const gift = gifts.value.find(g => g.day === day)
    if (!gift || gift.isOpen) return
    if (!canOpen(day)) return

    gift.isOpen = true
    selectedGift.value = { day: gift.day, gift: gift.gift }
    isModalOpen.value = true

    lastOpenTimestamp.value = Date.now()
    saveState()
    errorMessage.value = null
  }

  function clearError() {
    errorMessage.value = null
  }

  return {
    gifts,
    isModalOpen,
    selectedGift,
    nextAvailableDay,
    lastOpenTimestamp,
    errorMessage,
    loadState,
    openGift,
    clearError
  }
}