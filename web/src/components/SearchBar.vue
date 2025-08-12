<template>
  <v-row
    align="center"
    class="mt-4 mb-4 d-flex flex-row ml-8 mr-8"
    justify="space-between"
  >
    <v-text-field
      v-model="search"
      clearable
      density="compact"
      hide-details
      label="Digite sua busca"
      variant="outlined"
    />
    <v-btn class="ml-2" color="primary" @click="onSearch"> Pesquisar </v-btn>
  </v-row>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const emit = defineEmits<{
    (e: 'search', value: string): void
  }>()

  const search = ref('')

  function onSearch () {
    emit('search', search.value)
  }
</script>
