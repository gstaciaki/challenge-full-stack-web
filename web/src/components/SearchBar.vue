<template>
  <v-row class="mt-4 mb-4 d-flex flex-row ml-8 mr-8" align="center" justify="space-between">
    <v-text-field
      v-model="search"
      label="Digite sua busca"
      variant="outlined"
      density="compact"
      clearable
      hide-details
    />
    <v-btn color="primary" class="ml-2" @click="$emit('search', search)">
      Pesquisar
    </v-btn>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
</script>
