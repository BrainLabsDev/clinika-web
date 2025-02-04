<template>
  <q-page>
    <BotonBack url="/pacientes" />
    <div class="row justify-between items-center q-mx-md q-mt-sm q-mb-md">
      <span class="text-black text-bold text-h5">Resumen del paciente</span>
      <q-btn
        color="primary"
        label="Editar paciente"
        text-color="white"
        size="md"
        :icon="'o_edit'"
        class="text-capitalize"
        :to="{ name: 'PerfilEditarPaciente', params: { id: paciente.id } }"
      />
    </div>

    <!-- CONTAINER -->
    <div class="row q-mx-sm q-mt-sm">
      <!-- INFORMACIÓN DEL PACIENTE -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="contact_page"
          label="Datos generales"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px">
            <q-card-section>
              <div class="row">
                <div class="col-3">
                  <q-avatar size="80px" class="q-mt-sm">
                    <img :src="avatar" />
                  </q-avatar>
                </div>
                <div class="col-9">
                  <div class="row">
                    <div class="col-12 q-mb-sm">
                      <span class="text-weight-bold text-title-analisis">
                        {{ paciente.nombre_completo }}
                      </span>
                    </div>
                    <div class="col-4">
                      <span class="label-info">
                        <q-icon name="fact_check" color="primary" />
                        {{
                          paciente.num_identificacion
                            ? paciente.num_identificacion
                            : 'N/A'
                        }}
                      </span>
                      <span class="label-info">
                        <q-icon
                          :name="paciente.sexo === 'M' ? 'man' : 'woman'"
                          color="primary"
                        />
                        {{
                          paciente.sexo
                            ? paciente.sexo === 'M'
                              ? 'Hombre'
                              : 'Mujer'
                            : 'N/A'
                        }}
                      </span>
                      <span class="label-info">
                        <q-icon name="cake" color="primary" />
                        {{ getEdad }}
                      </span>
                      <span class="label-info">
                        <q-icon name="work" color="primary" />
                        {{ paciente.profesion ?? 'N/A' }}
                      </span>
                    </div>
                    <div class="col-8">
                      <span class="label-info">
                        <q-icon name="public" color="primary" />
                        {{ paciente.lugar_residencia ?? 'N/A' }}
                      </span>

                      <span class="label-info">
                        <q-icon name="phone" color="primary" />
                        {{ paciente.telefono }}
                      </span>
                      <span class="label-info">
                        <q-icon name="emoji_events" color="primary" />
                        {{ paciente.objetivo?.descripcion || 'N/A' }}
                      </span>
                      <span class="label-info" style="font-size: 13px">
                        <q-icon name="email" color="primary" />
                        {{ paciente.email }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- PERFIL MEDICO -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="medical_services"
          label="Perfil Médico"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px">
            <q-card-section>
              <div class="row q-ml-md">
                <div class="col-6">
                  <span class="text-title2-analisis">
                    Alergias o intolerancias</span
                  >
                  <template v-if="getAlergias">
                    <p v-for="txt in getAlergias" class="label-info font-bold">
                      {{ txt }}
                    </p>
                  </template>
                </div>

                <div class="col-6">
                  <span class="text-title2-analisis">
                    Trastornos alimenticios</span
                  >
                  <!-- <span class="label-info font-bold">
                    {{ getDesordenes }}
                  </span> -->
                  <template v-if="getDesordenes">
                    <p
                      v-for="txt in getDesordenes"
                      class="label-info font-bold"
                    >
                      {{ txt }}
                    </p>
                  </template>
                </div>

                <div class="col-6 q-mt-md">
                  <span class="text-title2-analisis">Condiciones médicas</span>
                  <!-- <span class="label-info font-bold">
                    {{ getCondicionesMedicas }}
                  </span> -->
                  <template v-if="getCondicionesMedicas">
                    <p
                      v-for="txt in getCondicionesMedicas"
                      class="label-info font-bold"
                    >
                      {{ txt }}
                    </p>
                  </template>
                </div>

                <div class="col-6 q-mt-md">
                  <span class="text-title2-analisis">Medicamentos</span>
                  <!-- <span class="label-info font-bold">
                    {{ getMedicinas }}
                  </span> -->
                  <template v-if="getMedicinas">
                    <p v-for="txt in getMedicinas" class="label-info font-bold">
                      {{ txt }}
                    </p>
                  </template>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- HÁBITOS -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="self_improvement"
          label="Hábitos"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px">
            <q-card-section>
              <div class="row q-ml-md">
                <div class="col-6">
                  <span class="text-title2-analisis">
                    Horas de sueño diarias</span
                  >
                  <span class="label-info font-bold">
                    {{ paciente.horas_de_sueno?.descripcion || 'N/A' }}
                  </span>
                </div>

                <div class="col-6">
                  <span class="text-title2-analisis">
                    Actividad física semanal</span
                  >
                  <span class="label-info font-bold">
                    {{ paciente.actividad_fisica?.descripcion || 'N/A' }}
                  </span>
                </div>

                <div class="col-6 q-mt-sm">
                  <span class="text-title2-analisis"> Consumo de alcohol</span>
                  <span class="label-info font-bold">
                    {{ paciente.consumo_alcohol?.descripcion || 'N/A' }}
                  </span>
                </div>

                <div class="col-6 q-mt-sm">
                  <span class="text-title2-analisis">Fumador</span>
                  <span class="label-info font-bold">
                    {{ paciente.fumador?.descripcion || 'N/A' }}
                  </span>
                </div>

                <div class="col-6 q-mt-sm">
                  <span class="text-title2-analisis"
                    >Ingesta diaria del agua</span
                  >
                  <span class="label-info font-bold">
                    {{ paciente.consumo_de_agua_diario?.descripcion || 'N/A' }}
                  </span>
                </div>

                <div class="col-6 q-mt-sm">
                  <span class="text-title2-analisis">Estrés</span>
                  <span class="label-info font-bold">
                    {{ paciente.estres_general?.descripcion || 'N/A' }}
                  </span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- REGISTRO DE CONSUMO -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="description"
          label="Registro de consumo"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px; overflow-y: scroll">
            <q-card-section>
              <span
                class="text-weight-bold"
                style="font-size: 14px; color: #94a3b8; height: 180px"
                >{{
                  paciente.registro_consumo
                    ? paciente.registro_consumo
                    : 'No registrado'
                }}</span
              >
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- ANTECEDENTES -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="description"
          label="Antecedentes"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px; overflow-y: scroll">
            <q-card-section>
              <span
                class="text-weight-bold"
                style="font-size: 14px; color: #94a3b8"
                >{{
                  paciente.historial ? paciente.historial : 'No registrado'
                }}</span
              >
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- ÚLTIMOS ARCHIVOS -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="attach_file"
          label="Últimos archivos"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px">
            <q-card-section>
              <div class="row">
                <div class="col-12 text-center">
                  <q-icon
                    name="inventory"
                    size="60px"
                    class="q-mt-md"
                    color="primary"
                  ></q-icon>
                  <span
                    v-if="paciente.archivos === undefined"
                    class="text-weight-bold"
                    style="font-size: 14px; color: #94a3b8; display: block"
                    >{{ 'No hay archivos' }}</span
                  >
                  <span
                    v-else
                    class="text-weight-bold"
                    style="font-size: 14px; color: #94a3b8; display: block"
                    >{{ paciente.archivos?.length }} archivos</span
                  >
                </div>
              </div>
            </q-card-section>
            <q-card-actions class="absolute-bottom" align="center">
              <q-btn
                outline
                color="primary"
                icon="upload"
                style="text-transform: inherit"
                @click.prevent="openModalFile = true"
                >Subir archivo</q-btn
              >
              <q-btn
                :disabled="paciente.archivos === undefined"
                flat
                @click.prevent="openModalListFiles = true"
                color="primary"
                style="text-transform: inherit"
                >Ver Archivos</q-btn
              >
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- END REGISTRO DE CONSUMO && ANTECEDENTES -->
      <!-- TABLAS -->
      <div class="col-12 q-mt-md q-px-sm">
        <TableCitas :id="id" @cita="handleCita" @programar="openNewCita" />
      </div>
      <div class="col-12 col-md-8 q-mt-md q-px-sm q-mb-xs">
        <TableEquivalencias
          :id="id"
          :cita="idCita"
          @show-equivalencias="setEquivalencias"
        />
      </div>
      <div class="col-12 col-md-4 q-mt-md q-px-sm q-mb-xs">
        <div class="row">
          <div class="col-12 q-my-md">
            <span class="text-black text-bold text-h5"
              >Distribución de macronutrientes</span
            >
          </div>
          <div
            v-if="alimentosWithPercentage.length === 0"
            class="col-12 q-mb-md"
          >
            <span class="text-subtitle-analisis">No existen registros</span>
          </div>
          <div class="col-5">
            <ul>
              <li
                v-for="(item, index) in alimentosWithPercentage"
                style="list-style: none"
                class="q-mb-md"
              >
                <span
                  style="
                    font-size: 12px;
                    padding: 4px;
                    color: #fff;
                    font-weight: 600;
                    border-radius: 10px;
                  "
                  :style="`background-color: ${colors[index]}`"
                  >{{ item }}</span
                >
              </li>
            </ul>
          </div>
          <div class="col-7">
            <Doughnut
              v-if="loaded"
              id="my-chart-id"
              :options="chartOptions"
              :data="dataChartComputed"
            />
          </div>
        </div>
      </div>

      <!-- NEW CITA -->
      <ProgramarCita
        :prompt="prompt"
        :event="eventSelected"
        :clients="clients"
        @close="prompt = false"
        @submit="submitCita"
      />
    </div>
  </q-page>

  <ModalFileUpload v-model="openModalFile" @success="handleSuccess" :id="id" />
  <ModalListFiles v-model="openModalListFiles" :paciente="paciente" :id="id" />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue';

/* COMPONENTES */
import TableCitas from 'src/components/TableCitas.vue';
import BotonBack from 'src/components/common/BotonBack.vue';
import ProgramarCita from 'src/components/common/ProgramarCita.vue';
import TableEquivalencias from 'src/components/TableEquivalencias.vue';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip);

