import StudentView from "@/pages/StudentView.vue";
import type { RouteRecordRaw } from "vue-router";

export const appRoutes: RouteRecordRaw[] = [
  { name: "students", path: "/students", component: StudentView },
];
