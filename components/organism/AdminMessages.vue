<script lang="ts" setup>
import { io } from 'socket.io-client';
import { useAppStore } from '@/stores/AppStore';
import { initSocketEvents, getMsgsListKick } from '@/utils/socket-events';

const appStore = useAppStore();

const apiUrl = useRuntimeConfig().public.apiUrl;

const socket = io(apiUrl);
initSocketEvents(socket);

function toggleChat(data) {
  appStore.isOpenChat = true;
  appStore.selectedChatUser = data;
  appStore.allChatMessages = [];

  socket.emit('getAllMsgsKick', data);
}

onMounted(() => {
  getMsgsListKick(socket);
});
</script>



<template>
  <div class="orders-admin">
    <h1 class="title">Сообщения</h1>
    <v-table class="order-table" height="300px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Имя Клиента</th>
          <th class="text-left">Телефон</th>
          <th class="text-left">E-mail</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, ind) in appStore.msgsList"
          :key="ind"
          class="order-row"
          @click="toggleChat(item)"
        >
          <td>rrrr</td>
          <td v-if="item.phone">{{ item.phone }}</td>
          <td v-else>{{ item.fingerPrint }}</td>

          <td>rrrrr</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
