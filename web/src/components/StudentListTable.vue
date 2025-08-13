<template>
  <v-table>
    <thead>
      <tr>
        <th>Registro Acadêmico</th>
        <th>Nome</th>
        <th>CPF</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.ra }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.cpf }}</td>
        <td>
          <v-btn color="primary" variant="text" @click="onEdit(student)">Editar</v-btn>
          <v-btn color="error" variant="text" @click="onDelete(student)">Excluir</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
  import type { Student } from '@/composables/useApiClient'

  const emit = defineEmits<{
    (e: 'edit' | 'delete', student: Student): void
  }>()

  function onEdit (student: Student) {
    emit('edit', student)
  }

  function onDelete (student: Student) {
    emit('delete', student)
  }

  defineProps<{
    students: Student[]
  }>()
</script>
