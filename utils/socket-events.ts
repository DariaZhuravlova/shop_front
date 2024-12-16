import { Socket } from 'socket.io-client';
import { useAppStore } from '@/stores/AppStore';

// Инициализация событий
export function initSocketEvents(socket: Socket) {
  const appStore = useAppStore();

  socket.on('userList', (list) => {
    console.log('Получен список пользователей:', list);
    appStore.userList = list; // Обновляем хранилище
  });

  socket.on('message', (msg) => {
    console.log('Сообщение от сервера:', msg);
  });
}

// Функция для отправки сообщения
export function sendMessage(socket: Socket, message: string) {
  socket.emit('message', message);
}

// Функция для отправки информации о пользователе
export function sendUserInfo(socket: Socket, info: any) {
  socket.emit('userInfo', info);
}

// Функция для получения списка пользователей
export function getUserList(socket: Socket, payload: any) {
  return new Promise((resolve, reject) => {
    socket.emit('getUserList', payload, (data) => {
      resolve(data);
    });
  });
}
