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
import { modalContent } from './data/devTest/modalContent';
import socket from './socket-client';

const appStore = useAppStore();

appStore.modalData = modalContent;

</script>
