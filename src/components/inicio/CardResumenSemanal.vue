<template>
  <div>
    <h2 class="title">Tu resumen semanal</h2>
    <q-card flat style="min-height: 320px; max-width: 100%">
      <div class="row q-pa-md">
        <div class="col-12">
          <span class="card-title">Esta semana( {{ fechaLabel }} )</span>
          <span class="card-subtitle"
            >Mira las principales estadísticas de la semana</span
          >
        </div>
        <div class="col-12" v-for="item in data">
          <span class="data-valor">{{ item.valor }}</span>
          <span class="data-label">{{ item.nombre }}</span>
          <q-separator />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fechaLabel = ref('6 al 10 de septiembre');

const data = ref([
  {
    id: 1,
    nombre: 'Pacientes nuevos',
    valor: 44,
  },
  {
    id: 2,
    nombre: 'Pacientes recurrentes',
    valor: 13,
  },
  {
    id: 3,
    nombre: 'Pacientes totales',
    valor: 57,
  },
]);
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 29.05px;
}

.card-title {
  display: block;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 2px;
  line-height: 25px;
}

.card-subtitle {
  font-size: 16px;
  font-weight: 300;
  line-height: 19px;
}

.data-valor {
  display: block;
  font-size: 28px;
  font-weight: 400;
  margin: 10px 0px;
  line-height: 28px;
}
.data-label {
  display: block;
  font-size: 16px;
  font-weight: 300;
  line-height: 19px;
  margin: 5px 0px;
}
</style>
