<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const loading = ref(true)
const currentIndex = ref(-1)

const totalSquares = 9
const filledSquares = ref<boolean[]>(Array(totalSquares).fill(false))

const snakeOrder = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8
]

onMounted(() => {
  let index = 0
  
  const interval = setInterval(() => {
    if (index < snakeOrder.length) {
      const squareIndex = snakeOrder[index]
    if (squareIndex !== undefined && squareIndex < filledSquares.value.length) {
        filledSquares.value[squareIndex] = true
        currentIndex.value = index
    }
      index++
    } else {
      clearInterval(interval)
      setTimeout(() => {
        loading.value = false
      }, 400)
    }
  }, 600)
})

const goToNext = () => {
  router.replace('/rules')
}

const progressPercent = computed(() => {
  const filled = filledSquares.value.filter(Boolean).length
  return Math.round((filled / totalSquares) * 100)
})
</script>

<template>
  <div class="load-page">
    
    <div class="content">
      
      <div class="grid-wrapper" v-if="loading">
        <div class="grid">
          <div 
            v-for="(filled, index) in filledSquares" 
            :key="index"
            class="square"
            :class="{ 
              'filled': filled,
              'current': !filled && currentIndex >= 0 && index === snakeOrder[currentIndex + 1]
            }"
          >
          </div>
        </div>
        <p class="loading-text">Загрузка... {{ progressPercent }}%</p>
      </div>

      <transition name="fade">
        <button 
          v-if="!loading" 
          class="next-btn"
          @click="goToNext"
        >
          Дальше
        </button>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.load-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding: 40px 30px;
  background: rgb(22, 132, 94);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(241, 241, 241, 0.16);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  max-width: 250px;
  margin: 0 auto 20px;
}

.square {
  aspect-ratio: 1;
  background: #0d4a22;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.square.filled {
  background: #FFF44F;
  transform: scale(1.05);
}

.loading-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-top: 10px;
  font-weight: 300;
  letter-spacing: 1px;
}

.next-btn {
  margin-top: 10px;
  padding: 16px 50px;
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(27, 163, 115);
  background: #ffffff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
}

.next-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  background: #f0f9f0;
}

.next-btn:active {
  transform: translateY(0) scale(0.98);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 360px) {
  .load-page {
    padding: 8px !important;
  }

  .content {
    padding: 16px 10px !important;
    border-radius: 20px !important;
    max-width: 100% !important;
  }

  .grid {
    max-width: 180px !important;
    gap: 8px !important;
    margin: 0 auto 12px !important;
  }

  .square {
    border-radius: 8px !important;
    aspect-ratio: 1 / 1 !important;
  }

  .square.filled {
    transform: scale(1.03) !important;
  }

  .loading-text {
    font-size: 0.9rem !important;
    margin-top: 6px !important;
  }

  .next-btn {
    padding: 12px 28px !important;
    font-size: 1rem !important;
    border-radius: 40px !important;
    margin-top: 6px !important;
  }
}
</style>