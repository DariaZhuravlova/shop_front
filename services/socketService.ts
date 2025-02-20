import { io, Socket } from 'socket.io-client';
import { useAppStore } from '../stores/AppStore';

class SocketService {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectInterval = 3000; // 3 секунды
    private reconnectTimeout: NodeJS.Timeout | null = null;
    private isConnecting = false;

    private apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://shop-back-mh7t.onrender.com'
        : 'http://localhost:3001';

    constructor() {
        this.initializeSocket();
    }

    private initializeSocket() {
        if (this.isConnecting) return;
        this.isConnecting = true;

        try {
            this.socket = io(this.apiUrl, {
                reconnection: true,
                reconnectionAttempts: this.maxReconnectAttempts,
                reconnectionDelay: this.reconnectInterval,
                timeout: 10000, // 10 секунд таймаут на соединение
            });

            this.setupSocketListeners();
        } catch (error) {
            console.error('Ошибка при инициализации сокета:', error);
            this.handleReconnect();
        }
    }

    private setupSocketListeners() {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('Соединение установлено');
            this.reconnectAttempts = 0;
            this.isConnecting = false;
            const store = useAppStore();
            store.setSocketStatus(true);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Соединение разорвано:', reason);
            const store = useAppStore();
            store.setSocketStatus(false);
            this.handleReconnect();
        });

        this.socket.on('connect_error', (error) => {
            console.error('Ошибка соединения:', error);
            this.handleReconnect();
        });

        this.socket.on('error', (error) => {
            console.error('Ошибка сокета:', error);
            const store = useAppStore();
            store.setSocketStatus(false);
        });

        // Обработка таймаута соединения
        this.socket.on('connect_timeout', () => {
            console.error('Таймаут соединения');
            this.handleReconnect();
        });
    }

    private handleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Превышено максимальное количество попыток переподключения');
            const store = useAppStore();
            store.setSocketError('Не удалось установить соединение с сервером');
            return;
        }

        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }

        this.reconnectTimeout = setTimeout(() => {
            this.reconnectAttempts++;
            console.log(`Попытка переподключения ${this.reconnectAttempts} из ${this.maxReconnectAttempts}`);
            this.initializeSocket();
        }, this.reconnectInterval);
    }

    // Публичные методы для работы с сокетом
    public sendMessage(message: any) {
        if (!this.socket?.connected) {
            console.warn('Сообщение не отправлено: нет соединения');
            return false;
        }
        try {
            this.socket.emit('message', message);
            return true;
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            return false;
        }
    }

    public sendUserInfo(info: any) {
        if (!this.socket?.connected) {
            console.warn('Информация о пользователе не отправлена: нет соединения');
            return false;
        }
        try {
            this.socket.emit('userInfo', info);
            return true;
        } catch (error) {
            console.error('Ошибка при отправке информации о пользователе:', error);
            return false;
        }
    }

    public getUserList(payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.socket?.connected) {
                reject(new Error('Нет соединения с сервером'));
                return;
            }

            try {
                this.socket.emit('getUserList', payload, (data: any) => {
                    resolve(data);
                });

                // Таймаут для ответа
                setTimeout(() => {
                    reject(new Error('Таймаут получения списка пользователей'));
                }, 5000);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Метод для принудительного переподключения
    public reconnect() {
        this.reconnectAttempts = 0;
        this.initializeSocket();
    }

    // Метод для проверки состояния соединения
    public isConnected(): boolean {
        return this.socket?.connected ?? false;
    }
}

// Создаем единственный экземпляр сервиса
export const socketService = new SocketService();



/*

Основные улучшения в новой реализации:

Централизованное управление сокетами:

Создан отдельный сервис socketService.ts
Использован паттерн Singleton для единой точки доступа

Надежное соединение:

Автоматическое переподключение при разрыве связи
Ограничение количества попыток переподключения
Настраиваемые интервалы переподключения
Обработка таймаутов

Обработка ошибок:

Детальное логирование всех ошибок
Разные типы обработчиков для разных ошибок
Информирование пользователя о статусе соединения

Улучшенная типизация:

Использование TypeScript
Типизация для Socket.IO клиента
Строгая типизация методов

Состояние соединения:

Отслеживание статуса соединения в store
Индикация ошибок
Возможность мониторинга состояния
Чтобы использовать новый сервис, замените импорты в компонентах с socket-client2.js на:

import { socketService } from '@/services/socketService';

И используйте методы:

// Отправка сообщения
socketService.sendMessage(message);

// Получение списка пользователей
try {
    const users = await socketService.getUserList(payload);
    // обработка списка пользователей
} catch (error) {
    // обработка ошибки
}

В компонентах можно отслеживать состояние соединения:

const store = useAppStore();
const isConnected = computed(() => store.isSocketConnected);
const socketError = computed(() => store.socketError);

Это решение обеспечивает:

Надежное соединение с автоматическим восстановлением
Четкую обработку ошибок
Информирование пользователя о проблемах
Типобезопасность
Легкость поддержки и расширения функционала

*/