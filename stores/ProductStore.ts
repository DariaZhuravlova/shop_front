import { defineStore } from "pinia";
import apiService from "@/services/api";
import type { ProductData } from "@/types/productData";
import { productMenu } from '@/data/default/productMenu';
export const useProductStore = defineStore("product", {
    state: () => ({
        products: [] as ProductData[],
        currentProduct: {} as ProductData,
        uploadedFiles: [] as string[], // это имена файлов которые уже загружены для отправки на сервер
        currentFiles: [] as File[], //это сами файлы, которые мы выбрали
        selectedFiles: [] as string[], // те которые мы выбирали из существующих  из  existingFiles
        existingFiles: [] as string[], // те имеющиеся которые мы получает с сервера
        previews: [] as string[], // формируется из currentFiles или selectedFiles
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
        async getUploadedFiles() {
            try {
                const result = await apiService.getUploadedFiles();
                this.existingFiles = result?.data.data || [];
            }
            catch (error) {
                console.log(error);

            }
        },
        async getProduct(id: string) {
            try {
                const result = await apiService.getProduct(id);
                this.currentProduct = result?.data;
                return result?.data;
            } catch (error) {
                console.error('Failed to post product:', error);
            }
        },
        async editProduct(product: ProductData) {
            try {
                await apiService.editProduct(product);
                this.getProduct(this.currentProduct._id);
            } catch (error) {
                console.error('Failed to edit product:', error);
            }
        },
        async postProduct(product: ProductData) {
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
