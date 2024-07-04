<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
      <organism-Snackbar
        :isOpen="appStore.isOpenSnackbar"
        :text="appStore.snackbarText"
        :timeout="appStore.snackbarTimeout"
        :color="appStore.snackbarColor"
        @update:snackbar="appStore.isOpenSnackbar = $event"
      />
      <organism-Modal />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAppStore } from './stores/AppStore';
const appStore = useAppStore();

appStore.modalData = {
  title: 'gggggg',
  icon: 'mdi-account',
  content: [
    {
      type: 'text',
      text: 'text 11111 text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111',
    },
    {
      type: 'divider',
    },
    {
      type: 'text',
      display: 'inline-block',
      text: 'text 222222 inline',
    },
    {
      type: 'text',
      display: 'inline-block',
      text: 'text 222222 inline',
    },
    {
      type: 'component',
      display: 'block',
      component: 'TestForModal',
      dir: 'atom',
    },
    {
      type: 'component',
      display: 'block',
      component: 'TestModal',
      dir: 'molecule',
    },
  ],
};

appStore.isShowModal = true;
</script>
