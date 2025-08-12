<template>
  <PageHeader
    currentPage="Consulta de Alunos"
    :pages="pageList"
    @navigate="goToPage"
  >
    <template #actions>
      <v-row>
        <v-col cols="10">
          <SearchBar />
        </v-col>
        <v-col cols="2" class="text-right">
          <v-btn class="mt-4 mb-4" color="primary">Cadastrar Aluno</v-btn>
        </v-col>
      </v-row>

      <v-divider opacity="0" class="mb-16"/>

      <StudentListTable
        :students="students"
        @edit="onEdit"
        @delete="onDelete"
      />
    </template>
  </PageHeader>
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import SearchBar from "@/components/SearchBar.vue";
import StudentListTable from "@/components/StudentListTable.vue";

const pageList = [{ label: "Alunos", route: "/alunos" }];

const students = [
  { ra: "101235", name: "Paula Souza", cpf: "121.999.999-99" },
  { ra: "111687", name: "João Silva", cpf: "122.999.999-99" },
  { ra: "111365", name: "Marina Miranda", cpf: "123.999.999-99" },
  { ra: "101299", name: "Maurício Souza", cpf: "124.999.999-99" },
];

function goToPage(page: any) {
  console.log("Navegar para:", page.route);
}

function onSearch(query: string) {
  console.log("Buscar por:", query);
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
</script>
