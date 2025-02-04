<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 400px; background-color: #f5f5f5" class="q-pa-lg">
      <q-card-section>
        <div class="title q-mb-md">
          {{ 'Confirmar' }}
        </div>
        <div class="subtitle">
          {{ 'La cita será eliminada permanentemente ' }}
        </div>
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
          @click="submit"
          class="full-width"
          style="max-width: 48%; text-transform: inherit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

/* PROPS */
const props = defineProps({
  prompt: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number || null,
    default: null,
  },
});

/* EMITS */
const emits = defineEmits(['close', 'submit']);

/* DATA */
const modal = ref(false);

/* METHODS */

const closeModal = () => {
  emits('close');
};

const submit = () => {
  emits('close');
};

/* WATCHERS */
watch(
  () => props.prompt,
  () => {
    modal.value = props.prompt;
  }
);
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
