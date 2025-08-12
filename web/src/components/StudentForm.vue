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
                :disabled="isEdit"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="CPF"
                v-model="form.cpf"
                :rules="[rules.required, rules.cpf]"
                placeholder="Informe o número do documento"
                required
                :disabled="isEdit"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="outlined" color="grey" @click="onCancel"
          >Cancelar</v-btn
        >
        <v-btn color="primary" :disabled="!valid" @click="confirmSave"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirmar ação</v-card-title>
        <v-card-text>
          Você tem certeza que deseja salvar este aluno?
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="grey" @click="confirmDialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="primary" @click="onSave">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="successDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Sucesso</v-card-title>
        <v-card-text> Aluno salvo com sucesso! </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="onSuccessClose">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import type {
  CreateStudentData,
  Student,
  UpdateStudentData,
} from "@/composables/useApiClient";
import { useUtils } from "@/composables/useUtils";
import { useApiStore } from "@/stores/api";
import { ref, reactive, watch, computed } from "vue";

interface Props {
  student: Student | null;
}

const props = defineProps<Props>();
const emit = defineEmits(["cancel"]);

const isEdit = computed(() => !!props.student);

const api = useApiStore();
const utils = useUtils();

const valid = ref(false);
const formRef = ref();

const errorDialog = ref(false);
const errorMessage = ref("");

const confirmDialog = ref(false);
const successDialog = ref(false);

const form = reactive({
  name: "",
  email: "",
  ra: "",
  cpf: "",
  id: "",
});

watch(
  () => props.student,
  (student) => {
    if (student) {
      form.id = student.id;
      form.name = student.name;
      form.email = student.email;
      form.ra = student.ra ?? "";
      form.cpf = student.cpf ?? "";
    } else {
      form.id = "";
      form.name = "";
      form.email = "";
      form.ra = "";
      form.cpf = "";
    }
  },
  { immediate: true }
);

const rules = Object.freeze({
  required: (v: string) => {
    if (isEdit.value) return true;
    return !!v || "Campo obrigatório";
  },
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
  cpf: (v: string) => {
    if (isEdit.value) return true;
    return utils.isValidCpf(v) || "CPF inválido";
  },
});

function onCancel() {
  form.id = "";
  form.name = "";
  form.email = "";
  form.ra = "";
  form.cpf = "";
  formRef.value?.resetValidation();
  emit("cancel");
}

function confirmSave() {
  if (!formRef.value?.validate()) return;
  confirmDialog.value = true;
}

async function onSave() {
  confirmDialog.value = false;

  try {
    if (isEdit.value) {
      const updateData: UpdateStudentData = {
        id: form.id,
        name: form.name,
        email: form.email,
      };
      await api.updateStudent(updateData);
    } else {
      const createData: CreateStudentData = {
        name: form.name,
        email: form.email,
        ra: form.ra,
        cpf: form.cpf,
      };
      await api.createStudent(createData);
    }
    successDialog.value = true;
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.error || "Ocorreu um erro ao salvar o aluno.";
    errorDialog.value = true;
  }
}

function onSuccessClose() {
  successDialog.value = false;
  onCancel();
}
</script>

<style scoped>
.v-card {
  max-width: 720px;
  margin: 0 auto;
}
</style>
