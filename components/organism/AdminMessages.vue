<script lang="ts" setup>
import { io } from 'socket.io-client';
import { useAppStore } from '@/stores/AppStore';
import { initSocketEvents, getMsgsListKick } from '@/utils/socket-events';

const appStore = useAppStore();

const apiUrl = useRuntimeConfig().public.apiUrl;

const socket = io(apiUrl);
initSocketEvents(socket);
onMounted(() => {
  getMsgsListKick(socket);
});
</script>



<template>
  <div class="">
    <h1>Сщщбщения</h1>
  </div>
</template>
