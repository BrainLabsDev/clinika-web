<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { pacienteDataServices } from 'src/services/PacienteDataService';
import { nutriDataServices } from '../services/NutriDataService';
import { clinicDataServices } from '../services/ClinicDataService';

import { useQuasar } from 'quasar';
import { IPaciente } from 'src/Interfaces/Paciente';
import ModalBase from './common/ModalBase.vue';
const $q = useQuasar();
const router = useRouter();

const columns = [
  {
    name: 'nombre',
    label: 'Nombre completo',
    field: 'nombre',
    align: 'left',
  },
  {
    name: 'cita',
    label: 'Última cita',
    field: 'cita',
    align: 'center',
  },
  {
    name: 'consultorio',
    label: 'Consultorio',
    field: 'consultorio',
    align: 'center',
  },
  {
    name: 'nutricionista',
    label: 'Nutricionista',
    field: 'nutricionista',
    align: 'center',
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    field: 'telefono',
    align: 'center',
  },
  {
    name: 'email',
    label: 'Correo electrónico',
    field: 'email',
    align: 'center',
  },
  { name: 'accion', label: '', align: 'center' },
];

const search = ref('');

const acceso = ref(null);
const consultorio = ref(null);
const colaborador = ref(null);
const showFilters = ref(false);
const confirm = ref(false);
const idPaciente = ref('');
const options = [
  { label: 'Todos', value: null },
  { label: 'Activos', value: true },
  { label: 'Inactivos', value: false },
];

const loading = ref(false);
const items = ref<IPaciente[]>([]);
const nutricionistas = ref<any[]>([]);
const consultorios = ref<any[]>([]);

onMounted(async () => {
  await getItems();
});

const getItems = async () => {
  loading.value = true;
  try {
    const data = await pacienteDataServices.getAll();

    if (data.code === 200) {
      items.value = data.data;
      // console.log(data.data)
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

const getNutricionistas = async () => {
  try {
    const data = await nutriDataServices.getNutriologas();

    if (data.code === 200) {
      nutricionistas.value = data.data;
      // console.log(data.data)
    }
  } catch (error) {
    console.log(error);
  }
};

const getConsultorios = async () => {
  try {
    const data = await clinicDataServices.getClinics();

    if (data.code === 200) {
      consultorios.value = data.data;
      // console.log(data.data)
    }
  } catch (error) {
    console.log(error);
  }
};

const getPerfil = (id: string) => {
  router.push({ name: 'PerfilPaciente', params: { id } });
};

const getDelete = (id: string) => {
  confirm.value = true;
  idPaciente.value = id;
};

const deleteUser = async () => {
  try {
    const data = await pacienteDataServices.deleteUser(idPaciente.value);
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
  idPaciente.value = '';
};
</script>
<template>
  <div class="q-mt-lg q-pt-lg">
    <div class="row justify-between items-center">
      <p class="text-black text-bold text-h5">Lista de pacientes</p>

      <div class="row">
        <q-input
          class="q-mr-sm"
          v-model="search"
          outlined
          dense
          label="Buscar paciente"
          bg-color="white"
          style="width: 300px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          :to="{ name: 'NuevoPaciente' }"
          label="Nuevo paciente"
          color="primary"
          :icon="'add'"
          style="text-transform: inherit"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mt-sm" v-if="showFilters">
      <div class="col-2">
        <q-select
          class="q-mr-xs"
          v-model="acceso"
          :options="options"
          outlined
          dense
          label="Acceso"
          bg-color="white"
          emit-value
          map-options
        >
        </q-select>
      </div>

      <div class="col-4">
        <q-select
          outlined
          dense
          v-model="consultorio"
          bg-color="white"
          label="Consultorio"
          :options="
            consultorios.map((item) => {
              return {
                label: item.name,
                value: item.name,
              };
            })
          "
          emit-value
          map-options
          clearable
        />
      </div>
      <div class="col-4">
        <q-select
          outlined
          dense
          v-model="colaborador"
          bg-color="white"
          label="Nutricionistas"
          :options="
            nutricionistas.map((item) => {
              return {
                label: item.nombre,
                value: item.nombre,
              };
            })
          "
          emit-value
          map-options
          clearable
        />
      </div>
    </div>
  </div>
  <div class="q-mt-lg">
    <q-table
      flat
      :rows="items"
      :columns="columns"
      row-key="name"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[10, 15, 30, 50]"
    >
      <template v-slot:body-cell-nombre="props">
        <q-td key="nombre" :props="props">
          {{ props.row.nombre_completo }}
        </q-td>
      </template>
      <template v-slot:body-cell-consultorio="props">
        <q-td key="consultorio" :props="props">
          {{ props.row.consultorio?.nombre }}
        </q-td>
      </template>
      <template v-slot:body-cell-nutricionista="props">
        <q-td key="nutricionista" :props="props">
          {{ props.row.nutricionista?.nombre }}
        </q-td>
      </template>
      <template v-slot:body-cell-cita="props">
        <q-td key="cita" :props="props">
          {{
            props.row.cita?.fecha === null
              ? 'No hay registro'
              : props.row.cita.fecha
          }}
        </q-td>
      </template>

      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            round
            color="primary"
            :icon="'o_visibility'"
            size="sm"
            @click="getPerfil(props.row.id)"
          />
          <q-btn
            round
            color="red"
            :icon="'o_delete'"
            size="sm"
            class="q-ml-sm"
            @click="getDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <ModalBase v-model="confirm">
    <template #content>
      <div class="row justify-center">
        <q-icon color="warning" name="warning" size="100px" />
      </div>
      <div class="row justify-center">
        <div class="subtitle">Se eliminará el siguiente registro</div>
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
        @click="deleteUser"
        style="max-width: 48%; text-transform: inherit"
      />
    </template>
  </ModalBase>
</template>

<style lang="scss" scoped>
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
</style>
