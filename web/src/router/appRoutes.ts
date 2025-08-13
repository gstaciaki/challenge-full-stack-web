import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import StudentView from "@/pages/StudentView.vue";
import Login from "@/pages/Login.vue";

export const appRoutes: RouteRecordRaw[] = [
  { name: "login", path: "/login", component: Login },
  { name: "home", path: "/", component: HomeView },
  { name: "students", path: "/students", component: StudentView },
];
