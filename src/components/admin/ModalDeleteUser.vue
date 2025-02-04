<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 600px; background-color: #f5f5f5" class="q-pa-lg">
      <q-card-section>
        <div class="row justify-center">
          <q-icon color="warning" name="warning" size="100px" />
        </div>
        <div class="subtitle">Se eliminará el siguiente registro</div>
        <!-- <div class="q-mt-md">
          <div class="row justify-center">
            <div class="c_label q-mr-md">Nombre:</div>
            <div>{{ 'Nombre de la cuenta' }}</div>
          </div>
          <div class="row justify-center">
            <div class="c_label q-mr-md">E-mail:</div>
            <div>{{ 'correo@gmail.com' }}</div>
          </div>
          <div class="row justify-center">
            <div class="c_label q-mr-md">Teléfono:</div>
            <div>{{ '983765123' }}</div>
          </div>
        </div> -->
      </q-card-section>

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
          label="Eliminar"
          type="submit"
          class="full-width"
          @click="closeModal"
          style="max-width: 48%; text-transform: inherit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

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

/* EMITS */
const emits = defineEmits(['update:modelValue']);

const modal = computed(() => props.modelValue);

/* METHODS */

const closeModal = () => {
  emits('update:modelValue', false);
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
