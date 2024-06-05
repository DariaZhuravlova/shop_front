import { defineStore } from "pinia";
import apiService from "@/services/api";
import type { productData } from "@/types/productData";

export const useProductStore = defineStore("product", {
    state: () => ({
        products: [] as productData[],
    }),
    actions: {
        async getProducts() {
            try {
                const data = await apiService.getProducts();
                this.products = data;
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        },

        async postProduct(productName: string, productPrice: number) {
            try {
                await apiService.postProduct(productName, productPrice);
                await this.getProducts();
            } catch (error) {
                console.error('Failed to post product:', error);
            }
        },

        async deleteProduct(productId: string) {
            try {
                await apiService.deleteProduct(productId);
                await this.getProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    }
});


