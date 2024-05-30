import { defineStore } from "pinia";
import axios from 'axios';
import type { RegisterData } from "@/types/registerData";
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://shop-back-mh7t.onrender.com' : 'http://localhost:3001'

export const useAppStore = defineStore("app", {
  state: () => ({
    profile: {},
}),
actions: {
    async register(registerData: RegisterData) {
      // console.log(registerData);
        try {
            const result = await axios.post(`${apiUrl}/register`, registerData);
            console.log(result);

            
        } catch (error) {
            console.error('Failed to register:', error);
        }
    },
    
},
}) 