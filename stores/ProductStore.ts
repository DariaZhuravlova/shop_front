import { defineStore } from "pinia";
import axios from 'axios';

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
    async getProducts() {
      try {
        const result = await axios.get('http://localhost:3001/product');
        this.products = result.data;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },
    async postProduct(productName: string, productPrice: number) {
      try {
        await axios.post('http://localhost:3001/product', 
        { name: productName,
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
        await axios.delete(`http://localhost:3001/product/${productId}`);
        this.getProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    },
  },
});

