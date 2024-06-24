<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
      <organizm-Snackbar :isOpen="appStore.isOpenSnackbar" :text="appStore.snackbarText" :timeout="appStore.snackbarTimeout" :color="appStore.snackbarColor" @update:snackbar="appStore.isOpenSnackbar = $event"/>
    </v-app>
  </NuxtLayout>

</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from './stores/AppStore';

const appStore = useAppStore();

// appStore.isOpenSnackbar = true;


</script>