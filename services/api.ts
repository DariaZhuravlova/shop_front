import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { RegisterData } from "@/types/registerData";
import type { LoginData } from "@/types/loginData";
import type { productData } from '@/types/productData';
import { useAppStore } from '../stores/AppStore';
import { objectToQueryString } from '../utils/index.ts';
// axios.defaults.baseURL = 'http://localhost:3001'; 
axios.defaults.withCredentials = true; // Включение передачи куки

const appStore = useAppStore()
// проработать индикацию загрузки и добавить искуств задержки в роутах 

async function handleRequest<T>(requestFunc: () => Promise<T>): Promise<T | AxiosResponse | undefined> {
    try {
        appStore.isLoading = true;
        return await requestFunc();
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
        appStore.isLoading = false;
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
        handleRequest(async () => {
            return await axios.get(`${appStore.apiUrl}/api/products?${objectToQueryString(query)}`
                // , {
                //     withCredentials: true // Важно для отправки cookies
                // }
            )
        }),

    getUploadedFiles: async () =>
        handleRequest(async () => {
            return await axios.get(`${appStore.apiUrl}/api/uploaded-files`)
        }),

    postProduct: async (product: productData) =>
        handleRequest(async () =>
            await axios.post(`${appStore.apiUrl}/api/product`, product,
                { headers: { 'Content-Type': 'application/json' } }
            )),

    deleteProduct: async (productId: string) =>
        handleRequest(async () =>
            await axios.delete(`${appStore.apiUrl}/api/product/${productId}`)),

    register: async (registerData: RegisterData) =>
        handleRequest(async () =>
            await axios.post(`${appStore.apiUrl}/api/register`, registerData)),

    login: async (loginData: LoginData) =>
        handleRequest(async () =>
            await axios.post(`${appStore.apiUrl}/api/login`, loginData)),

    getUsers: async () =>
        handleRequest(async () =>
            await axios.get(`${appStore.apiUrl}/api/users`)),

}

export default apiService;
