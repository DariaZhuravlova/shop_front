import axios from 'axios';
import type { RegisterData } from "@/types/registerData";
import type { LoginData } from "@/types/loginData";

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
    async login(loginData: LoginData) {
        try {
            const response = await axios.post(`${this.apiUrl}/api/login`, loginData);
            return response.data;
        } catch (error) {
            console.error('Failed to login:', error);
            throw error;
        }
    },

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
