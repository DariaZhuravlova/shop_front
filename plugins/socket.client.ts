import { defineNuxtPlugin } from '#app';
import { io, Socket } from 'socket.io-client';
import { generateFingerPrint } from '../utils';
import { useAppStore } from '@/stores/AppStore';

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

        socket.on('message', (msg) => {
            if (msg.direction == 'to user') playNotice()
            useAppStore().allChatMessages.push(msg);
        });

        socket.on('sendToAdmins', (msg) => {
            if (msg.direction == 'from user') playNotice()
            useAppStore().allChatMessages.push(msg);
        });

        function playNotice() {
            const audio = new Audio('/sounds/notice.mp3'); // Укажи путь к файлу
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
