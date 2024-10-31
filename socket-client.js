// client.js
import { io } from 'socket.io-client';
const envConfig = useNuxtApp().$envConfig;

const socket = io(`${envConfig.apiUrl}`); // Адрес вашего сервера

// Функция для отправки сообщений на сервер
export function sendMessage(message) {
    socket.emit('message', message);
}

// Слушаем сообщения от сервера
socket.on('message', (msg) => {
    console.log('Сообщение от сервера:', msg);
});

console.log('Соединение с socket сервером установлено');

// console.log('coockie: ', document.cookie);



export default socket;
