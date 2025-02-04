<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" :width="240" bordered>
      <q-list>
        <q-item-label header class="row justify-center q-mt-md">
          <q-img src="../assets/logo.png" width="180px" />
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-toolbar class="fondo-gris q-pt-md q-px-lg justify-between">
        <div>
          <q-btn
            flat
            round
            dense
            icon="menu"
            class="q-mr-sm"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-img
            v-if="!leftDrawerOpen"
            src="../assets/logo.png"
            width="180px"
          />
        </div>

        <Notification />
      </q-toolbar>
      <div class="fondo-gris q-py-md q-px-lg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useAuthStore } from 'stores/auth';
const store = useAuthStore();

const { getUser } = store;

import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import Notification from 'src/components/common/Notification.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Inicio',
    icon: 'o_home',
    link: '/inicio',
  },
  {
    title: 'Pacientes',
    icon: 'o_people',
    link: '/pacientes',
  },
  {
    title: 'Agenda',
    icon: 'o_calendar_today',
    link: '/agenda',
  },
  {
    title: 'Ajustes',
    icon: 'o_settings',
    link: '/ajustes',
  },
];

const leftDrawerOpen = ref(true);

import { useCatalogStore } from 'stores/catalog';

const catalogStore = useCatalogStore();

onMounted(() => {
  if (catalogStore.getObjetivos.length === 0) {
    catalogStore.getCatalogs();
  }
  leftDrawerOpen.value = true;

  if (getUser.email === 'admin@gmail.com') {
    essentialLinks.push({
      title: 'Gestionar cuentas',
      icon: 'o_manage_accounts',
      link: '/users',
    });
  }
});
</script>

<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}

.menu-aside {
  width: 200px !important;
}
</style>
