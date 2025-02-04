<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';

import { useQuasar } from 'quasar';
import ModalDeleteUser from './ModalDeleteUser.vue';
import ModalUser from './ModalUser.vue';
import { userDataServices } from 'src/services/userDataService';
const $q = useQuasar();

const columns = [
  {
    name: 'name',
    label: 'Nombre completo',
    field: 'name',
    align: 'left',
  },
  {
    name: 'email',
    align: 'center',
    label: 'Email',
    field: 'email',
  },
  { name: 'phone', label: 'Teléfono', field: 'phone', align: 'center' },
  { name: 'accion', label: 'Acción', align: 'center' },
];

const items = ref<any[]>([]);

const loading = ref(false);
const active = ref(true);

const openModalDelete = ref(false);
const openModalUser = ref(false);

onMounted(async () => {
  await getItems();
});

const getItems = async () => {
  loading.value = true;
  try {
    const data = await userDataServices.showAllUser();

    console.log(data);

    if (data.code === 200) {
      items.value = data.data.filter(
        (user: any) => user.role === 'Nutricionista'
      );
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>

<template>
  <div class="q-mt-lg q-pt-lg row justify-between">
    <span class="text-black text-bold text-h5">Gestión de cuentas</span>
    <q-btn
      label="Nueva cuenta"
      color="primary"
      :icon="'add'"
      style="text-transform: inherit"
      @click="openModalUser = true"
    ></q-btn>
  </div>

  <div class="q-mt-lg">
    <q-table
      flat
      :rows="items"
      :columns="columns"
      row-key="name"
      :hide-pagination="true"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[5]"
    >
      <template v-slot:body-cell-name="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <!-- <q-toggle
            v-model="active"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
          /> -->
          <q-btn
            round
            color="red"
            :icon="'o_delete'"
            size="sm"
            class="q-ml-sm"
            @click="openModalDelete = true"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <ModalDeleteUser v-model="openModalDelete" />
  <ModalUser v-model="openModalUser" />
</template>

<style lang="scss" scoped></style>
