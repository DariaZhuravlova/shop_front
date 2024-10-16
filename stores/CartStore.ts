import { defineStore } from 'pinia';
import apiService from '@/services/api';
import type { RegisterData } from '@/types/registerData';
import type { LoginData } from '@/types/loginData';
import type { userData } from '@/types/userData';
import type { dtoResponse } from '@/types/dtoResponse.ts';
import type { ProductData } from '../../types/productData';

export const useCartStore = defineStore('cart', {
    state: () => ({
        currentCart: [],
    }),
    actions: {
        addProductToCart(product: ProductData) {
            this.currentCart.push({
                product: product,
                quantity: 1
            })


        },
        deleteProduct(id: string) {
            this.currentCart = this.currentCart.filter(item => item.product._id !== id)
        },
        async addOrder(contacts: { username: string, phone: string, email: string }, delivery: { city: string, department: string }) {
            const order = {
                products: this.currentCart,
                totalPrice: this.totalPrice,
                guestContact: contacts,
                delivery
            }

            return await apiService.postOrder(order)

        }
    },
    getters: {
        totalPrice: (state) => {
            return state.currentCart.reduce((acum, elem) => {
                return acum + elem.product.price * elem.quantity;
            }, 0);
        }
    },

});

