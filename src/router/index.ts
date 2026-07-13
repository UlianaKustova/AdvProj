import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "load",
      component: () => import("../views/LoadPage.vue"),
    },
    {
      path: "/rules",
      name: "rules",
      component: () => import("../views/RulesPage.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("../views/CalendarPage.vue"),
    },
  ],
});

export default router;
