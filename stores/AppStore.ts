import { defineStore } from "pinia";
import type { RegisterData } from "@/types/registerData";
import type { LoginData } from "@/types/loginData";
import type { userData } from "@/types/userData";
import apiService from "@/services/api";
import type { dtoResponse } from '@/types/dtoResponse.ts';

export const useAppStore = defineStore("app", {
    state: () => ({
        profile: null as userData | null,
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

        // ОРИЕНТИРУЕМСЯ на этот фрагмент в обработке DTO
        // сделать универсальный хендлер 
        async login(loginData: LoginData) {
            try {
                const res = await apiService.login(loginData);
                const result: dtoResponse = res.data;
                if (result.ok) {
                    this.profile = result.data;
                }
                console.log(result);
                return result;
            } catch (error) {
                console.error('Failed to login:', error);
            }
        },

        async getUsers() {
            try {
                const result = await apiService.getUsers();
                this.users = result.data;
                console.log(this.users);

            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        },
    },
}) 