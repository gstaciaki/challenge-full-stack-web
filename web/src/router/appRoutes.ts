import HomeView from "@/pages/HomeView.vue";
import StudentView from "@/pages/StudentView.vue";
import type { RouteRecordRaw } from "vue-router";

export const appRoutes: RouteRecordRaw[] = [
  { name: "home", path: "/", component: HomeView },
  { name: "students", path: "/students", component: StudentView },
];
