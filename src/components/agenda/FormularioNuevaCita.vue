<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 900px; background-color: #f5f5f5" class="q-pa-lg">
      <q-card-section>
        <div class="title">
          {{ !isEdit ? 'Programar nueva consulta' : 'Actualizar cita' }}
        </div>
        <div class="subtitle">
          {{
            !isEdit
              ? 'Datos para la programación de una nueva consulta'
              : 'Datos para la actualización de la consulta'
          }}
        </div>
      </q-card-section>

      <q-form ref="myForm">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-6 q-mt-md">
            <label for="" class="c_label">Cliente</label>
            <q-select
              filled
              fill-input
              input-debounce="0"
              v-model="form.cliente"
              placeholder="Buscar cliente"
              use-input
              hide-selected
              @filter="filterFn"
              :disable="isEdit"
              :options="options"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No se encuentra el cliente
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar v-if="scope.opt?.img">
                    <q-avatar>
                      <img :src="scope.opt.img" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="font-size: 14px">{{
                      scope.opt.label
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-6 q-mt-md">
            <label for="" class="c_label">Videoconferencia</label>
            <q-input v-model="form.videoconferencia" filled dense>
              <template v-slot:prepend>
                <q-icon name="videocam" />
              </template>
            </q-input>
          </div>
          <div class="col-6 q-mt-md">
            <label for="" class="c_label">Fecha de consulta</label>
            <q-input
              filled
              v-model="form.fecha"
              mask="date"
              :rules="['date']"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="form.fecha">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-3 q-mt-md">
            <label for="" class="c_label">Hora de inicio</label>
            <q-select
              filled
              dense
              v-model="form.horaStart"
              :options="horarios"
              :options-dense="true"
            >
              <template v-slot:prepend>
                <q-icon name="access_time" />
              </template>
            </q-select>
            <!-- <q-input
              filled
              v-model="form.horaStart"
              mask="time"
              :rules="['time']"
              dense
              error-message="Hora invalida"
            >
              <template v-slot:prepend>
                <q-icon name="access_time"> </q-icon>
              </template>
            </q-input> -->
          </div>
          <div class="col-3 q-mt-md">
            <label for="" class="c_label">Hora de terminación</label>
            <q-select
              filled
              dense
              v-model="form.horaEnd"
              :options="horarios"
              :options-dense="true"
            >
              <template v-slot:prepend>
                <q-icon name="access_time" />
              </template>
            </q-select>
          </div>

          <div class="col-6">
            <label for="" class="c_label">Nutricionista</label>
            <q-select
              filled
              dense
              v-model="form.nutricionista"
              :options="lista_nutricionistas"
            >
              <template v-slot:prepend>
                <q-icon name="manage_accounts" />
              </template>
            </q-select>
          </div>

          <div class="col-6">
            <label for="" class="c_label">Estado de la consulta</label>
            <q-select filled dense v-model="form.estado" :options="status">
              <template v-slot:prepend>
                <q-icon name="manage_accounts" />
              </template>
            </q-select>
          </div>

          <!-- <div class="col-6">
            <label for="" class="c_label">Lugar de consulta</label>
            <q-select
              filled
              dense
              v-model="form.lugar"
              :options="lista_consultorios"
            >
              <template v-slot:prepend>
                <q-icon name="manage_accounts" />
              </template>
            </q-select>
          </div> -->

          <div class="col-12 q-mt-md">
            <q-expansion-item
              class="overflow-hidden"
              icon="description"
              label="Añadir notas de programación a la consulta"
              header-class="bg-white text-black"
              expand-icon-class="text-black"
              default-opened
            >
              <q-card>
                <q-card-section>
                  <q-input
                    placeholder="Notas de la consulta"
                    filled
                    color="white"
                    v-model="form.notas"
                  >
                  </q-input>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </q-card-section>
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
            :label="form.id === null ? 'Guardar' : 'Actualizar'"
            @click="submit"
            class="full-width"
            style="max-width: 48%; text-transform: inherit"
            :disable="disabled"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { IClinic } from 'src/Interfaces/Clinic';
import { INutri } from 'src/Interfaces/Nutri';
import { IPaciente } from 'src/Interfaces/Paciente';
import { clinicDataServices } from 'src/services/ClinicDataService';
import { nutriDataServices } from 'src/services/NutriDataService';
import { ref, reactive, computed, watch, onMounted } from 'vue';

/* PROPS */
const props = defineProps({
  prompt: {
    type: Boolean,
    default: false,
  },
  event: {
    type: Object,
    default: () => {},
  },
  clients: {
    type: Array<IPaciente>,
    default: () => [],
  },
  idNewClient: {
    type: Number || null,
    default: null,
  },
});

const horarios = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

/* EMITS */
const emit = defineEmits(['close', 'submit', 'newPatient', 'update']);

/* CATALOGOS */
const consultorios = ref<IClinic[]>([]);
const nutricionistas = ref<INutri[]>([]);

const lista_consultorios = computed(() => {
  return consultorios.value.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});

const lista_nutricionistas = computed(() => {
  return nutricionistas.value.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});

const status = ['Confirmada', 'No Confirmada', 'Cancelada'];

const options = ref(props.clients);

/* DATA */
const modal = ref(false);
const form = reactive({
  id: null,
  cliente: null,
  videoconferencia: null,
  url: null,
  fecha: '',
  horaStart: '08:00',
  horaEnd: '09:00',
  lugar: null,
  notas: '',
  estado: 'No Confirmada',
  sincronizar: false,
  nutricionista: null,
});

const clients = computed(() => {
  return props.clients.map((item) => {
    return {
      ...item,
      label: item.nombre_completo,
      value: item.id,
    };
  });
});

const closeModal = () => {
  clearForm();
  emit('close');
};

const clearForm = () => {
  form.id = null;
  form.cliente = null;
  form.videoconferencia = null;
  form.url = null;
  form.fecha = '';
  form.horaStart = '08:00';
  form.horaEnd = '09:00';
  form.lugar = null;
  form.notas = null;
  form.estado = 'No Confirmada';
  form.sincronizar = false;
};

const disabled = computed(() => {
  if (
    form.cliente === null ||
    form.fecha === null ||
    form.horaStart === null ||
    form.horaStart === '' ||
    form.horaEnd === null ||
    form.horaEnd === '' ||
    form.lugar === null ||
    form.estado === null ||
    validHoraStart.value === false ||
    validHoraEnd.value === false
  ) {
    return true;
  }
});

const isEdit = computed(() => {
  return form.id !== null;
});

const validHoraStart = computed(() => {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (form?.horaStart === null) {
    return false;
  }
  return regex.test(form?.horaStart);
});

const validHoraEnd = computed(() => {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (form?.horaEnd === null) {
    return false;
  }
  return regex.test(form?.horaEnd);
});

const fechaActual = computed(() => {
  const today = new Date();

  // Extraer el año, mes y día de la fecha actual
  const year = today.getFullYear();
  // El mes es devuelto en base 0 (enero es 0, diciembre es 11), así que sumamos 1
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Agrega un 0 si es necesario
  const day = String(today.getDate()).padStart(2, '0'); // Agrega un 0 si es necesario

  // Formatear la fecha al formato "YYYY/MM/DD"
  return `${year}/${month}/${day}`;
});

function filterFn(val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    options.value = clients.value.filter(
      (v) => v.nombre_completo.toLowerCase().indexOf(needle) > -1
    );
  });
}

