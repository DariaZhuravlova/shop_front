import { defineStore } from "pinia";
import axios from 'axios';


export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
  async getProducts() {
    const result = await axios ('http://localhost:3001/product') 
    this.products = result.data
    console.log(this.products)
   } 
  },
  getters: {
   
  }
})