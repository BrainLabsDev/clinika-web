<template>
  <q-page class="fondo-gris q-py-md q-px-xl">
    <BotonBack url="/pacientes" />
    <div class="q-my-md">
      <span class="text-black text-bold text-h5 font-24">Nuevo Paciente</span>
    </div>
    <q-form ref="myForm" autocomplete="off">
      <div class="row q-col-gutter-sm">
        <!-- DATOS PERSONALES -->
        <div class="col-12 q-mb-md">
          <q-card style="border-radius: 15px" flat bordered class="q-pa-lg">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold font-18" style="color: #1e293b"
                  >Datos personales</span
                >
              </div>
              <div class="col-lg-3 col-6">
                <label for="nombre" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Nombre(s)</label
                >
                <q-input
                  outlined
                  v-model="formulario.nombre"
                  dense
                  placeholder="Escribe el nombre(s)"
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-lg-3 col-6">
                <label
                  for="apellido_paterno"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Primer apellido</label
                >
                <q-input
                  id="apellido_paterno"
                  outlined
                  dense
                  v-model="formulario.apellido_paterno"
                  placeholder="Escribe el primer apellido"
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-lg-3 col-6">
                <label
                  for="apellido_materno"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Segundo apellido</label
                >
                <q-input
                  id="apellido_materno"
                  outlined
                  dense
                  v-model="formulario.apellido_materno"
                  placeholder="Escribe el segundo apellido"
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-lg-3 col-6">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Sexo</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.sexo"
                  hide-hint
                  label="Selecciona el sexo"
                  class="font-14"
                  :options="[
                    { label: 'Masculino', value: 'M' },
                    { label: 'Femenino', value: 'F' },
                  ]"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-lg-3 col-6">
                <label for="nombre" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Fecha de nacimiento</label
                >
                <q-input
                  outlined
                  type="date"
                  v-model="formulario.fecha_nacimiento"
                  dense
                  placeholder="Fecha de nacimiento"
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>

              <div class="col-lg-3 col-6">
                <label
                  for="numero_identificacion"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Número de Identificación</label
                >
                <q-input
                  id="numero_identificacion"
                  outlined
                  dense
                  v-model="formulario.num_identificacion"
                  placeholder="[Formato de identificación ej. XX XYX XXYY]"
                />
              </div>

              <div class="col-lg-3 col-6">
                <label for="profesion" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Profesión</label
                >
                <q-input
                  id="profesion"
                  outlined
                  dense
                  v-model="formulario.profesion"
                />
              </div>

              <div class="col-lg-3 col-6">
                <label for="residencia" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Lugar de residencia</label
                >
                <q-input
                  id="residencia"
                  outlined
                  dense
                  v-model="formulario.lugar_residencia"
                />
              </div>

              <div class="col-lg-3 col-6">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Estado civil</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.estado_civil"
                  hide-hint
                  label="Seleccione una opción"
                  class="font-14"
                  :options="lista_estados_civiles"
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>

              <div class="col-lg-3 col-6">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Objetivo actual</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.objetivo_id"
                  hide-hint
                  label="Seleccione una opción"
                  class="font-14"
                  :options="lista_objetivos"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>

              <div class="col-lg-3 col-6">
                <label for="email" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Correo electrónico</label
                >
                <q-input
                  outlined
                  dense
                  v-model="formulario.email"
                  placeholder="correo@ejemplo.com"
                  lazy-rules
                  :rules="[
                    (val) =>
                      val.length > 0 || 'El correo electrónico es requerido',
                  ]"
                />
              </div>
              <div class="col-lg-3 col-6">
                <label for="telefono" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Teléfono</label
                >
                <q-input
                  type="tel"
                  outlined
                  v-model="formulario.telefono"
                  dense
                  placeholder="Escribe el teléfono"
                  lazy-rules
                  :rules="[
                    (val) => val.length > 0 || 'El teléfono es requerido',
                  ]"
                />
              </div>
            </div>
          </q-card>
        </div>

        <!-- PERFIL MÉDICO -->
        <div class="col-12 q-mb-md">
          <q-card style="border-radius: 15px" flat bordered class="q-pa-lg">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold font-18" style="color: #1e293b"
                  >Perfil médico</span
                >
              </div>

              <!-- ALERGIAS -->
              <div class="col-lg-3 col-6 q-mb-md">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Alergias o intolerancias</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.alergias"
                  class="font-14"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
              </div>

              <!-- CONDICIONES MEDICAS -->
              <div class="col-lg-3 col-6 q-mb-md">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Condiciones médicas</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.condiciones_medicas"
                  class="font-14"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
              </div>

              <!-- Medicamentos -->
              <div class="col-lg-3 col-6 q-mb-md">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Medicamentos</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.medicinas"
                  class="font-14"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
              </div>

              <!-- TRASTORNOS DE LA CONDUCTA ALIMENTARIA -->
              <div class="col-lg-3 col-6 q-mb-md">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Trastornos de la conducta alimentaria</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.desordenes"
                  class="font-14"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
              </div>

              <!-- ANTECEDENTES MÉDICOS -->
              <div class="col-6 q-mb-md">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Antecedentes médicos</label
                >
                <q-input
                  type="textarea"
                  v-model="formulario.historial"
                  outlined
                  dense
                />
              </div>

              <!-- Registro de consumo -->
              <div class="col-6 q-mb-md">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Registro de consumo</label
                >
                <q-input
                  type="textarea"
                  v-model="formulario.registro_consumo"
                  outlined
                  dense
                />
              </div>
            </div>
          </q-card>
        </div>

        <!-- HÁBITOS -->
        <div class="col-12 col-lg-8 q-mb-md">
          <q-card style="border-radius: 15px" flat bordered class="q-pa-lg">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold font-18" style="color: #1e293b"
                  >Hábitos</span
                >
              </div>

              <!-- HORAS DE SUEÑO -->
              <div class="col-lg-4 col-6">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Horas de sueño diarias</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.horas_dormidas"
                  label="Selecciona una opción"
                  class="font-14"
                  :options="lista_horas_sueno"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[(val) => val !== null || 'El campo es requerido']"
                />
              </div>

              <!-- ACTIVIDAD FISICA SEMANAL -->
              <div class="col-lg-4 col-6">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Actividad física semanal</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.actividad_fisica_id"
                  label="Selecciona una opción"
                  class="font-14"
                  :options="lista_actividades"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[(val) => val !== null || 'El campo es requerido']"
                />
              </div>

              <!-- Consumo de alcohol -->
              <div class="col-lg-4 col-6">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Consumo de alcohol</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.consumo_alcohol_id"
                  label="Selecciona una opción"
                  class="font-14"
                  :options="consumo_alcohol"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[(val) => val !== null || 'El campo es requerido']"
                />
              </div>

              <!--Fumador-->
              <div class="col-lg-4 col-6">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Fumador</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.tipo_fumador_id"
                  label="Selecciona una opción"
                  class="font-14"
                  :options="tipo_fumador"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[(val) => val !== null || 'El campo es requerido']"
                />
              </div>

              <!-- Ingesta diaria del agua -->
              <div class="col-lg-4 col-6">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Ingesta diaria del agua</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.consumo_agua_id"
                  label="Selecciona una opción"
                  class="font-14"
                  :options="ingesta_agua"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[(val) => val !== null || 'El campo es requerido']"
                />
              </div>

              <!-- Estres -->
              <div class="col-lg-4 col-6">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Estrés</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.nivel_estres_id"
                  label="Selecciona una opción"
                  class="font-14"
                  :options="estres"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[(val) => val !== null || 'El campo es requerido']"
                />
              </div>
            </div>
          </q-card>
        </div>

        <!-- USO INTERNO -->
        <div class="col-12 col-lg-4 q-mb-md">
          <q-card style="border-radius: 15px" flat bordered class="q-pa-lg">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold font-18" style="color: #1e293b"
                  >Uso interno</span
                >
              </div>
              <div class="col-6 col-lg-12">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Consultorio</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.consultorio_id"
                  label="Selecciona el consultorio"
                  class="font-14"
                  :options="lista_consultorios"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[
                    (val) => val !== null || 'El consultorio es requerido',
                  ]"
                />
              </div>

              <div class="col-6 col-lg-12">
                <label
                  for="nutricionista"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Nutricionista</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.nutricionista_id"
                  class="font-14"
                  label="Elegir nutricionista"
                  :options="lista_nutricionistas"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[
                    (val) => val !== null || 'La nutricionista es requerida',
                  ]"
                />
              </div>
            </div>
          </q-card>
        </div>

        <!-- ACTIONS -->
        <div class="col-12 row justify-end">
          <q-btn
            label="Cancelar"
            :to="{ name: 'Pacientes' }"
            class="q-mt-md q-mr-md bg-white"
            style="width: 240px; text-transform: inherit"
            flat
          />
          <q-btn
            @click="submit"
            :disable="disabled"
            color="primary"
            label="Guardar paciente"
            class="q-mt-md bg-primary text-white border-primary"
            flat
            style="width: 240px; text-transform: inherit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { reactive, ref, computed, onMounted } from 'vue';

