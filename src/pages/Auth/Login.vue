<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from 'stores/auth';
import { authDataServices } from '../../services/AuthDataService';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const store = useAuthStore();
const { login, loginWithCookies } = store;

const myForm = ref(null);
const myFormRecovery = ref(null);
const isPwd = ref(true);

const usuario = ref('');
const password = ref('');

// const usuario = ref('admin@gmail.com');
// const password = ref('admin01');

const usuarioRecovery = ref('');
const message = ref<string>('');

const messageRecovery = ref<string>('');
const accept = ref(false);
const disabled = ref(false);
const showRecovery = ref(false);

const messageError = computed(() => {
  return message.value || null;
});

const messageRecoveryComputed = computed(() => {
  return messageRecovery.value || null;
});

async function handleSubmit() {
  disabled.value = true;
  message.value = '';
  //@ts-ignore
  myForm.value.validate().then(async (success) => {
    if (success) {
      try {
        const { data: res } = await authDataServices.login(
          usuario.value,
          password.value
        );

        const { code, msg, data } = res;

        if (code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Inicio sesión correctamente',
            position: 'top-right',
          });
          loginWithCookies(data);
        } else {
          message.value = msg || 'Error al iniciar sesión';
          $q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'Ocurrió un error',
            position: 'top-right',
          });
          setTimeout(() => {
            message.value = '';
          }, 3000);
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
  });
  disabled.value = false;
}

async function handleRecoverySubmit() {
  disabled.value = true;
  message.value = '';
  messageRecovery.value = '';
  //@ts-ignore
  myFormRecovery.value.validate().then(async (success) => {
    if (success) {
      try {
        const data = await authDataServices.recover(usuarioRecovery.value);

        if (data.data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Se ha enviado un correo electrónico',
            position: 'top-right',
          });
          messageRecovery.value =
            data.data.msg || 'Se ha enviado un correo electrónico';
        } else {
          $q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'Ocurrió un error',
            position: 'top-right',
          });
          message.value =
            data.data.msg || 'Error al validar el correo electrónico';

          setTimeout(() => {
            message.value = '';
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        $q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'error',
          message: 'Ocurrió un error',
          position: 'top-right',
        });
        // message.value = error.response.data.message
      }
    }
  });
  disabled.value = false;
}

function handleClick() {
  showRecovery.value = !showRecovery.value;
}

function handleRegister() {
  $q.notify({
    color: 'red-4',
    textColor: 'white',
    icon: 'error',
    message: 'Módulo de registro en desarrollo',
    position: 'top-right',
  });
}
</script>

<template>
  <div class="row">
    <div class="col-md-6">
      <q-img src="../../assets/imagen.png" style="height: 100vh" />
    </div>
    <div class="col-12 col-md-6">
      <q-card flat>
        <div class="row">
          <!-- LOGO -->
          <div class="col-12">
            <div class="text-center q-my-xl">
              <q-img src="../../assets/Logo.png" width="200px" />
            </div>
          </div>

          <!-- Formulario Login -->
          <div class="col-12 q-my-xl" v-if="!showRecovery">
            <div class="text-center q-mt-xl">
              <h4 class="text-title-login">Iniciar sesión</h4>
            </div>

            <q-form
              ref="myForm"
              class="q-gutter-md q-mx-auto"
              style="max-width: 480px"
              @submit="handleSubmit"
            >
              <q-input
                id="email"
                type="email"
                dense
                outlined
                v-model="usuario"
                label="Correo electrónico"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Ingrese un correo electrónico válido',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="o_email" />
                </template>
              </q-input>

              <q-input
                id="password"
                :type="isPwd ? 'password' : 'text'"
                dense
                outlined
                v-model="password"
                label="Contraseña"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Ingrese una contraseña válida',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="o_lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div v-if="messageError">
                <q-banner
                  inline-actions
                  class="text-white bg-red text-bold text-center"
                >
                  {{ messageError }}
                </q-banner>
              </div>

              <div class="row justify-center">
                <q-btn
                  label="Iniciar Sesión"
                  style="text-transform: inherit"
                  type="submit"
                  class="full-width"
                  color="primary"
                  :disabled="disabled"
                />
              </div>

              <div class="row justify-center">
                <q-btn
                  flat
                  class="text-gray"
                  @click.native="handleClick"
                  style="
                    text-transform: inherit;
                    color: #404040;
                    text-decoration: underline;
                  "
                  >¿Has olvidado tu contraseña?</q-btn
                >
              </div>

              <div class="row justify-center">
                <q-btn
                  flat
                  @click.native="handleRegister"
                  style="text-transform: inherit"
                  >¿No tienes cuenta?
                  <span class="text-primary"
                    >&nbsp;{{ ' Regístrate' }}</span
                  ></q-btn
                >
              </div>
            </q-form>
          </div>
          <!-- END Formulario Login -->

          <!-- Formulario Recuperar Contraseña -->
          <div class="col-12 q-my-xl" v-if="showRecovery">
            <div class="row justify-center q-my-xl text-h4">
              <p class="text-title-login">Recuperación de contraseña</p>
            </div>
            <q-form
              ref="myFormRecovery"
              class="q-gutter-md q-mx-auto"
              style="width: 420px"
              @submit="handleRecoverySubmit"
            >
              <div class="q-mb-none text-center">
                <label for="email"
                  >Se enviara una nueva contraseña al correo electrónico
                  registrado</label
                >
              </div>
              <q-input
                id="email"
                type="email"
                dense
                outlined
                v-model="usuarioRecovery"
                placeholder="ejemplo@email.com"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Ingrese un correo electrónico válido',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="o_email" />
                </template>
              </q-input>

              <div v-if="messageRecoveryComputed">
                <q-banner
                  inline-actions
                  class="text-white bg-primary text-bold text-center"
                >
                  {{ messageRecoveryComputed }}
                </q-banner>
              </div>

              <div v-if="messageError">
                <q-banner
                  inline-actions
                  class="text-white bg-red text-bold text-center"
                >
                  {{ messageError }}
                </q-banner>
              </div>

              <div class="column items-center q-mt-xl">
                <q-btn
                  label="Enviar"
                  type="submit"
                  color="primary"
                  class="q-mb-md full-width"
                  style="text-transform: inherit"
                />
                <q-btn
                  label="Regresar"
                  outline
                  class="full-width"
                  style="text-transform: inherit"
                  @click="handleClick"
                />
              </div>
            </q-form>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 32vw;
  height: 95vh;
}

.text-title-login {
  font-size: 36px;
  font-weight: 500;
  line-height: 43px;
  color: #404040;
}
</style>
