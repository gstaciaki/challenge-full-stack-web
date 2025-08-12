import {
  useApiClient,
  type ListResponse,
  type Student,
  type CreateStudentData,
  type UpdateStudentData,
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
    async createStudent(data: CreateStudentData): Promise<Student> {
      const response = await apiClient.createStudent(data);
      return response.data;
    },
    async updateStudent(data: UpdateStudentData): Promise<Student> {
      const response = await apiClient.updateStudent(data);
      return response.data;
    },
  },
});
