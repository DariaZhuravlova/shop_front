import { defineStore } from "pinia";
import axios from 'axios';
import type { RegisterData } from "@/types/registerData";
import apiService from "@/services/api";
const apiUrl = apiService.apiUrl;
export const useAppStore = defineStore("app", {
    state: () => ({
        profile: {},
    }),
    actions: {
        async register(registerData: RegisterData) {
            try {
                const result = await axios.post(`${apiUrl}/register`, registerData);
                console.log(result);


            } catch (error) {
                console.error('Failed to register:', error);
            }
        },

    },
}) 