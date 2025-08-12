<template>
  <PageHeader :currentPage="title" :pages="utils.pageList">
    <template #actions>
      <v-container v-if="showStudentForm">
        <StudentForm :student="studentBeingEdited" @cancel="onCancelForm" />
      </v-container>
      <v-container v-else>
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
      </v-container>
    </template>
  </PageHeader>
</template>

<script setup lang="ts">
import type { Student, UpdateStudentData } from "@/composables/useApiClient";
import { useUtils } from "@/composables/useUtils";
import { useApiStore } from "@/stores/api";
import { computed, onMounted, ref } from "vue";

const api = useApiStore();
const utils = useUtils();

const students = computed(() => api.students);
const showStudentForm = ref(false);

const studentBeingEdited = ref<Student | null>(null);

const title = computed(() =>
  showStudentForm.value
    ? studentBeingEdited.value
      ? "Editar Aluno"
      : "Cadastrar Aluno"
    : "Consulta de Alunos"
);

function onSearch(query: string) {
  api.listStudents(query);
}

function onCreate() {
  studentBeingEdited.value = null;
  showStudentForm.value = true;
}

function onEdit(student: Student) {
  studentBeingEdited.value = student;
  showStudentForm.value = true;
}

function onCancelForm() {
  showStudentForm.value = false;
  studentBeingEdited.value = null;
  api.listStudents();
}

function onDelete(student: UpdateStudentData) {
  console.log("Excluir aluno:", student);
}

onMounted(() => {
  api.listStudents();
});
</script>
