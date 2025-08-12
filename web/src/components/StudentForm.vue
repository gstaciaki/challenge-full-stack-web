<template>
  <v-container>
    <v-card outlined>
      <v-card-text>
        <v-form ref="formRef" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Nome"
                v-model="form.name"
                :rules="[rules.required]"
                placeholder="Informe o nome completo"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="E-mail"
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                placeholder="Informe apenas um e-mail"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="RA"
                v-model="form.ra"
                :rules="[rules.required]"
                placeholder="Informe o registro acadêmico"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="CPF"
                v-model="form.cpf"
                :rules="[rules.required, rules.cpf]"
                placeholder="Informe o número do documento"
                required
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="outlined" color="grey" @click="onCancel"
          >Cancelar</v-btn
        >
        <v-btn color="primary" :disabled="!valid" @click="onSave">Salvar</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="errorDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Erro ao salvar</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="errorDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import type { StudentData } from "@/composables/useApiClient";
import { useApiStore } from "@/stores/api";
import { ref, reactive } from "vue";

const emit = defineEmits(["cancel"]);

const form = reactive<StudentData>({
  name: "",
  email: "",
  ra: "",
  cpf: "",
});

const valid = ref(false);
const formRef = ref();

const api = useApiStore();

const errorDialog = ref(false);
const errorMessage = ref("");

const rules = Object.freeze({
  required: (v: string) => !!v || "Campo obrigatório",
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
  cpf: (v: string) =>
    (!!v && v.length === 11 && /^\d+$/.test(v)) || "CPF deve ter 11 números",
});

function onCancel() {
  Object.keys(form).forEach((key) => (form[key as keyof typeof form] = ""));
  formRef.value?.resetValidation();
  emit("cancel");
}

async function onSave() {
  if (!formRef.value?.validate()) return;

  try {
    await api.createStudent(form);
    onCancel();
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.error || "Ocorreu um erro ao salvar o aluno.";
    errorDialog.value = true;
  }
}
</script>

<style scoped>
.v-card {
  max-width: 720px;
  margin: 0 auto;
}
</style>
