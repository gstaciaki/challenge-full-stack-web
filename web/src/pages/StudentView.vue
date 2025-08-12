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
          @delete="confirmDelete"
        />
      </v-container>

      <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h6">Confirmar exclusão</v-card-title>
          <v-card-text>
            Tem certeza que deseja excluir o aluno
            <strong>{{ studentToDelete?.name }}</strong
            >?
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text color="grey" @click="deleteDialog = false"
              >Cancelar</v-btn
            >
            <v-btn color="error" @click="onDelete">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </PageHeader>
</template>

<script setup lang="ts">
import type { Student } from "@/composables/useApiClient";
import { useUtils } from "@/composables/useUtils";
import { useApiStore } from "@/stores/api";
import { computed, onMounted, ref } from "vue";

const api = useApiStore();
const utils = useUtils();

const students = computed(() => api.students);
const showStudentForm = ref(false);

const studentBeingEdited = ref<Student | null>(null);

const deleteDialog = ref(false);
const studentToDelete = ref<Student | null>(null);

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

function confirmDelete(student: Student) {
  studentToDelete.value = student;
  deleteDialog.value = true;
}

async function onDelete() {
  if (!studentToDelete.value) return;

  try {
    await api.deleteStudent(studentToDelete.value.id);
    deleteDialog.value = false;
    studentToDelete.value = null;
    await api.listStudents();
  } catch (error: any) {
    console.error("Erro ao deletar aluno:", error);
  }
}

function onCancelForm() {
  showStudentForm.value = false;
  studentBeingEdited.value = null;
  api.listStudents();
}

onMounted(() => {
  api.listStudents();
});
</script>
