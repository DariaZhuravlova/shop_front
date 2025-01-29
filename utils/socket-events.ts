import { Socket } from 'socket.io-client';
import { useAppStore } from '@/stores/AppStore';

// Инициализация событий
export function initSocketEvents(socket: Socket) {

    const appStore = useAppStore();

    socket.on('userList', (list) => {
        appStore.userList = list.filter((item) => item.sign);
    });

    socket.on('message', (msg) => {
        console.log('Сообщение от сервера:', msg);
    });

    socket.on('allChatMessages', (msgs) => {
        console.log('allChatMessages', msgs);

    })
}

export function getUserListKick(socket: Socket) {
    socket.emit('getUserListKick');

}

// Функция для отправки сообщения
export function sendMessage(socket: Socket, message: string) {
    socket.emit('message', message);
}

// Функция для отправки информации о пользователе
export function sendUserInfo(socket: Socket, info: any) {
    socket.emit('userInfo', info);
}


