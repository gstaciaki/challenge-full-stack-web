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
          <v-btn variant="text" color="primary" @click="$emit('edit', student)"
            >Editar</v-btn
          >
          <v-btn variant="text" color="error" @click="$emit('delete', student)"
            >Excluir</v-btn
          >
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type { Student } from "@/composables/useApiClient";

defineProps<{
  students: Student[];
}>();
</script>