/* COMPONENTES */
import BotonBack from 'src/components/common/BotonBack.vue';

/* INTERFACES */
import { INutri } from 'src/Interfaces/Nutri';
import { IClinic } from 'src/Interfaces/Clinic';
import { IPacientePayload } from 'src/Interfaces/Paciente';

/* SERVICIOS */
import { clinicDataServices } from 'src/services/ClinicDataService';
import { nutriDataServices } from 'src/services/NutriDataService';
import { pacienteDataServices } from 'src/services/PacienteDataService';
import {
  catalogoDataService,
  ICatalogoData,
} from 'src/services/CatalogoDataService';

/* STORE */
import { useCatalogStore } from 'stores/catalog';
const store = useCatalogStore();

/* COMPOSITIONS */
const $q = useQuasar();
const router = useRouter();

/* CATÁLOGOS */
const lista_estados_civiles = ref<string[]>([]);
const lista_objetivos = ref<ICatalogoData[]>([]);
const lista_horas_sueno = ref<ICatalogoData[]>([]);
const consumo_alcohol = ref<ICatalogoData[]>([]);
const tipo_fumador = ref<ICatalogoData[]>([]);
const ingesta_agua = ref<ICatalogoData[]>([]);
const estres = ref<ICatalogoData[]>([]);
const lista_actividades = ref<ICatalogoData[]>([]);

