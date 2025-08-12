<template>
  <PageHeader
    currentPage="Consulta de Alunos"
    :pages="pageList"
    @navigate="goToPage"
  >
  </PageHeader>
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";

const pageList = [{ label: "Alunos", route: "/alunos" }];

function goToPage(page: any) {
  console.log("Navegar para:", page.route);
}
</script>
