<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
      <organizm-Snackbar :isOpen="appStore.isOpenSnackbar" :text="appStore.snackbarText" :timeout="appStore.snackbarTimeout" :color="appStore.snackbarColor" @update:snackbar="appStore.isOpenSnackbar = $event"/>
      <organizm-Modal />
    </v-app>
  </NuxtLayout>

</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from './stores/AppStore';

const appStore = useAppStore();

appStore.modalData = {
  title: 'gggggg',
  icon: 'mdi-account',
  content: [{
    type: 'text',
    text: 'text 11111 text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111'
  }, {
    type: 'divider',
  }, {
    type: 'text',
    display: 'inline-block',
    text: 'text 222222'
  }, {
    type: 'text',
    display: 'inline-block',
    text: 'text 222222'
  },
  {
    type: 'component',
    display: 'inline-block',
    component: 'organizm-Loader',
  }],
}

appStore.isShowModal = true;


</script>