import { Socket } from 'socket.io-client';
import { useAppStore } from '@/stores/AppStore';

export function getUserListKick(socket: Socket) {
    socket.emit('getUserListKick');
}

export function getAllMsgsKick(socket: Socket) {
    const appStore = useAppStore();
    const data: { phone?: string; fingerPrint?: string } = {};

    if (appStore.profile && appStore.profile.role === 'admin') {
        if (appStore.selectedChatUser) {
            data.phone = appStore.selectedChatUser.phone;
        } else {
            console.error('selectedChatUser is null or undefined');
            return;
        }
    } else {
        if (appStore.profile) {
            data.phone = appStore.profile.phone;
        } else {
            data.fingerPrint = localStorage.getItem('fingerprint') || '';
        }
    }

    socket.emit('getAllMsgsKick', data);
}



export function getMsgsListKick(socket: Socket) {
    socket.emit('getMsgsListKick');
}

// Функция для отправки сообщения
export function sendMessage(socket: Socket, message: string) {
    socket.emit('message', message);
}

// Функция для отправки информации о пользователе
export function sendUserInfo(socket: Socket, info: any) {
    socket.emit('userInfo', info);
}


