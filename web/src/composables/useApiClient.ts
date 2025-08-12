import axios from "axios";

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

export const useApiClient = () => {
  return {
    listStudents(name?: string) {
      return apiClient.get("student", { params: { name } });
    },
  };
};
