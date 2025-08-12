import axios, { AxiosError } from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  headers,
});

export type ListResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type Student = {
  id: string;
  name: string;
  ra: string;
  cpf: string;
  email: string;
};

export type CreateStudentData = {
  name: string;
  email: string;
  ra: string;
  cpf: string;
};

export type UpdateStudentData = {
  id: string;
  name: string;
  email: string;
};

export const useApiClient = () => {
  return {
    listStudents(name?: string) {
      return apiClient.get("student", { params: { name } });
    },
    createStudent(data: CreateStudentData) {
      return apiClient.post("student", data);
    },
    updateStudent(data: UpdateStudentData) {
      const { id, ...body } = data;
      return apiClient.put(`student/${id}`, body);
    },
  };
};
