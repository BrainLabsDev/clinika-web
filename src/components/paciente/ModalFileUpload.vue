<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 600px; background-color: #f5f5f5" class="q-pa-lg">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="title q-mb-md">
            {{ 'Selecciona los archivos' }}
          </div>

          <q-file
            outlined
            v-model="files"
            use-chips
            multiple
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
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
            label="Subir"
            type="submit"
            class="full-width"
            :loading="loading"
            style="max-width: 48%; text-transform: inherit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, computed } from 'vue';

import { useAuthStore } from 'src/stores/auth';

/* PROPS */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: null,
  },
});

const authStore = useAuthStore();
const files = ref<File[]>([]);
const loading = ref(false);

/* EMITS */
const emits = defineEmits(['update:modelValue', 'success']);

const modal = computed(() => props.modelValue);

/* METHODS */
const closeModal = () => {
  files.value = [];
  emits('update:modelValue', false);
};

const onSubmit = async (evt: any) => {
  const formData = new FormData();
  loading.value = true;

  files.value.forEach((file, index) => {
    formData.append(`archivos[${index}]`, file);
  });

  try {
    const res = await axios.post(
      `${process.env.API}update/user-files/${props.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (res.data.code === 200) {
      emits('success');
      files.value = [];
    }
  } catch (error) {
    console.error('error', error);
  } finally {
    loading.value = false;
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