/* INTERFACES */
import { IPacienteRES } from 'src/Interfaces/Paciente';

/* SERVICIOS */
import { pacienteDataServices } from 'src/services/PacienteDataService';

import { useQuasar } from 'quasar';
import ModalFileUpload from 'src/components/paciente/ModalFileUpload.vue';
import ModalListFiles from 'src/components/paciente/ModalListFiles.vue';

const $q = useQuasar();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

/* DATA */
const idCita = ref('');
const openRA = ref(true);
const openModalFile = ref(false);
const openModalListFiles = ref(false);

const loaded = ref(false);

const prompt = ref(false);

const paciente = ref<IPacienteRES>({
  id: null,
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  nombre_completo: '',
  email: '',
  telefono: '',
  sexo: '',
  fecha_nacimiento: '',
  alergias: '',
  condiciones_medicas: '',
  medicinas: '',
  desordenes: '',
  registro_consumo: '',
  estatura: 160,
  historial: '',
  lugar_residencia: '',
  profesion: '',
  num_identificacion: '',

  estado_civil: '',

  cita: null,
  consultorio: null,
  nutricionista: null,
  suscripcion: null,

  objetivo: null,
  actividad_fisica: null,
  consumo_alcohol: null,
  fumador: null,
  consumo_de_agua_diario: null,
  estres_general: null,
  horas_de_sueno: null,
});

