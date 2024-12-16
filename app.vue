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

const appStore = useAppStore();

// Динамический импорт для сокета
// let sendMessage: any;
// let socket: any;

// if (process.client) {
//   (async () => {
//     const socketModule = await import('./socket-client');
//     const socket = socketModule.default; 
//     const sendMessage = socketModule.sendMessage;

//     sendMessage("Hello from the client!");
//   })();
// }

appStore.modalData = modalContent;
</script>
