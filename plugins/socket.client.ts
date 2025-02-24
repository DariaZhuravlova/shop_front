import { defineNuxtPlugin } from '#app';
import { io, Socket } from 'socket.io-client';
import { generateFingerPrint } from '../utils';
import { useAppStore } from '@/stores/AppStore';
import { getMsgsListKick } from '@/utils/socket-events';

export default defineNuxtPlugin((nuxtApp) => {
    let socket: Socket | null = null;
    let fingerprint = localStorage.getItem('fingerprint');

    if (!fingerprint) {
        fingerprint = generateFingerPrint();
        localStorage.setItem('fingerprint', fingerprint);
    }

    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? 'https://shop-back-mh7t.onrender.com'
            : 'http://localhost:3001';

    if (!socket) {
        console.log('инициализация сокета в плагине');

        socket = io(apiUrl);

        socket.on('connect', () => {
            socket?.emit('setFingerPrint', fingerprint);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('reconnect_attempt', () => {
            console.log('Reconnecting...');
        });

        socket.on('allChatMessages', (msgs) => {
            useAppStore().allChatMessages = msgs;
        });

        socket.on('userList', (list) => {
            useAppStore().userList = list.filter((item: { sign: any; }) => item.sign);
        });


        socket.on('getMsgsList', (list) => {
            useAppStore().msgsList = list
        })

        socket.on('message', (msg) => {
            const data: any = {};
            const appStore = useAppStore();

            if (!appStore.profile || appStore.profile.role !== 'admin') {
                appStore.profile
                    ? (data.phone = appStore.profile.phone)
                    : (data.fingerPrint = localStorage.getItem('fingerprint'));
            }

            if (msg.direction == 'to user') playNotice();

            if (appStore.isOpenChat) socket?.emit('readAllUserMsgs', data);

            appStore.allChatMessages.push(msg);
        });

        socket.on('sendToAdmins', (msg) => {
            const appStore = useAppStore();
            if (msg.direction == 'from user') playNotice();
            getMsgsListKick(socket);

            let currentUser = "";
            const currentMsgSign: string = msg.phone ? 'phone' : 'fingerPrint';
            const currentMsgValue: string = msg.phone || msg.fingerPrint;

            const user = appStore.msgsList.find((user: any) => user[currentMsgSign] === currentMsgValue);

            if (!user) getMsgsListKick(socket);

            if (appStore.selectedChatUser) {
                currentUser = appStore.selectedChatUser.phone || appStore.selectedChatUser.fingerPrint || null;
            }

            if (currentMsgValue == currentUser) {
                socket?.emit('readAllAdminMsgs', { [currentMsgSign]: currentMsgValue });
                appStore.allChatMessages.push(msg);
            }
        });

        function playNotice() {
            const audio = new Audio('/sounds/notice.mp3');
            audio.play().catch((e) => console.error('Audio play error:', e));
        }
    }

    // Регистрируем `socket` в Nuxt
    nuxtApp.provide('socket', socket);
});