const dataGrafica = ref<number[]>([]);
const sumaTotal = ref(0);

const colors = [
  '#B53232',
  '#E69C2D',
  '#2BAD50',
  '#5845CF',
  '#45AECF',
  '#2831FF',
];

const dataChartComputed = computed(() => {
  return {
    title: 'Distribución de macronutrientes',
    labels: [...alimentosWithPercentage.value],
    datasets: [
      {
        backgroundColor: [...colors],
        data: [...dataGrafica.value],
        label: 'Macronutrientes',
      },
    ],
  };
});

const alimentosWithPercentage = computed(() => {
  const aliments = [
    'CARBOHIDRATOS',
    'FRUTAS',
    'VEGETALES',
    'LACTEOS',
    'PROTEINAS',
    'GRASAS',
  ];

  let data: any = [];

  data = dataGrafica.value.map((item, index) => {
    return {
      label: aliments[index],
      value: item,
      percentage: ((item / sumaTotal.value) * 100).toFixed(2),
    };
  });

  return data.map((item) => {
    return `${item.label} - ${item.percentage}%`;
  });
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const setEquivalencias = (items: any) => {
  loaded.value = false;

  dataGrafica.value = [];
  sumaTotal.value = 0;
  const labels = [
    'carbohidratos',
    'frutas',
    'vegetales',
    'lácteos',
    'proteínas',
    'grasas',
  ];

  const comidas = [
    'desayuno',
    'media_mañana',
    'almuerzo',
    'media_tarde',
    'cena',
    'merienda_noche',
  ];

  labels.map((label) => {
    let suma = 0;
    const data = items.filter(
      (item: any) => item.alimentos.toLowerCase() === label
    );

    comidas.forEach((comida) => {
      suma = Number(data[0][comida]) + suma;
    });

    dataGrafica.value.push(suma);
    sumaTotal.value = sumaTotal.value + suma;
  });

  loaded.value = true;
};

const handleCita = (id: string) => {
  idCita.value = id;
};

const handleSuccess = () => {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'check_circle',
    message: 'Archivo subido correctamente',
    position: 'top-right',
  });
  openModalFile.value = false;
  getPaciente();
};

