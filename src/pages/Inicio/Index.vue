<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <h2 class="title">{{ msgLabel }}</h2>
        <p class="subtitle">
          Abre el panel y visualiza el progreso de la salud de tus pacientes
        </p>
      </div>

      <div class="col-lg-12 col-12 q-pr-none q-pr-lg-md">
        <card-consultas />
      </div>
      <!-- <div class="col-lg-3 col-6 q-pr-sm">
        <card-resumen-semanal />
      </div>
      <div class="col-lg-3 col-6 q-pl-sm">
        <card-resumen-mensual />
      </div> -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/* COMPONENTES */
import CardConsultas from 'components/inicio/CardConsultas.vue';
import CardResumenMensual from 'components/inicio/CardResumenMensual.vue';
import CardResumenSemanal from 'components/inicio/CardResumenSemanal.vue';

/* STORE */
import { useAuthStore } from 'stores/auth';
const store = useAuthStore();

const { getUser } = store;

const userNameLabel = computed(() => {
  return `${getUser.name} ${getUser.first_lastname}`;
});

const msgLabel = computed(() => {
  const horaActual = new Date().getHours();

  // Definir los límites para determinar si es de día, tarde o noche
  const limiteDia = 6; // 6 AM
  const limiteTarde = 18; // 6 PM

  // Determinar si es de día, tarde o noche
  let periodoDelDia;

  if (horaActual < limiteDia) {
    periodoDelDia = 'Buenas noches';
  } else if (horaActual < limiteTarde) {
    periodoDelDia = 'Buenos días';
  } else {
    periodoDelDia = 'Buenas tardes';
  }

  return `${periodoDelDia} ${userNameLabel.value}!`;
});
</script>
<style scoped lang="scss">
.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 29.05px;
}

.subtitle {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 10px;
}
</style>
