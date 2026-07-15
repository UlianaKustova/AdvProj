import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "load",
      component: () => import("../../pages/load/LoadPage.vue"),
    },
    {
      path: "/rules",
      name: "rules",
      component: () => import("../../pages/rules/RulesPage.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("../../pages/calendar/CalendarPage.vue"),
    },
  ],
});

export default router;
