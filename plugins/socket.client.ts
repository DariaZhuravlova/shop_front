import { defineNuxtPlugin } from '#app';
import { io, Socket } from 'socket.io-client';
import { generateFingerPrint } from '../utils';
import { useAppStore } from '@/stores/AppStore';
import { getMsgsListKick, initSocketEvents } from "@/utils/socket-events";
export default defineNuxtPlugin(() => {
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
            useAppStore().allChatMessages = msgs

        })

        socket.on('message', (msg) => {
            const data = {};
            if (!useAppStore().profile || useAppStore().profile.role !== 'admin') {
                useAppStore().profile
                    ? (data.phone = useAppStore().profile.phone)
                    : (data.fingerPrint = localStorage.getItem('fingerprint'));
            }
            if (msg.direction == 'to user') playNotice()

            if (useAppStore().isOpenChat == true) socket?.emit('readAllUserMsgs', data);

            useAppStore().allChatMessages.push(msg);
        });

        socket.on('sendToAdmins', (msg) => {
            if (msg.direction == 'from user') playNotice()
            getMsgsListKick(socket)
            let currentUser = "";
            const currentMsgSign: string = msg.phone ? 'phone' : 'fingerPrint';
            const currentMsgValue: string = msg.phone || msg.fingerPrint;
            const user = useAppStore().msgsList.find((user: {}) => {
                return user[currentMsgSign] === currentMsgValue
            })

            if (!user) getMsgsListKick(socket)

            if (useAppStore().selectedChatUser) {
                currentUser = useAppStore().selectedChatUser.phone || useAppStore().selectedChatUser.fingerPrint || null;
            }

            if (currentMsgValue == currentUser) {
                socket?.emit('readAllAdminMsgs', { [currentMsgSign]: currentMsgValue });
                useAppStore().allChatMessages.push(msg);
            }

        });

        function playNotice() {
            const audio = new Audio('/sounds/notice.mp3');
            audio.play().catch((e) => console.error('Audio play error:', e));
        };

    }

    // Возвращаем сокет как плагин для Nuxt
    return {
        provide: {
            socket,
        },
    };
});
