<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-6">
      <v-card-title class="text-h5 text-center mb-6">Login</v-card-title>

      <v-form ref="formRef" v-model="valid" @submit.prevent="onSubmit">
        <v-text-field
          label="E-mail"
          v-model="email"
          :rules="[rules.required, rules.email]"
          prepend-icon="mdi-email"
          type="email"
          required
        />

        <v-text-field
          label="Senha"
          v-model="password"
          :rules="[rules.required]"
          prepend-icon="mdi-lock"
          type="password"
          required
        />

        <v-btn
          type="submit"
          color="primary"
          class="mt-6"
          :disabled="!valid"
          block
        >
          Entrar
        </v-btn>
      </v-form>

      <v-alert
        v-if="errorMessage"
        type="error"
        class="mt-4"
        border="top"
        colored-border
        prominent
      >
        {{ errorMessage }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const valid = ref(false);
const formRef = ref();

const auth = useAuthStore();
const router = useRouter();

const errorMessage = ref("");

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
};

async function onSubmit() {
  errorMessage.value = "";

  if (!formRef.value?.validate()) return;

  try {
    await auth.login({ email: email.value, password: password.value });

    router.push("/");
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.error ||
      error?.message ||
      "Erro ao tentar logar. Tente novamente.";
  }
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
