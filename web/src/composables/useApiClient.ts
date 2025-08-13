import apiClient, { setTokenGetter } from '@/services/apiClient'

import { useAuthStore } from '@/stores/auth'

setTokenGetter(() => {
  const authStore = useAuthStore()
  return authStore.accessToken
})


export type ListResponse<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type Student = {
  id: string
  name: string
  ra: string
  cpf: string
  email: string
}

export type CreateStudentData = {
  name: string
  email: string
  ra: string
  cpf: string
}

export type UpdateStudentData = {
  id: string
  name: string
  email: string
}

export type LoginData = {
  email: string;
  password: string;
}


export const useApiClient = () => {
  return {
    listStudents (name?: string) {
      return apiClient.get('student', { params: { name } })
    },
    createStudent (data: CreateStudentData) {
      return apiClient.post('student', data)
    },
    updateStudent (data: UpdateStudentData) {
      const { id, ...body } = data
      return apiClient.put(`student/${id}`, body)
    },
    deleteStudent (id: string) {
      return apiClient.delete(`student/${id}`)
    },
    login(data: LoginData) {
      return apiClient.post('login', data)
    }
  }
}
