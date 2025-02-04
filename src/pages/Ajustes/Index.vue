<template>
  <q-page>
    <TableColaborador />
    <TableConsultorio />
  </q-page>
</template>

<script setup lang="ts">
import TableColaborador from '../../components/TableColaborador.vue';
import TableConsultorio from '../../components/TableConsultorio.vue';
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}
</style>
