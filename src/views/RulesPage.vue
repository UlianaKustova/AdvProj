<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const fromCalendar = computed(() => route.query.from === 'calendar')

const rules = [
  { icon: 'mdi-calendar', text: 'Заходи каждый день и открывай новый подарок' },
  { icon: 'mdi-gift', text: 'Каждый день тебя ждёт уникальный сюрприз' },
  { icon: 'mdi-timer-sand', text: 'Не пропусти ни одного дня — подарки не повторяются!' },
  { icon: 'mdi-arm-flex', text: 'Получи подарок и наслаждайся праздником' },
]

const goToCalendar = () => {
  router.push('/calendar')
}

const goBack = () => {
  if (route.query.from === 'calendar') {
    router.push('/calendar')
  } else {
    router.push('/')
  }
}
</script>

<template>
  <VContainer fluid fill-height class="rules-page " style="min-height: 100vh;">
    <VRow align="center" justify="center" style="width: 100%;">
      <VCol cols="12" sm="8" md="6" lg="5">
        <VCard
          class="rules-card"
          elevation="16"
          rounded="xl"
          color="rgb(22, 132, 94)"
        >
          <VCardTitle class="text-h4 font-weight-bold text-center text-white pt-6">
            🎄 Правила адвент-календаря
          </VCardTitle>

          <VCardText>
            <VList density="compact" bg-color="transparent">
              <VListItem
                v-for="(rule, index) in rules"
                :key="index"
                class="px-0"
              >
                <template #prepend>
                  <VIcon :icon="rule.icon" color="white" size="28" class="ml-4" />
                </template>
                <VListItemTitle
                  class="text-white"
                  style="font-size: 1.1rem; white-space: normal; word-break: break-word;"
                >
                  {{ rule.text }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCardText>

          <VCardActions class="d-flex justify-center gap-4 pb-6 flex-wrap">
            <VBtn
              variant="text"
              color="white"
              @click="goBack"
              class="text-none"
              rounded="pill"
              size="large"
            >
              Назад
            </VBtn>
            <VBtn
              v-if="!fromCalendar"
              variant="flat"
              @click="goToCalendar"
              class="text-none"
              rounded="pill"
              size="large"
              style="background: white; color: rgb(27, 163, 115);"
            >
              Начать!
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.rules-page {
  display: flex;
}

.rules-card {
  backdrop-filter: blur(10px);
}

@media (max-width: 360px) {
  .rules-page {
    padding: 8px !important;
  }
  .rules-card {
    margin: 0 !important;
  }

  .rules-card :deep(.v-card-title) {
    font-size: 1.25rem !important;
    padding-top: 1rem !important;
    line-height: 1.3 !important;
  }

  .rules-card :deep(.v-list-item-title) {
    font-size: 0.95rem !important;
  }

  .rules-card :deep(.v-list-item__prepend) {
    margin-right: 8px !important;
  }

  .rules-card :deep(.v-card-actions) {
    flex-direction: column !important;
    gap: 8px !important;
    padding-bottom: 1rem !important;
  }
  .rules-card :deep(.v-btn) {
    width: 100% !important;
  }
}
</style>