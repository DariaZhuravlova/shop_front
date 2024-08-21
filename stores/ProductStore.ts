import { defineStore } from "pinia";
import apiService from "@/services/api";
import type { productData } from "@/types/productData";
import { productMenu } from '@/data/default/productMenu';

export const useProductStore = defineStore("product", {
    state: () => ({
        products: [] as productData[],
        uploadedFiles: [] as string[],
        previews: [] as any,
    }),
    actions: {
        async getProducts(query = {}) {
            try {
                const data = await apiService.getProducts(query);
                data?.data.map(elem => {
                    productMenu.find(item => {
                        if (item.id == elem.category) {
                            elem.category = item.name.ru;
                            item.items.find(subitem => {
                                if (subitem.id == elem.subcategory) {
                                    elem.subcategory = subitem.name.ru
                                }
                            })
                        }
                    });
                    return elem
                })

                this.products = data?.data || [];
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        },
        async postProduct(product: productData) {
            try {
                await apiService.postProduct(product);
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


