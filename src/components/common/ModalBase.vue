<template>
  <q-dialog v-model="modal" :persistent="isPersistent">
    <q-card style="min-width: 600px; background-color: #f5f5f5" class="q-pa-lg">
      <q-card-section>
        <slot name="content"></slot>
      </q-card-section>

      <!-- ACTIONS -->
      <q-card-actions align="between" class="text-primary q-mr-md">
        <slot name="actions"></slot>
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
  hasActions: {
    type: Boolean,
    default: true,
  },
  isPersistent: {
    type: Boolean,
    default: false,
  },
});

/* EMITS */
const emits = defineEmits(['update:modelValue']);

const modal = computed(() => props.modelValue);

/* METHODS */

// const closeModal = () => {
//   emits('update:modelValue', false);
// };

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
