import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'load',
      component: () => import('../views/LoadPage.vue'),
    },
    {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/CalendarPage.vue'),
  }
  ],
})

export default router
