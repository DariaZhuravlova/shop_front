import { defineNuxtPlugin } from '#app';
import { io, Socket } from 'socket.io-client';
import { generateFingerPrint } from '../utils';


export default defineNuxtPlugin(() => {
    let socket: Socket | null = null;
    const fingerprint = localStorage.getItem('fingerprint') || localStorage.setItem('fingerprint', generateFingerPrint());


    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? 'https://shop-back-mh7t.onrender.com'
            : 'http://localhost:3001';

    if (!socket) {
        socket = io(apiUrl);

        socket.on('connect', () => {
            socket?.emit("setFingerPrint", fingerprint);
            console.log('Socket connected:', socket?.id);
        });

        // socket.on('allChatMessages', (msgs) => {
        //     console.log(msgs);

        // })

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('reconnect_attempt', () => {
            console.log('Reconnecting...');
        });
        socket.on('allChatMessages', (msgs) => {
            console.log('allChatMessages', msgs);

        })
    }

    // Возвращаем сокет как плагин для Nuxt
    return {
        provide: {
            socket,
        },
    };
});
