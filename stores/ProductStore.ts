import { defineStore } from "pinia";
import axios from 'axios';
import apiService from "@/services/api";
const apiUrl = apiService.apiUrl;
export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
    }),
    actions: {
        async getProducts() {
            try {
                const result = await apiService.getProducts();
                console.log(process.env.NODE_ENV);

                this.products = result.data;
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        },
        async postProduct(productName: string, productPrice: number) {
            try {
                await axios.post(`${apiUrl}/product`,
                    {
                        name: productName,
                        price: productPrice
                    },
                    { headers: { 'Content-Type': 'application/json' } });
                this.getProducts();
            } catch (error) {
                console.error('Failed to post product:', error);
            }
        },
        async deleteProduct(productId: string) {
            try {
                await axios.delete(`${apiUrl}/product/${productId}`);
                this.getProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        },
    },
});

