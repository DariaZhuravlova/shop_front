<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { initSocketEvents, sendMessage } from '@/utils/socket-events';
import { useAppStore } from '@/stores/AppStore';
import { getUserListKick } from '@/utils/socket-events';

const pause = (ms: Number) => new Promise((resolve) => setTimeout(resolve, ms));

const appStore = useAppStore();
const { $socket } = useNuxtApp();

function toggleChat(phone: string) {
  appStore.isOpenChat = !appStore.isOpenChat;
  appStore.allChatMessages = null;
  appStore.selectedChatUser = { phone };

  getAllMsgsKick($socket);
}

onMounted(async () => {
  if ($socket.connected) {
    sendUserInfo($socket, appStore.profile);
    getUserListKick($socket);
  }

  // Инициализируем события
  initSocketEvents($socket);
});
</script>

<template>
  <div class="connected-users">
    <h1 class="title">Подключенные пользователи</h1>
    <v-table class="order-table" max-height="300px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Статус</th>
          <th class="text-left">Имя Клиента</th>
          <th class="text-left">Телефон</th>
          <th class="text-left">Роль</th>
          <th class="text-left">Девайс</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in appStore.userList"
          :key="item.user?._id"
          class="order-row"
          @click="toggleChat"
        >
          <td>
            <span style="color: lightgreen">online</span>
          </td>
          <td>
            <span
              v-if="
                item.user?.name && appStore.profile.phone == item.user.phone
              "
              >{{ item.user.name }}
              <span style="color: lightgreen">(Вы)</span></span
            >
            <span
              v-else-if="
                item.user?.name && appStore.profile.phone !== item.user.phone
              "
              >{{ item.user.name }}</span
            >
            <span v-else>guest</span>
          </td>
          <td>
            <span v-if="item.user?.phone">{{ item.user?.phone }}</span>
            <span v-else>-</span>
          </td>
          <td>
            <span v-if="item.user?.role">{{ item.user?.role }}</span>
            <span v-else>-</span>
          </td>
          <td>
            <span
              >{{ item.connections[0].agent.type }} (<span>{{
                item.connections[0].agent.os
              }}</span
              >)</span
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style lang="scss" scoped>
.connected-users {
  padding: 10px;

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
    // color: #333;
  }

  .order-table {
    width: 100%;
    border-collapse: collapse;

    thead th {
      background-color: #f5f5f5;
      padding: 8px;
      border-bottom: 2px solid #ddd;
      font-size: 14px;
      font-weight: 600;
    }

    tbody td {
      padding: 12px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      text-align: left;
    }

    tbody tr {
      &:hover {
        background-color: #f9f9f9;
      }
    }

    .order-link {
      color: #1e88e5;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (min-width: 768px) {
  .connected-users {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .order-table {
    thead th {
      padding: 10px;
      font-size: 16px;
    }

    tbody td {
      padding: 15px;
      font-size: 16px;
    }
  }
}
</style>
