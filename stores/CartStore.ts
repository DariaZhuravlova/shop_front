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
        guestContact: {},
        delivery: {},
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
        async addOrder(contacts, delivery) {
            const order = {
                products: this.currentCart,
                guestContact: contacts,
                delivery
            }

           const result = await apiService.postOrder(order)
           if (result?.ok) {
               console.log(result);
               this.currentCart = [];
            //    this.contacts = {};
            //    this.delivery = {};
               alert("Ваш заказ принят. Спасибо за покупку!");
           } else {
               alert("Произошла ошибка при оформлении заказа. Попробуйте еще раз.");
           }
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

