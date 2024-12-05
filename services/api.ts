import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RegisterData } from "@/types/registerData";
import type { LoginData } from "@/types/loginData";
import type { ProductData } from '@/types/productData';
import { objectToQueryString } from '../utils/index.ts';
import { useAppStore } from '../stores/AppStore';


const baseURL: any = process.env.NODE_ENV === 'production'
    ? 'https://shop-back-mh7t.onrender.com'
    : 'http://localhost:3001';

// Создание экземпляра Axios
const apiClient = axios.create({
    baseURL, // Задаём базовый URL
    timeout: 10000, // Таймаут запросов
    withCredentials: true, // Передача куков
    headers: {
        'Content-Type': 'application/json',
    },
});

// Перехватчик запросов
apiClient.interceptors.request.use(

    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (token && token !== 'null') {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        useAppStore().isLoading = true; // Включаем индикатор загрузки
        return config;
    },
    (error) => {
        useAppStore().isLoading = false; // Выключаем индикатор при ошибке
        return Promise.reject(error);
    }
);

// Перехватчик ответов
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        useAppStore().isLoading = false; // Выключаем индикатор загрузки
        // Чтение токена из заголовков ответа
        const token = response.headers['authorization'] || response.headers['Authorization'];
        console.log(response.config.url, token);



        if (token && token !== 'null') {
            localStorage.setItem('token', token); // Сохраняем токен в LocalStorage
        }
        return response; // Возвращаем успешный ответ
    },
    (error) => {
        useAppStore().isLoading = false; // Выключаем индикатор загрузки

        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status) {
                if (status >= 500 && status < 600) {
                    handleServerError(status);
                } else if (status === 401) {
                    localStorage.clear();
                    useAppStore().profile = null;
                    useRouter().push('/auth');
                    setTimeout(() => {
                        useAppStore().isShowModal = true;
                        useAppStore().modalData.title = 'Время сессии истекло (((';
                        useAppStore().modalData.icon = 'none';
                        useAppStore().modalData.content = [{ type: 'text', text: 'Пройдите авторизацию заново' }]
                    }, 1000);
                }
            }
        } else {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
        }
        return Promise.reject(error); // Пробрасываем ошибку для дальнейшей обработки
    }
);

// Функция обработки серверных ошибок
function handleServerError(status: number) {
    const messages: Record<number, string> = {
        500: 'Internal Server Error. Please try again later.',
        501: 'Not Implemented. The server does not support the requested functionality.',
        502: 'Bad Gateway. Invalid response from the upstream server.',
        503: 'Service Unavailable. The server is currently unable to handle the request.',
        504: 'Gateway Timeout. The server did not respond in time.',
        505: 'HTTP Version Not Supported by the server.',
    };
    alert(messages[status] || 'Server error. Please try again later.');
}
const apiService = {
    getProducts: async (query = {}) =>
        apiClient.get(`/api/products?${objectToQueryString(query)}`),

    getUploadedFiles: async () =>
        apiClient.get(`/api/uploaded-files?random=${Math.random()}`),

    getProduct: async (id: string) =>
        apiClient.get(`/api/product/${id}`),

    postProduct: async (product: ProductData) =>
        apiClient.post(`/api/product`, product),

    editProduct: async (product: ProductData) =>
        apiClient.put(`/api/product`, product),

    deleteProduct: async (productId: string) =>
        apiClient.delete(`/api/product/${productId}`),

    register: async (registerData: RegisterData) =>
        apiClient.post(`/api/register`, registerData),

    login: async (loginData: LoginData) =>
        apiClient.post(`/api/login`, loginData),

    logout: async () =>
        apiClient.get(`/api/logout`),

    getProfileInfo: async () =>
        apiClient.get(`/api/profile`),

    getUsers: async () =>
        apiClient.get(`/api/users`),

    postOrder: async (order: any) =>
        apiClient.post(`/api/order`, order),

    getOrders: async () =>
        apiClient.get(`/api/orders`),

    getOrder: async () => {
        const phone: string = useAppStore().profile.phone;
        return apiClient.get(`/api/order/phone/${phone}`);
    },
};

export default apiService;
