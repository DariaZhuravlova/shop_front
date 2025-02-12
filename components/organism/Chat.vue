<template>
  <div>
    <!-- Кнопка для открытия дровера -->
    <v-btn class="chat-button" color="primary" fab @click="toggleChat">
      <v-icon size="32">mdi-chat</v-icon>
    </v-btn>

    <!-- Дровер для чата -->
    <v-navigation-drawer
      v-model="appStore.isOpenChat"
      location="end"
      width="320"
      app
    >
      <v-card elevation="0" class="chat-widget">
        <v-card-title class="chat-header">
          Служба поддержки
          <v-btn icon @click="toggleChat">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="chat-messages" v-if="appStore.allChatMessages">
            <template
              v-for="(message, index) in appStore.allChatMessages"
              :key="index"
            >
              <!-- Отображение даты -->
              <div v-if="shouldShowDate(index)" class="date-separator">
                {{ formatDate(message.timestamp) }}
              </div>
              <!-- Сообщение -->
              <div class="message" :class="messageClass(message)">
                <span class="time">{{ formatTime(message.timestamp) }}</span>

                <span
                  ><strong
                    >{{ getSenderName(message.direction) }}:<br /> </strong
                  >{{ message.text }}</span
                >
              </div>
            </template>
          </div>
          <v-text-field
            v-model="newMessage"
            label="Введите сообщение"
            dense
            outlined
            @keyup.enter="sendMessage"
          />
          <v-btn color="primary" block @click="sendMessage"> Отправить </v-btn>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';
import { useAppStore } from '@/stores/AppStore';
import { initSocketEvents, getAllMsgsKick } from '@/utils/socket-events';

const appStore = useAppStore();

const apiUrl = useRuntimeConfig().public.apiUrl;
const userName = appStore.profile?.name || 'Вы';

const socket = io(apiUrl);
initSocketEvents(socket);

const newMessage = ref('');
const fingerprint = ref(
  typeof window !== 'undefined' ? localStorage.getItem('fingerprint') : null
);

function toggleChat() {
  appStore.isOpenChat = !appStore.isOpenChat;
  if (appStore.isOpenChat) {
    if (!appStore.profile || appStore.profile.role !== 'admin') {
      getAllMsgsKick(socket);
    }
  }
}

function sendMessage() {
  const message = {
    text: newMessage.value.trim(),
    timestamp: new Date().toISOString(),
  };
  if (!appStore.profile || appStore.profile.role !== 'admin') {
    appStore.profile
      ? ((message.userId = appStore.profile._id),
        (message.phone = appStore.profile.phone))
      : (message.fingerPrint = localStorage.getItem('fingerprint'));
    message.direction = 'from user';
  } else {
    message.direction = 'to user';
    if (appStore.selectedChatUser.phone) {
      message.phone = appStore.selectedChatUser.phone;
    } else if (appStore.selectedChatUser.fingerPrint) {
      message.fingerPrint = appStore.selectedChatUser.fingerPrint;
    }
  }

  socket.emit('message', message);
  newMessage.value = '';
}

function getSenderName(direction) {
  if (!appStore.profile || appStore.profile.role !== 'admin') {
    return direction === 'from user' ? userName : 'Служба поддержки';
  } else {
    return direction === 'to user'
      ? 'Служба поддержки'
      : appStore.selectedChatUser && appStore.selectedChatUser.phone
      ? appStore.selectedChatUser.phone
      : 'Гость';
  }
}

function handleIncomingMessage(data: {
  sender: string;
  text: string;
  timestamp: string;
  userId: string;
  fingerPrint: string;
}) {
  appStore.allChatMessages.push(data);
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // Формат: ДД.ММ.ГГГГ
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Формат: ЧЧ:ММ
}

function shouldShowDate(index: number): boolean {
  if (index === 0) return true;
  const currentDate = new Date(
    appStore.allChatMessages[index].timestamp
  ).toDateString();
  const previousDate = new Date(
    appStore.allChatMessages[index - 1].timestamp
  ).toDateString();
  return currentDate !== previousDate;
}

function messageClass(message) {
  if (!appStore.profile && message.direction == 'from user') {
    return 'my-message';
  } else if (!appStore.profile && message.direction == 'to user') {
    return 'other-message';
  } else if (appStore.profile) {
    if (appStore.profile.role == 'admin' && message.direction == 'to user') {
      return 'my-message';
    } else if (
      appStore.profile.role == 'admin' &&
      message.direction == 'from user'
    ) {
      return 'other-message';
    } else if (
      appStore.profile.role != 'admin' &&
      appStore.profile.phone &&
      message.direction == 'from user'
    ) {
      return 'my-message';
    } else if (
      appStore.profile.role != 'admin' &&
      appStore.profile.phone &&
      message.direction == 'to user'
    ) {
      return 'other-message';
    }
  }

  console.log(message);
}

onMounted(() => {
  socket.on('receive_message', handleIncomingMessage);
  socket.emit('join_chat', { user: 'ВашеИмя' });
});

onUnmounted(() => {
  socket.off('receive_message', handleIncomingMessage);
  socket.emit('leave_chat', { user: 'ВашеИмя' });
});
</script>

<style scoped lang="scss">
.chat-widget {
  height: 100%;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;

    .date-separator {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: gray;
      margin: 10px 0;
    }

    .message {
      margin: 5px 0;
      display: flex;
      align-items: baseline;

      .time {
        font-size: 12px;
        color: gray;
        margin-right: 10px;
      }
    }
  }
}

.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.message {
  margin: 5px 0;
  display: flex;
  align-items: baseline;
  padding: 8px;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;

  .time {
    font-size: 12px;
    color: gray;
    margin-right: 10px;
  }
}

.my-message {
  background-color: #e4fbed;
  align-self: flex-end;
  margin-left: auto;
  color: #086b29;
}

.other-message {
  background-color: rgb(240, 216, 240);
  align-self: flex-start;
  margin-right: auto;
  color: #333;
}
</style>
