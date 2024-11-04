// client.js
import { io } from 'socket.io-client';
const apiUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://shop-back-mh7t.onrender.com'
        : 'http://localhost:3001';

const socket = io(apiUrl, {
  transports: ['polling'], // Пробуем только polling
  reconnectionAttempts: 10, // Дополнительные попытки переподключения
  reconnectionDelay: 3000, // Задержка в 3 секунды
});

// Функция для отправки сообщений на сервер
export function sendMessage(message) {
    socket.emit('message', message);
}

// Слушаем сообщения от сервера
socket.on('message', (msg) => {
    console.log('Сообщение от сервера:', msg);
});


// console.log('coockie: ', document.cookie);

export default socket;
