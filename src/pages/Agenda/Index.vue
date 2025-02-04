<template>
  <q-page>
    <div class="q-mt-sm q-pt-sm">
      <div class="row justify-between items-center">
        <p class="text-black text-bold text-h5">Agenda</p>

        <div class="row">
          <q-btn
            @click="prompt = !prompt"
            label="Nueva cita"
            color="primary"
            :icon="'add'"
            style="text-transform: inherit"
          />
        </div>
      </div>
    </div>

    <AgendaCalendar
      :events="events"
      :is-loading="loading"
      @event-edit="openModalEdit"
      @event-delete="openModalEliminacion"
    />

    <FormularioNuevaCita
      :prompt="prompt"
      :event="eventSelected"
      :clients="clients"
      :id-new-client="idNewClient"
      @close="closeModal"
      @new-patient="openModalClient"
      @submit="submit"
      @update="update"
    />

    <FormularioRegistroRapido
      :prompt="promptRegistroRapido"
      @close="closeModalClient"
      @submit="submitRegistroRapido"
    />

    <ModalEliminacion
      :prompt="promptEliminacion"
      :id="idEventEliminate"
      @close="promptEliminacion = false"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import AgendaCalendar from 'src/components/agenda/AgendaCalendar.vue';
import FormularioNuevaCita from 'src/components/agenda/FormularioNuevaCita.vue';
import FormularioRegistroRapido from 'src/components/agenda/FormularioRegistroRapido.vue';
import ModalEliminacion from 'src/components/agenda/ModalEliminacion.vue';
import { pacienteDataServices } from 'src/services/PacienteDataService';
import { IPaciente } from 'src/Interfaces/Paciente';
import { citaAgendaDataServices } from 'src/services/CitaAgendaDataService';

interface ICliente {
  id?: number | null;
  nombre?: string;
  apellido?: string;
  nombre_completo?: string;
  img?: string;
}

const loading = ref(false);
const prompt = ref(false);
const promptEliminacion = ref(false);
const promptRegistroRapido = ref(false);
const idNewClient = ref<Number | null>(null);
const idEventEliminate = ref(null);
const eventNewClient = [
  {
    id: 0,
    nombre_completo: 'Nuevo cliente',
  },
];

const clients = computed(() => {
  return [...eventNewClient, ...items.value];
});

const items = ref<ICliente[]>([]);

const events = ref([]);

let eventSelected = reactive({
  id: null,
  cliente: null,
});

const submit = async (form: any) => {
  loading.value = true;
  const fechaStartFormateada = form.fecha.replace(/\//g, '-');

  const payload = {
    fecha_consulta: fechaStartFormateada,
    hora_start: form.horaStart,
    hora_end: form.horaEnd,
    paciente_id: form.cliente.id,
    nutriologo_id: form.nutricionista.value,
    clinica_id: form.lugar.value,
    notas: form.notas,
    estado_consulta: form.estado,
    videoconferencia: '',
    google_calendar: '',
  };

  const data = await citaAgendaDataServices.save(payload);

  if (data.code === 200) {
    await getCitas();
    prompt.value = false;
    loading.value = false;
  }
};
const update = async (form: any, id: number) => {
  loading.value = true;
  const fechaStartFormateada = form.fecha.replace(/\//g, '-');

  const payload = {
    fecha_consulta: fechaStartFormateada,
    hora_start: form.horaStart,
    hora_end: form.horaEnd,
    paciente_id: form.cliente.id,
    nutriologo_id: form.nutricionista.value,
    clinica_id: form.lugar.value,
    notas: form.notas,
    estado_consulta: form.estado,
    videoconferencia: '',
    google_calendar: '',
  };

  const data = await citaAgendaDataServices.update(id, payload);

  if (data.code === 200) {
    await getCitas();
    prompt.value = false;
    loading.value = false;
  }
};

const closeModal = () => {
  prompt.value = false;
};

const openModalEdit = (id: number) => {
  eventSelected = events.value.find((item) => item.id === id);

  prompt.value = true;
};

const openModalEliminacion = (id) => {
  idEventEliminate.value = id;
  promptEliminacion.value = true;
};

const openModalClient = () => {
  prompt.value = false;
  promptRegistroRapido.value = true;
};

const closeModalClient = () => {
  promptRegistroRapido.value = false;
};

const submitRegistroRapido = async (form: IPaciente) => {
  await getItems();
  idNewClient.value = form.id as number;
  promptRegistroRapido.value = false;
  prompt.value = true;
};

onMounted(async () => {
  await getItems();
  await getCitas();
});

const getCitas = async () => {
  loading.value = true;
  try {
    const data = await citaAgendaDataServices.getAll();

    if (data.code === 200) {
      events.value = data.data.map((item) => {
        return {
          title: items.value.find((i) => i.id === item.client_id)
            ?.nombre_completo,
          with: 'Nutriólogo',
          topic: item.status,
          time: {
            start: `${item.date} ${item.start_time}`,
            end: `${item.date} ${item.end_time}`,
          },
          colorScheme:
            item.status.toLowerCase() === 'confirmada'
              ? 'confirmada'
              : item.status.toLowerCase() === 'no confirmada'
              ? 'noConfirmada'
              : 'cancelada',
          id: item.id,
          description: item.notas,
          lugar: item.consultive_room_id,
          isEditable: true,
          data: item,
        };
      });
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

const getItems = async () => {
  loading.value = true;
  try {
    const data = await pacienteDataServices.getAll();

    if (data.code === 200) {
      items.value = data.data.map((item) => {
        return {
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido_paterno,
          nombre_completo: item.nombre_completo,
        };
      });
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}
</style>