const lista_nutricionistas = computed(() => {
  return nutricionistas.value.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});

const lista_consultorios = computed(() => {
  return consultorios.value.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});

/* DATA */
const myForm = ref<any>(null);
const consultorios = ref<IClinic[]>([]);
const nutricionistas = ref<INutri[]>([]);

const formulario = reactive<IPacientePayload>({
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  email: '',
  telefono: '',
  nutricionista_id: null,
  consultorio_id: null,
  sexo: '',
  fecha_nacimiento: '',
  alergias: [],
  condiciones_medicas: [],
  medicinas: [],
  desordenes: [],
  actividad_fisica_id: null,
  objetivo_id: null,
  horas_dormidas: null,
  registro_consumo: '',
  estatura: 160,
  historial: '',
  lugar_residencia: '',
  profesion: '',
  num_identificacion: '',

  estado_civil: '',
  consumo_alcohol_id: null,
  tipo_fumador_id: null,
  consumo_agua_id: null,
  nivel_estres_id: null,
});

const disabled = computed(() => {
  if (
    formulario.nombre.length > 0 &&
    formulario.apellido_paterno.length > 0 &&
    formulario.sexo !== '' &&
    formulario.telefono !== null &&
    formulario.email.length > 0 &&
    formulario.consultorio_id !== null &&
    formulario.nutricionista_id !== null
  ) {
    return false;
  } else {
    return true;
  }
});

onMounted(() => {
  getCatalogos();
  getConsultorios();
  getNutris();
});

const getCatalogos = async () => {
  const data = await catalogoDataService.getShowCategories();
  if (data.code === 200) {
    lista_estados_civiles.value = data.data.estado_civil.map((item) => {
      return item.label;
    });
    lista_objetivos.value = data.data.objectives.map((item) => {
      return {
        label: item.label,
        value: item.id,
      };
    });
    lista_horas_sueno.value = data.data.hours_of_sleep.map((item) => {
      return {
        label: item.label,
        value: item.id,
      };
    });
    consumo_alcohol.value = data.data.alcohol_consumption.map((item) => {
      return {
        label: item.label,
        value: item.id,
      };
    });
    tipo_fumador.value = data.data.smoke.map((item) => {
      return {
        label: item.label,
        value: item.id,
      };
    });
    ingesta_agua.value = data.data.water_consumption.map((item) => {
      return {
        label: item.label,
        value: item.id,
      };
    });
    estres.value = data.data.stress.map((item) => {
      return {
        label: item.label,
        value: item.id,
      };
    });
    lista_actividades.value = data.data.physical_activities.map((item) => {
      return {
        label: item.label,
        value: item.id,
      };
    });
  }
};

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
  if (myForm.value?.validate()) {
    try {
      const payload = {
        // obligatorios
        nombre: formulario.nombre,
        apellido_paterno: formulario.apellido_paterno,
        apellido_materno: formulario.apellido_materno,
        email: formulario.email,
        telefono: formulario.telefono,
        nutricionista_id: formulario.nutricionista_id,
        consultorio_id: formulario.consultorio_id,

        // EXTRAS SIN VALIDACIÓN
        sexo: formulario.sexo,
        fecha_nacimiento: formulario.fecha_nacimiento,

        alergias: formulario.alergias,
        condiciones_medicas: formulario.condiciones_medicas,
        medicinas: formulario.medicinas,
        desordenes: formulario.desordenes,

        actividad_fisica_id: formulario.actividad_fisica_id,
        objetivo_id: formulario.objetivo_id,

        horas_dormidas: formulario.horas_dormidas,
        historial: formulario.historial,

        registro_consumo: formulario.registro_consumo,

        /* TODO: NUEVOS DATOS */
        num_identificacion: formulario.num_identificacion,
        profesion: formulario.profesion,
        lugar_residencia: formulario.lugar_residencia,
        estado_civil: formulario.estado_civil,
        consumo_alcohol_id: formulario.consumo_alcohol_id,
        tipo_fumador_id: formulario.tipo_fumador_id,
        consumo_agua_id: formulario.consumo_agua_id,
        nivel_estres_id: formulario.nivel_estres_id,
      };

      const data = await pacienteDataServices.savePaciente(payload);

      if (data.code === 200) {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Cliente agregado correctamente',
          position: 'top-right',
        });
        myForm.value?.resetValidation();
        router.push({ name: 'PerfilPaciente', params: { id: data.data.id } });
      }
    } catch (error) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: 'Ocurrió un error',
        position: 'top-right',
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fondo-gris {
  background-color: #f1f5f9;
}
</style>
