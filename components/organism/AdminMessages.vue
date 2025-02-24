<script lang="ts" setup>
import { useAppStore } from '@/stores/AppStore';
import { getMsgsListKick } from '@/utils/socket-events';

const appStore = useAppStore();
const { $socket } = useNuxtApp();
const socket = $socket;

function toggleChat(data) {
  appStore.isOpenChat = true;
  appStore.selectedChatUser = data;
  appStore.allChatMessages = [];
  console.log(data);

  socket.emit('getAllMsgsKick', data);
  setTimeout(() => {
    socket.emit('readAllAdminMsgs', data);
  }, 1000);
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
          <td
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            "
          >
            rrrr
            <span v-if="!item.isRead" class="new-message-badge">NEW</span>
          </td>
          <td v-if="item.phone">
            {{ item.phone }}
          </td>
          <td v-else>{{ item.fingerPrint }}</td>

          <td>rrrrr</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style lang="scss" scoped>
.orders-admin {
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
  .orders-admin {
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
// .is-read {
//   width: 10px;
//   height: 10px;
//   background-color: lightgreen;
//   border-radius: 50%;
//   animation: blink 0.5s infinite alternate;
// }
// @keyframes blink {
//   0% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0;
//   }
// }

.new-message-badge {
  background-color: red;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