function optionsFnTime2(hr, min, sec) {
  if (hr < 6 || hr > 18 || (hr === 18 && min > 0)) {
    return false;
  }
  if (min !== null && (min < 0 || min > 59)) {
    return false;
  }
  return true;
}

onMounted(() => {
  // form.fecha = fechaActual.value;
  getConsultorios();
  getNutris();
});

const getConsultorios = async () => {
  const data = await clinicDataServices.getClinics();
  if (data.code === 200) {
    consultorios.value = data.data;
  }
};

const getNutris = async () => {
  const data = await nutriDataServices.getNutriologas();
  if (data.code === 200) {
    nutricionistas.value = data.data;
  }
};

const submit = async () => {
  if (props.event.data?.id) {
    emit('update', form, props.event.data?.id);
  } else {
    emit('submit', form);
  }
};

/* WATCHERS */
watch(
  () => props.prompt,
  () => {
    modal.value = props.prompt;

    if (!props.prompt) {
      clearForm();
    } else {
      form.fecha = fechaActual.value;
    }
  }
);

watch(
  () => props.idNewClient,
  () => {
    if (props.idNewClient !== null) {
      const newClient = clients.value.find(
        (item) => item.id === props.idNewClient
      );
      form.fecha = fechaActual.value;

      form.cliente = {
        ...newClient,
        label: newClient.nombre_completo,
        value: newClient.id,
      };
    }
  }
);

watch(
  () => props.event,
  () => {
    if (props.event.id !== null) {
      form.id = props.event.id;
      form.cliente = clients.value.find(
        (item) => item.value === props.event.data.client_id
      );
      form.videoconferencia = null;
      form.url = null;
      form.fecha = props.event.time.start.split(' ')[0];
      form.horaStart = props.event.time.start.split(' ')[1];
      form.horaEnd = props.event.time.end.split(' ')[1];
      form.lugar = lista_consultorios.value.find(
        (item) => item.value === props.event.data.consultive_room_id
      );
      form.nutricionista = lista_nutricionistas.value.find(
        (item) => item.value === props.event.data.nutricionist_id
      );
      form.notas = props.event.data.notes;
      form.estado = props.event.topic;
      form.sincronizar = false;
    }
  },
  { immediate: true }
);

watch(
  () => form.cliente,
  () => {
    if (form?.cliente?.id === 0) {
      clearForm();
      emit('newPatient');
    }
  }
);
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
