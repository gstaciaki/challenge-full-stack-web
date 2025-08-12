<template>
  <PageHeader currentPage="Início" :pages="utils.pageList">
  </PageHeader>
</template>

<script lang="ts" setup>
import { useUtils } from '@/composables/useUtils';

  const utils = useUtils();
</script>
