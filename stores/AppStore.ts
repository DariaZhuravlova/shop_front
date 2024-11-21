import { defineStore } from 'pinia';
import type { RegisterData } from '@/types/registerData';
import type { LoginData } from '@/types/loginData';
import type { userData } from '@/types/userData';
import apiService from '@/services/api';
import type { dtoResponse } from '@/types/dtoResponse.ts';

export const useAppStore = defineStore('app', {
    state: () => ({
        // apiUrl: process.env.NODE_ENV === 'production' ? 'https://shop-back-mh7t.onrender.com' : 'http://localhost:3001',
        profile: null as userData | null,
        users: [] as userData[],
        role: '' as string,
        isEditMode: false as boolean,
        // loading
        isLoading: false as boolean,
        // snackbar
        isOpenSnackbar: false as boolean,
        snackbarText: '' as string,
        snackbarColor: 'success' as 'success' | 'error' | 'warning' | 'info',
        snackbarTimeout: 2000 as number,
        // modal
        isShowModal: false as boolean,
        modalData: {} as any,
        // ...
        drawerCart: false as boolean
    }),
    actions: {
        async register(registerData: RegisterData) {
            try {
                const result = await apiService.register(registerData);
                console.log(result);
                return result;
            } catch (error) {
                console.error('Failed to register:', error);
            }
        },

        // ОРИЕНТИРУЕМСЯ на этот фрагмент в обработке DTO
        // сделать универсальный хендлер
        async login(loginData: LoginData) {
            try {
                const res = await apiService.login(loginData);
                this.profile = res.data.user;
                return res.data;

            } catch (error) {
                console.error(error);
            }
        },
        async logout() {
            // try {
            //     await apiService.logout();
            // } catch (error) {
            //     console.error('Failed to logout:', error);
            // }
            localStorage.clear();

        },
        async getUsers() {
            try {
                const result = await apiService.getUsers();
                this.users = result?.data;
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        },
        async getProfileInfo() {
            try {
                const result = await apiService.getProfileInfo();
                if (result.data.user) {
                    this.profile = result.data.user;
                    return result.data.user
                }
                else this.logout()
            } catch (error) {
                console.error('Failed to fetch profile info:', error);
            }
        }
    },
});
