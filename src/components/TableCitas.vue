<template>
  <div class="q-mt-sm row justify-between items-center q-mb-md">
    <span class="text-black text-bold text-h5">Registro de citas</span>
    <div>
      <!-- <q-btn
        color="primary"
        outline
        @click="openNewCita"
        class="q-mr-md bg-white"
        label="Programar siguiente cita"
        style="text-transform: inherit"
        icon="add"
      ></q-btn> -->
      <q-btn
        color="primary"
        @click="prompt = !prompt"
        style="text-transform: inherit"
        >Registrar cita actual</q-btn
      >
    </div>
  </div>
  <div class="q-mt-sm">
    <q-table
      dense
      flat
      :rows="citasReverse"
      :columns="columns"
      row-key="name"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[3, 5, 10]"
    >
      <template v-slot:body-cell-peso="props">
        <q-td key="peso" :props="props" auto-width>
          {{ props.row.weight }}
        </q-td>
      </template>
      <template v-slot:body-cell-musculo="props">
        <q-td key="musculo" :props="props" auto-width>
          {{ props.row.muscle }}
        </q-td>
      </template>
      <template v-slot:body-cell-grasas="props">
        <q-td key="grasas" :props="props" auto-width>
          {{ props.row.fat }}
        </q-td>
      </template>
      <template v-slot:body-cell-porcentaje_grasa="props">
        <q-td key="porcentaje_grasa" :props="props" auto-width>
          {{ props.row.average_fat }}
        </q-td>
      </template>
      <template v-slot:body-cell-cc="props">
        <q-td key="cc" :props="props" style="width: 80px">
          {{ props.row.cc }}
        </q-td>
      </template>
      <template v-slot:body-cell-grasa_viceral="props">
        <q-td key="grasa_viceral" :props="props" auto-width>
          {{ props.row.viseral_fat }}
        </q-td>
      </template>
      <template v-slot:body-cell-evolucion="props">
        <q-td key="evolucion" :props="props" auto-width>
          <div
            style="
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              max-width: 500px;
            "
          >
            {{ props.row.notes_client }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-fecha_cita="props">
        <q-td key="fecha_cita" :props="props" auto-width>
          <q-btn
            rounded
            flat
            size="sm"
            class="bg-primary"
            text-color="white"
            style="text-transform: inherit"
            @click="handleCita(props.row.id)"
          >
            {{ props.row.date.split('T')[0] }}
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props" auto-width>
          <q-btn
            round
            color="primary"
            :icon="'o_edit'"
            size="sm"
            class="q-mr-sm"
            @click="edit(props.row)"
          />
          <q-btn
            round
            color="red"
            :icon="'o_delete'"
            size="sm"
            @click="getDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 775px; border-radius: 40px" class="q-pa-lg">
      <q-form ref="myForm">
        <q-card-section class="q-pb-none">
          <div class="title">Medidas del paciente</div>
          <div class="subtitle">
            El paciente podrá ver estos datos en la aplicación
          </div>
        </q-card-section>
        <q-card-section class="row q-col-gutter-sm q-mt-none q-pt-none">
          <div class="col-4 q-mb-md">
            <label for="">Altura (cm)</label>
            <q-input
              outlined
              dense
              v-model="form.altura"
              placeholder="Altura"
            />
          </div>

          <div class="col-4 q-mb-md">
            <label for="">Peso corporal (kg)</label>
            <q-input
              outlined
              dense
              v-model="form.peso"
              placeholder="Peso corporal"
            />
          </div>

          <div class="col-4 q-mb-md">
            <label for="">Masa muscular (kg)</label>
            <q-input
              outlined
              dense
              v-model="form.musculo"
              placeholder="Masa muscular"
            />
          </div>

          <div class="col-4 q-mb-md">
            <label for="">Grasa corporal (kg)</label>
            <q-input
              outlined
              dense
              v-model="form.grasa"
              placeholder="Grasa corporal"
            />
          </div>

          <div class="col-4 q-mb-md">
            <label for="">Porcentaje de grasa (%)</label>
            <q-input
              outlined
              dense
              v-model="form.porcentaje_grasa"
              placeholder="Porcentaje de grasa"
            />
          </div>

          <div class="col-4 q-mb-md">
            <label for="">Grasa visceral (kg)</label>
            <q-input
              outlined
              dense
              v-model="form.grasa_viceral"
              placeholder="Grasa visceral"
            />
          </div>

          <div class="col-4 q-mb-md">
            <label for="">Relación Cintura-Cadera</label>
            <q-input
              outlined
              dense
              v-model="form.cc"
              placeholder="Cintura-cadera"
            />
          </div>
        </q-card-section>
        <q-card-section class="q-pb-none">
          <div class="title">Recomendaciones para el paciente</div>
          <div class="subtitle">
            El paciente podrá ver estos datos en la aplicación
          </div>
        </q-card-section>
        <q-card-section class="row q-col-gutter-sm q-mt-none q-pt-none">
          <div class="col-6 q-mb-md">
            <label for="">Consumo de agua diario (litros)</label>
            <q-select
              outlined
              dense
              label="Seleccionar consumo de agua"
              v-model="form.consumo_agua_id"
              :options="catalogStore.getIngestaAgua"
              map-options
              emit-value
              lazy-rules
            />
          </div>
          <div class="col-6 q-mb-md">
            <label for="">Ejercicio recomendado</label>
            <q-input
              outlined
              dense
              v-model="form.ejercicio"
              placeholder="4 días"
            />
          </div>
          <div class="col-12">
            <label for="">Notas para el cliente</label>
            <q-input
              outlined
              placeholder="Ej. recomendaciones acerca de la dieta, ejercicio, etc..."
              v-model="form.notas_cliente"
              autogrow
              type="textarea"
            />
          </div>
        </q-card-section>
        <q-card-section class="q-pb-none">
          <div class="title">Uso interno</div>
          <div class="subtitle">
            El paciente NO podrá ver estos datos en la aplicación
          </div>
        </q-card-section>
        <q-card-section class="row q-col-gutter-sm q-mt-none q-pt-none">
          <div class="col-12">
            <label for="">Notas</label>
            <q-input
              outlined
              placeholder="Aquí va una nota"
              v-model="form.notas_internas"
              autogrow
              type="textarea"
            />
          </div>
        </q-card-section>
      </q-form>

      <q-card-actions align="right" class="text-primary q-mr-md">
        <q-btn
          outline
          label="Cancelar"
          @click="closeModal"
          style="width: 175px"
        />
        <q-btn
          color="primary"
          :label="form.id === null ? 'Guardar' : 'Actualizar'"
          v-close-popup
          style="width: 175px"
          :disabled="disabled"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <ModalBase v-model="confirm">
    <template #content>
      <div class="row justify-center">
        <q-icon color="warning" name="warning" size="100px" />
      </div>
      <div class="row justify-center">
        <div class="subtitle">Se eliminara la siguiente cita</div>
      </div>
    </template>
    <template #actions>
      <q-btn
        outline
        label="Cancelar"
        @click="confirm = false"
        class="full-width"
        style="max-width: 48%; text-transform: inherit"
      />
      <q-btn
        color="primary"
        label="Eliminar"
        type="submit"
        class="full-width"
        @click="deleteCita"
        style="max-width: 48%; text-transform: inherit"
      />
    </template>
  </ModalBase>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { computed } from '@vue/reactivity';
import { ICitaControl } from 'src/Interfaces/CitaControl';
import { citaControlDataServices } from 'src/services/CitaControlDataService';
import { date } from 'quasar';

import { useCatalogStore } from 'stores/catalog';
import ModalBase from './common/ModalBase.vue';

const catalogStore = useCatalogStore();

const $q = useQuasar();
const props = defineProps({
  id: {
    type: String || Number,
    required: true,
  },
});

const emits = defineEmits(['cita', 'programar']);

const columns = [
  {
    name: 'fecha_cita',
    label: 'Fecha',
    field: 'fecha_cita',
    align: 'center' as 'center',
  },
  {
    name: 'peso',
    label: 'Peso corporal (Kg)',
    field: 'peso',
    align: 'center' as 'center',
  },
  {
    name: 'musculo',
    label: 'Masa muscular (Kg)',
    field: 'musculo',
    align: 'center' as 'center',
  },
  {
    name: 'grasas',
    label: 'Grasa corporal (Kg)',
    field: 'grasas',
    align: 'center' as 'center',
  },
  {
    name: 'porcentaje_grasa',
    label: 'Porcentaje de Grasa(%)',
    field: 'porcentaje_grasa',
    align: 'center' as 'center',
  },
  {
    name: 'grasa_viceral',
    label: 'Grasa visceral (Kg)',
    field: 'grasa_viceral',
    align: 'center' as 'center',
  },
  {
    name: 'cc',
    label: 'Relación Cintura-Cadera',
    field: 'cc',
    align: 'center' as 'center',
  },
  {
    name: 'evolucion',
    label: 'Notas',
    field: 'evolucion',
    align: 'center' as 'center',
  },
  { name: 'accion', label: 'Acciones', align: 'center' as 'center' },
];

const prompt = ref(false);
const confirm = ref(false);
const idCita = ref('');
const myForm = ref<HTMLFormElement | null>(null);
const loading = ref(false);
const items = ref<ICitaControl[]>([]);

const form = reactive({
  id: null,
  altura: '',
  fecha: '',
  peso: '',
  musculo: '',
  grasa: '',
  porcentaje_grasa: '',
  cc: '',
  grasa_viceral: '',
  cliente_id: props.id,
  notas_cliente: '',
  notas_internas: '',
  ejercicio: '',
  consumo_agua_id: '',
});

onMounted(() => {
  getItems();
});

const citasReverse = computed(() => {
  return items.value.slice().reverse();
});

const getItems = async () => {
  loading.value = true;
  try {
    const data = await citaControlDataServices.getAll(props.id);

    if (data.code === 200) {
      items.value = data.data.sort((a: ICitaControl, b: ICitaControl) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

const submit = async () => {
  const today = new Date();

  const fecha = date.formatDate(today, 'YYYY-MM-DD');

  if (myForm.value?.validate()) {
    try {
      if (form.id === null) {
        const data = await citaControlDataServices.save({
          fecha: fecha,
          estatura: form.altura,
          peso: form.peso,
          musculo: form.musculo,
          grasa: form.grasa,
          porcentaje_grasa: form.porcentaje_grasa,
          cc: form.cc,
          grasa_viseral: form.grasa_viceral,
          cliente_id: props.id,
          notas_cliente: form.notas_cliente,
          notas_internas: form.notas_internas,
          ejercicio: form.ejercicio,
          consumo_agua_id: form.consumo_agua_id,
        });
        if (data.code === 200) {
          emits('cita', data.data.id);
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Cita agregada correctamente',
            position: 'top-right',
          });
          await getItems();
          closeModal();
        }
      } else {
        const data = await citaControlDataServices.update(form.id, {
          estatura: form.altura,
          fecha: form.fecha,
          peso: form.peso,
          musculo: form.musculo,
          grasa: form.grasa,
          porcentaje_grasa: form.porcentaje_grasa,
          cc: form.cc,
          grasa_viseral: form.grasa_viceral,
          cliente_id: props.id,
          notas_cliente: form.notas_cliente,
          notas_internas: form.notas_internas,
          ejercicio: form.ejercicio,
          consumo_agua_id: form.consumo_agua_id,
        });
        if (data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Cita actualizada correctamente',
            position: 'top-right',
          });
          await getItems();
          closeModal();
        }
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

const closeModal = () => {
  prompt.value = false;
  form.id = null;
  form.peso = '';
  form.musculo = '';
  form.grasa = '';
  form.porcentaje_grasa = '';
  form.cc = '';
  form.grasa_viceral = '';
  form.notas_cliente = '';
  form.notas_internas = '';
  form.ejercicio = '';
  form.consumo_agua_id = '';
};

const disabled = computed(() => {
  return (
    form.peso === '' ||
    form.musculo === '' ||
    form.grasa === '' ||
    form.porcentaje_grasa === '' ||
    form.cc === '' ||
    form.grasa_viceral === ''
  );
});

const handleCita = (id: number) => {
  emits('cita', id);
};

const openNewCita = () => {
  emits('programar');
};

const edit = (item: any) => {
  if (item) {
    form.id = item.id;
    form.altura = item.height.toString();
    form.peso = item.weight.toString();
    form.musculo = item.muscle.toString();
    form.grasa = item.fat.toString();
    form.porcentaje_grasa = item.average_fat.toString();
    form.cc = item.cc.toString();
    form.grasa_viceral = item.viseral_fat.toString();
    form.consumo_agua_id = item.water_consumption_id;
    form.ejercicio = item.excercise;
    form.notas_cliente = item.notes_client;
    form.notas_internas = item.notes_intern;
    form.cliente_id = item.client_id;
    form.fecha = item.date;
    prompt.value = true;
  }

  prompt.value = true;
};

const getDelete = (id: string) => {
  confirm.value = true;
  idCita.value = id;
};

const deleteCita = async () => {
  try {
    const data = await citaControlDataServices.deleteCita(idCita.value);

    if (data.code === 200) {
      await getItems();
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se elimino correctamente',
        position: 'top-right',
      });
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

  confirm.value = false;
  idCita.value = '';
};
</script>

<style scoped lang="scss">
.altura {
  height: 10px !important;
}
.title {
  font-size: 24px;
  font-weight: 600;
  color: black;
  line-height: 22px;
  text-align: start;
}

.subtitle {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #667085;
  line-height: 20px;
  text-align: start;
}
</style>
