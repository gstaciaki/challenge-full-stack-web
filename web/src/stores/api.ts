import {
  useApiClient,
  type ListResponse,
  type Student,
} from "@/composables/useApiClient";
import { defineStore } from "pinia";

const apiClient = useApiClient();

type ApiState = {
  students: Student[];
};

export const useApiStore = defineStore("api", {
  state: (): ApiState => ({
    students: [],
  }),

  actions: {
    async listStudents(name?: string): Promise<ListResponse<Student>> {
      const response = await apiClient.listStudents(name);
      this.students = response.data.data;
      return response.data;
    },
  },
});
