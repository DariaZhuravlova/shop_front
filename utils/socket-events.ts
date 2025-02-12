import { Socket } from 'socket.io-client';
import { useAppStore } from '@/stores/AppStore';

// Инициализация событий
// бывает не работает нужно дублировать в плагине
export function initSocketEvents(socket: Socket) {

    const appStore = useAppStore();

    socket.on('userList', (list) => {
        appStore.userList = list.filter((item: { sign: any; }) => item.sign);
    });

    // socket.on('message', (msg) => {
    //     console.log('Сообщение от сервера:', msg);
    //     alert(msg);
    // });

    socket.on('allChatMessages', (msgs) => {
        appStore.allChatMessages = msgs

    })

    socket.on('getMsgsList', (list) => {
        console.log('getMsgsList', list);
        appStore.msgsList = list

    })
}

export function getUserListKick(socket: Socket) {
    socket.emit('getUserListKick');
}

export function getAllMsgsKick(socket: Socket) {
    const appStore = useAppStore();
    const data: { phone?: string; fingerPrint?: string } = {};
    if (appStore.profile && appStore.profile.role == 'admin') {
        data.phone = appStore.selectedChatUser.phone;
    } else {
        appStore.profile
            ? (data.phone = appStore.profile.phone)
            : (data.fingerPrint = localStorage.getItem('fingerprint') || '');
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


