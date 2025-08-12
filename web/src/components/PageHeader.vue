<template>
  <v-app>
    <!-- <v-img :src="logoSrc" max-width="120" contain class="ml-4" /> -->
    <v-app-bar app dense flat color="grey-lighten-3">
      <div
        class="pa-4 text-center font-weight-bold"
        style="width: 240px; flex-shrink: 0"
      >
        Módulo Acadêmico
      </div>

      <v-divider vertical />

      <div class="pa-4 font-weight-medium flex-grow-1 text-center">
        {{ currentPage }}
      </div>
    </v-app-bar>

    <v-navigation-drawer app permanent color="grey-lighten-4" width="240">
      <v-list nav dense>
        <v-list-item
          v-for="(page, index) in pages"
          :key="index"
          @click="$emit('navigate', page)"
          class="cursor-pointer"
        >
          <v-list-item-title>{{ page.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="pa-4 content-scroll">
        <v-row align="center" justify="space-between">
          <div>
            <slot name="actions" />
          </div>
        </v-row>
        <slot />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import logoImage from "../assets/logo.png";

interface Page {
  label: string;
  route: string;
}

interface Props {
  currentPage?: string;
  pages?: Page[];
  logoSrc?: string;
}

withDefaults(defineProps<Props>(), {
  currentPage: "",
  pages: () => [],
  logoSrc: logoImage,
});
</script>

<style scoped>
.content-scroll {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
