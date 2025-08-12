<template>
  <PageHeader currentPage="Consulta de Alunos" :pages="utils.pageList">
    <template #actions>
      <v-row>
        <v-col cols="10">
          <SearchBar @search="onSearch" />
        </v-col>
        <v-col cols="2" class="text-right">
          <v-btn class="mt-4 mb-4" color="primary" @click="onCreate"
            >Cadastrar Aluno</v-btn
          >
        </v-col>
      </v-row>

      <v-divider opacity="0" class="mb-16" />

      <StudentListTable
        :students="students"
        @edit="onEdit"
        @delete="onDelete"
      />
    </template>
  </PageHeader>
</template>

<script setup lang="ts">
import { useUtils } from "@/composables/useUtils";
import { useApiStore } from "@/stores/api";
import { computed, onMounted } from "vue";

const api = useApiStore();
const utils = useUtils();

const students = computed(() => api.students);

function onSearch(query: string) {
  api.listStudents(query);
}

function onCreate() {
  console.log("Cadastrar aluno");
}

function onEdit(student: any) {
  console.log("Editar aluno:", student);
}

function onDelete(student: any) {
  console.log("Excluir aluno:", student);
}

onMounted(() => {
  api.listStudents();
});
</script>
