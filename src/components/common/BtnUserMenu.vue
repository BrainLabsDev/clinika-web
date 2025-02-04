<template>
  <q-btn class="btn-menu" color="white" dense text-color="black" unelevated>
    <q-icon left>
      <q-avatar size="32px">
        <img :src="avatar" />
      </q-avatar>
    </q-icon>
    <div class="q-ml-md">{{ userNameLabel }}</div>

    <q-menu auto-close>
      <q-list style="min-width: 100px">
        <q-item clickable disable>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>Perfil</q-item-section>
        </q-item>
        <q-item clickable disable>
          <q-item-section avatar>
            <q-icon name="lock" />
          </q-item-section>
          <q-item-section>Cambiar contraseña</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>Cerrar sesión</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from 'stores/auth';
const store = useAuthStore();

const { getUser, logout } = store;

const userNameLabel = computed(() => {
  return `${getUser.name} ${getUser.first_lastname}`;
});

const avatar = computed(() => {
  return `https://ui-avatars.com/api/?name=${getUser.name}+${getUser.first_lastname}&background=0074E4&color=fff`;
});
</script>

<style scoped>
.btn-menu {
  text-transform: inherit;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-left: 10px;
  min-width: 180px;
}
</style>
