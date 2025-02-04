<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 600px; background-color: #f5f5f5" class="q-pa-lg">
      <q-card-section>
        <div class="title q-mb-md">
          {{ 'Nueva cuenta' }}
        </div>
      </q-card-section>
      <q-form ref="myForm">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-4">
            <q-input
              v-model="form.nombre"
              outlined
              placeholder="Nombre"
              dense
              autofocus
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            />
          </div>
          <div class="col-4">
            <q-input
              v-model="form.email"
              outlined
              type="email"
              placeholder="Correo electrónico"
              dense
              lazy-rules
              :rules="[
                (val) => !!val || 'El email es requerido',
                (val) => /.+@.+/.test(val) || 'El email debe ser válido',
              ]"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              type="tel"
              placeholder="Teléfono"
              dense
              lazy-rules
              :rules="[(val) => !!val || 'El teléfono es requerido']"
            />
          </div>
        </q-card-section>
      </q-form>

      <!-- ACTIONS -->
      <q-card-actions align="between" class="text-primary q-mr-md">
        <q-btn
          outline
          label="Cancelar"
          @click="closeModal"
          class="full-width"
          style="max-width: 48%; text-transform: inherit"
        />
        <q-btn
          color="primary"
          label="Guardar"
          class="full-width"
          @click="submit"
          style="max-width: 48%; text-transform: inherit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { nutriDataServices } from 'src/services/NutriDataService';
import { ref, computed, reactive } from 'vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();

/* PROPS */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  paciente: {
    type: Object,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
});

/* DATA */
const myForm = ref<HTMLFormElement | null>(null);
const form = reactive({
  nombre: '',
  email: '',
  rol: 'SuperAdmin',
});

/* EMITS */
const emits = defineEmits(['update:modelValue']);

const modal = computed(() => props.modelValue);

/* METHODS */
const closeModal = () => {
  emits('update:modelValue', false);
};

const submit = async () => {
  if (myForm.value?.validate()) {
    try {
      const data = await nutriDataServices.saveNutricionista({
        nombre: form.nombre,
        email: form.email,
        rol: form.rol,
      });
      if (data.code === 200) {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Nutricionista agregado correctamente',
          position: 'top-right',
        });
        closeModal();
      }
    } catch (error) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: 'Ocurrió un error',
        position: 'top-right',
      });
      console.log(error);
    }
  }
};

/* WATCHERS */
</script>

<style scoped>
.title {
  font-size: 32px;
  font-weight: 400;
  color: #525252;
  line-height: 20px;
  text-align: center;
}

.subtitle {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
  color: #525252;
  line-height: 20px;
  text-align: center;
}
.c_label {
  font-size: 14px;
  font-weight: 700;
  color: #525252;
  line-height: 20px;
  text-align: center;
}
</style>
