import axios from 'axios';
import type { RegisterData } from "@/types/registerData";
import type { LoginData } from "@/types/loginData";

async function handleRequest<T>(requestFunc: () => Promise<T>): Promise<T> {
    try {
        return await requestFunc();
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            handleServerError(status);
        } else {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
        }
        throw error;
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

const apiUrl = process.env.NODE_ENV === 'production' ? 'https://shop-back-mh7t.onrender.com' : 'http://localhost:3001';

const apiService = {
    apiUrl: process.env.NODE_ENV === 'production' ? 'https://shop-back-mh7t.onrender.com' : 'http://localhost:3001',

    async getProducts() {
        try {
            const response = await axios.get(`${this.apiUrl}/api/products`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    },

    async postProduct(productName: string, productPrice: number) {
        try {
            await axios.post(`${this.apiUrl}/api/product`,
                {
                    name: productName,
                    price: productPrice
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
        } catch (error) {
            console.error('Failed to post product:', error);
            throw error;
        }
    },

    async deleteProduct(productId: string) {
        try {
            await axios.delete(`${this.apiUrl}/api/product/${productId}`);
        } catch (error) {
            console.error('Failed to delete product:', error);
            throw error;
        }
    },

    async register(registerData: RegisterData) {
        try {
            await axios.post(`${this.apiUrl}/api/register`, registerData);
        } catch (error) {
            console.error('Failed to register:', error);
            throw error;
        }
    },
    // выработать подход для реагирования на коду ошибок из апи
    // воссоздать на беке ошибку с несколькими статус-кодами
    // проработать индикацию загрузки и добавить искуств задержки в роутах 
    // async login(loginData: LoginData) {
    //     try {
    //         const response = await axios.post(`${this.apiUrl}/api/login`, loginData);
    //         return response.data;
            
    //     } catch (error) {
    //         console.error('Failed to login:', error);
    //         throw error;
    //     }
    // },

    async login2(loginData: LoginData) {
        return handleRequest(async () => {
            const response = await axios.post(`${this.apiUrl}/api/login`, loginData);
            return response.data;
        });
    },

    login: async (loginData: LoginData) => 
        handleRequest(async () => 
            await axios.post(`${apiUrl}/api/login`, loginData)),

    async getUsers() {
        try {
            const response = await axios.get(`${this.apiUrl}/api/users`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    }
}

export default apiService;
