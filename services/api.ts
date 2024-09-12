import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { RegisterData } from "@/types/registerData";
import type { LoginData } from "@/types/loginData";
import type { ProductData } from '@/types/productData';
import { objectToQueryString } from '../utils/index.ts';
import { useAppStore } from '../stores/AppStore';

axios.defaults.withCredentials = true; // Включение передачи куки

async function handleRequest<T>(requestFunc: (envConfig: any, option: any) => Promise<T>): Promise<T | AxiosResponse | undefined> {
    try {
        const envConfig: any = useNuxtApp().$envConfig;
        const option = { headers: { 'Content-Type': 'application/json' } };
        useAppStore().isLoading = true;
        return await requestFunc(envConfig, option);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            if (status >= 500 && status < 600) {
                handleServerError(status)
            } else {
                return error.response;
            }
        } else {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
        }
    } finally {
        const envConfig = useNuxtApp().$envConfig;
        useAppStore().isLoading = false;
    }
}

function handleServerError(status: number) {
    switch (status) {
        case 500:
            alert('Internal Server Error. Please try again later.');
            break;
        case 501:
            alert('Not Implemented. The server does not support the functionality required to fulfill the request.');
            break;
        case 502:
            alert('Bad Gateway. The server received an invalid response from the upstream server.');
            break;
        case 503:
            alert('Service Unavailable. The server is currently unable to handle the request due to maintenance.');
            break;
        case 504:
            alert('Gateway Timeout. The server did not receive a timely response from the upstream server.');
            break;
        case 505:
            alert('HTTP Version Not Supported. The server does not support the HTTP protocol version used in the request.');
            break;
        default:
            alert('Server error. Please try again later.');
            break;
    }
}

const apiService = {
    getProducts: async (query = {}) =>
        handleRequest(async (envConfig) => {
            return await axios.get(`${envConfig.apiUrl}/api/products?${objectToQueryString(query)}`,
            )
        }),

    getUploadedFiles: async () =>
        handleRequest(async (envConfig) => {
            return await axios.get(`${envConfig.apiUrl}/api/uploaded-files?random=${Math.random()}`,

            )
        }),
    getProduct: async (id: string) =>
        handleRequest(async (envConfig) => {
            return await axios.get(`${envConfig.apiUrl}/api/product/${id}`)
        }),

    postProduct: async (product: ProductData) =>
        handleRequest(async (envConfig, option) => {
            return await axios.post(`${envConfig.apiUrl}/api/product`, product, option,

            )
        }),
    editProduct: async (product: ProductData) =>
        handleRequest(async (envConfig, option) => {
            return await axios.put(`${envConfig.apiUrl}/api/product`, product, option,
            )
        }),


    deleteProduct: async (productId: string) =>
        handleRequest(async (envConfig) => {
            return await axios.delete(`${envConfig.apiUrl}/api/product/${productId}`)
        }),

    register: async (registerData: RegisterData) =>
        handleRequest(async (envConfig, option) => {
            return await axios.post(`${envConfig.apiUrl}/api/register`, registerData, option)
        }),

    login: async (loginData: LoginData) =>
        handleRequest(async (envConfig, option) => {
            return await axios.post(`${envConfig.apiUrl}/api/login`, loginData, option)
        }),

    getUsers: async () =>
        handleRequest(async (envConfig) => {
            return await axios.get(`${envConfig.apiUrl}/api/users`)
        }),
};

export default apiService;
