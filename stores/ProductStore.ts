import { defineStore } from "pinia";
import axios from 'axios';
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://shop-back-mh7t.onrender.com' : 'http://localhost:3001'
export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
    }),
    actions: {
        async getProducts() {
            try {
                const result = await axios.get(`${apiUrl}/product`);
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

