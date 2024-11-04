// client.js
import { io } from 'socket.io-client';
const apiUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://shop-back-mh7t.onrender.com'
        : 'http://localhost:3001';

const socket = io(apiUrl, {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
});

// Функция для отправки сообщений на сервер
export function sendMessage(message) {
    socket.emit('message', message);
}

// Слушаем сообщения от сервера
socket.on('message', (msg) => {
    console.log('Сообщение от сервера:', msg);
});


// Логируем успешное подключение
socket.on('connect', () => {
    console.log('Соединение с socket сервером установлено');
});

// console.log('Соединение с socket сервером установлено');

// console.log('coockie: ', document.cookie);

export default socket;
