<template>
  <PageHeader current-page="Início" :pages="utils.pageList" />
</template>

<script lang="ts" setup>
  import { useUtils } from '@/composables/useUtils'

  const utils = useUtils()
</script>
