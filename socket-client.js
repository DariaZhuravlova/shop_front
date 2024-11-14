// client.js
import io from 'socket.io-client';

const apiUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://shop-back-mh7t.onrender.com'
        : 'http://localhost:3001';

console.log('apiUrl: ', apiUrl);

const socket = io.connect(apiUrl)

// const socket = io.connect('https://shop-back-mh7t.onrender.com:3001')

// const socket2 = io.connect('https://shop-back-mh7t.onrender.com')

// Функция для отправки сообщений на сервер
export function sendMessage(message) {
    socket.emit('message', message);
}

export function sendUserInfo(info) {
    socket.emit('userInfo', info)

}

export function getUserList(payload) {
    return new Promise((resolve, reject) => {
        // Отправка запроса с использованием emit и ожиданием подтверждения
        socket.emit('getUserList', payload, (response) => {
            // Получаем ответ через callback
            resolve(response);
        });
    });
}

socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
});

// socket2.on('connect', () => {
//     console.log('Socket2 connected:', socket2.id);
// });


// Слушаем сообщения от сервера
socket.on('message', (msg) => {
    console.log('Сообщение от сервера:', msg);
});

console.log('socket: ', socket);

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

socket.on('reconnect_attempt', () => {
    console.log('Reconnecting...');
});


// console.log('coockie: ', document.cookie);

export default socket;
