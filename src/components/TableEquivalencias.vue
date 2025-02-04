<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { eqNuDataService } from 'src/services/EqNuDataService';
import { citaControlDataServices } from 'src/services/CitaControlDataService';
const $q = useQuasar();
const props = defineProps({
  id: {
    type: String || Number,
    required: false,
  },
  cita: {
    type: String,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['showEquivalencias']);

const columns = [
  {
    name: 'alimentos',
    label: 'Alimentos',
    field: 'alimentos',
    align: 'left',
  },
  {
    name: 'desayuno',
    label: 'Desayuno',
    field: 'desayuno',
    align: 'center',
  },
  {
    name: 'media_manana',
    label: 'Media mañana',
    field: 'media_manana',
    align: 'center',
  },
  {
    name: 'almuerzo',
    label: 'Almuerzo',
    field: 'almuerzo',
    align: 'center',
  },
  {
    name: 'media_tarde',
    label: 'Media tarde',
    field: 'media_tarde',
    align: 'center',
  },
  {
    name: 'cena',
    label: 'Cena',
    field: 'cena',
    align: 'center',
  },
  {
    name: 'merienda_noche',
    label: 'Media noche',
    field: 'merienda_noche',
    align: 'center',
  },

  {
    name: 'total',
    label: 'Total',
    field: 'total',
    align: 'center',
  },
];

const loading = ref(false);
const cita_control_id = ref<string | number | null>(null);
const equivalencia_id = ref<string | number | null>(null);
const fecha = ref<string | number | null>(null);

watch(
  () => props.cita,
  async (newValue, oldValue) => {
    cita_control_id.value = newValue;

    getItems();
  }
);

const items = ref<any[]>([
  {
    alimentos: 'Carbohidratos',
    desayuno: '',
    media_mañana: '',
    almuerzo: '',
    media_tarde: '',
    cena: '',
    media_noche: '',
  },
  {
    alimentos: 'Frutas',
    desayuno: '',
    media_mañana: '',
    almuerzo: '',
    media_tarde: '',
    cena: '',
    media_noche: '',
  },
  {
    alimentos: 'Vegetales',
    desayuno: '',
    media_mañana: '',
    almuerzo: '',
    media_tarde: '',
    cena: '',
    media_noche: '',
  },
  {
    alimentos: 'Lácteos',
    desayuno: '',
    media_mañana: '',
    almuerzo: '',
    media_tarde: '',
    cena: '',
    media_noche: '',
  },
  {
    alimentos: 'Proteínas',
    desayuno: '',
    media_mañana: '',
    almuerzo: '',
    media_tarde: '',
    cena: '',
    media_noche: '',
  },
  {
    alimentos: 'Grasas',
    desayuno: '',
    media_mañana: '',
    almuerzo: '',
    media_tarde: '',
    cena: '',
    media_noche: '',
  },
]);

onMounted(async () => {
  const data = await citaControlDataServices.getAll(props.id as string);
  if (data.code === 200) {
    cita_control_id.value = data.data.reverse()[0]?.id ?? null;
  }
  await getItems();
});

const getItems = async () => {
  loading.value = true;
  if (cita_control_id.value !== null)
    try {
      const data = await eqNuDataService.getByCita(
        cita_control_id.value as string
      );

      if (data.code === 200) {
        fecha.value = data.data.cita_control.date;

        equivalencia_id.value = data.data.equivalencias_nutricionales[0].id;

        const comidas = [
          'breakfast',
          'mid_lunch',
          'lunch',
          'mid_dinner',
          'dinner',
          'snack',
        ];

        const equivalencias = data.data.equivalencias_nutricionales[0];

        const [breakfast, mid_lunch, lunch, mid_dinner, dinner, snack] =
          comidas.map((comida) => JSON.parse(equivalencias[comida]));

        const atributos = [
          'carbohidratos',
          'frutas',
          'vegetales',
          'lacteos',
          'proteinas',
          'grasas',
        ];

        atributos.forEach((atributo, index) => {
          items.value[index].desayuno = breakfast[atributo];
          items.value[index].media_mañana = mid_lunch[atributo];
          items.value[index].almuerzo = lunch[atributo];
          items.value[index].media_tarde = mid_dinner[atributo];
          items.value[index].cena = dinner[atributo];
          items.value[index].merienda_noche = snack[atributo];
        });

        emit('showEquivalencias', items.value);
      } else {
        equivalencia_id.value = null;
        fecha.value = null;

        const comidas = [
          'desayuno',
          'media_mañana',
          'almuerzo',
          'media_tarde',
          'cena',
          'merienda_noche',
        ];

        items.value.forEach((item) => {
          comidas.forEach((comida) => {
            item[comida] = '';
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  loading.value = false;
};

const submit = async () => {
  try {
    const comidas = [
      'desayuno',
      'media_mañana',
      'almuerzo',
      'media_tarde',
      'cena',
      'merienda_noche',
    ];

    const categorias = [
      'carbohidratos',
      'frutas',
      'vegetales',
      'lacteos',
      'proteinas',
      'grasas',
    ];

    const data = {
      cita_control_id: cita_control_id.value,
    };

    comidas.forEach((comida) => {
      // @ts-ignore
      data[comida] = {};
      categorias.forEach((categoria, index) => {
        // @ts-ignore
        data[comida][categoria] = items.value[index][comida] || 0;
      });
    });

    if (equivalencia_id.value === null) {
      const res = await eqNuDataService.save(data);
      if (res.code === 201) {
        await getItems();
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Equivalencia nutricional agregada correctamente',
          position: 'top-right',
        });
      }
    } else {
      const res = await eqNuDataService.update(equivalencia_id.value, data);
      if (res.code === 200) {
        await getItems();
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Equivalencia nutricional actualizada correctamente',
          position: 'top-right',
        });
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
};
</script>
<template>
  <div class="q-mt-md q-mb-md">
    <span class="text-black text-bold text-h5"
      >Equivalencias nutricionales
      {{ fecha === null ? '' : ` del ${fecha}` }}</span
    >
  </div>
  <div class="q-mt-md">
    <q-table
      flat
      :rows="items"
      :columns="columns"
      row-key="name"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      :rows-per-page-options="[6]"
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="alimentos" :props="props">{{ props.row.alimentos }}</q-td>
          <q-td key="desayuno" :props="props">
            {{ props.row.desayuno }}
            <q-popup-edit v-model="props.row.desayuno" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="media_manana" :props="props">
            {{ props.row.media_mañana }}
            <q-popup-edit v-model="props.row.media_mañana" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="almuerzo" :props="props">
            {{ props.row.almuerzo }}
            <q-popup-edit v-model="props.row.almuerzo" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="media_tarde" :props="props">
            {{ props.row.media_tarde }}
            <q-popup-edit v-model="props.row.media_tarde" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="cena" :props="props">
            {{ props.row.cena }}
            <q-popup-edit v-model="props.row.cena" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="merienda_noche" :props="props">
            {{ props.row.merienda_noche }}
            <q-popup-edit v-model="props.row.merienda_noche" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="total" :props="props">{{
            Number(props.row.desayuno || 0) +
            Number(props.row.media_mañana || 0) +
            Number(props.row.almuerzo || 0) +
            Number(props.row.media_tarde || 0) +
            Number(props.row.cena || 0) +
            Number(props.row.merienda_noche || 0)
          }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <div class="row justify-end q-mt-md">
    <q-btn
      color="primary"
      @click="submit"
      :disable="cita_control_id === null"
      style="text-transform: inherit"
      >{{
        equivalencia_id ? 'Actualizar Equivalencias' : 'Guardar Equivalencias'
      }}</q-btn
    >
  </div>
</template>

<style scoped lang="scss">
table tbody tr td:nth-child(1) {
  /* Estilos para la segunda columna */
  background-color: #e2e8f0;
  color: black;
  font-weight: 500;
}
</style>