onMounted(() => {
  getPaciente();
});

async function getPaciente() {
  const res = await pacienteDataServices.getById(props.id);

  if (res.code == 200) {
    paciente.value = res.data.user;
  }
}

function calcularEdad(fechaNacimiento: any) {
  var fechaActual = new Date();
  var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  // Verificar si aún no ha cumplido años en este año
  if (
    fechaActual.getMonth() < fechaNacimiento.getMonth() ||
    (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
      fechaActual.getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }

  return `${edad} años`;
}

/* COMPUTADAS */
const getEdad = computed(() => {
  if (paciente.value.fecha_nacimiento) {
    return calcularEdad(new Date(paciente.value.fecha_nacimiento));
  }
  return 'N/A';
});

const getAlergias = computed(() => {
  if (paciente.value.alergias) {
    return JSON.parse(paciente.value.alergias);
  }
  return ['Ninguna'];
});

const getDesordenes = computed(() => {
  if (paciente.value.desordenes) {
    return JSON.parse(paciente.value.desordenes);
  }
  return ['Ninguna'];
});

const getCondicionesMedicas = computed(() => {
  if (paciente.value.condiciones_medicas) {
    return JSON.parse(paciente.value.condiciones_medicas);
  }
  return ['Ninguna'];
});

const getMedicinas = computed(() => {
  if (paciente.value.medicinas) {
    return JSON.parse(paciente.value.medicinas);
  }
  return ['Ninguna'];
});

const avatar = computed(() => {
  return `https://ui-avatars.com/api/?name=${paciente.value.nombre}+${paciente.value.apellido_paterno}&background=0074E4&color=fff`;
});

/* NEW CITA */
let eventSelected = reactive({
  id: null,
  cliente: null,
});

const idNewCita = ref(null);

const clients = computed(() => {
  return [
    {
      id: paciente.value.id,
      nombre_completo: paciente.value.nombre_completo,
      img: 'https://cdn.quasar.dev/img/avatar.png',
    },
  ];
});

const submitCita = async (form: any) => {
  prompt.value = false;

  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'check_circle',
    message: 'Cita creada correctamente',
    position: 'top-right',
  });
};

const openNewCita = () => {
  prompt.value = true;
  idNewCita.value = paciente.value.id;
};
</script>

<style lang="scss" scoped>
.fondo-gris {
  background-color: #f1f5f9;
}

.text-title-analisis {
  font-size: 18px;
  font-weight: 600;
  color: #404040;
}
.text-title2-analisis {
  font-size: 14px;
  font-weight: 600;
  color: #404040;
}
.text-subtitle-analisis {
  font-size: 14px;
  font-weight: 600;
  color: #a3a3a3;
}

.label-info {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #737373;
}
</style>
