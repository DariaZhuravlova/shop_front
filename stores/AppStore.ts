import { defineStore } from "pinia";
import type { RegisterData } from "@/types/registerData";
import type { LoginData } from "@/types/loginData";
import type { userData } from "@/types/userData";
import apiService from "@/services/api";

export const useAppStore = defineStore("app", {
    state: () => ({
        profile: {},
        users: [] as userData[],
    }),
    actions: {
        async register(registerData: RegisterData) {
            try {
                const result = await apiService.register(registerData);
                console.log(result);
            } catch (error) {
                console.error('Failed to register:', error);
            }
        },

        async login(loginData: LoginData) {
            try {
                const result = await apiService.login(loginData);
                console.log(result);
            } catch (error) {
                console.error('Failed to login:', error);
            }
        },

        async getUsers() {
            try {
                const result = await apiService.getUsers();
                this.users = result;
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        },
    },
}) 