import { defineStore } from 'pinia';
import type { RegisterData } from '@/types/registerData';
import type { LoginData } from '@/types/loginData';
import type { userData } from '@/types/userData';
import apiService from '@/services/api';
import type { dtoResponse } from '@/types/dtoResponse.ts';
import { generateFingerPrint } from '@/utils/index';

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
        drawerCart: false as boolean,
        userList: [] as any,
        isOpenChat: false as boolean,
        allChatMessages: [] as any,
        selectedChatUser: null as any,
        msgsList: [] as any,
        isSocketConnected: false as boolean,
        socketError: null as string | null,
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
                this.allChatMessages = []
                const res = await apiService.login(loginData);
                localStorage.setItem('fingerprint', generateFingerPrint());
                this.profile = res.data.user;
                return res.data;

            } catch (error) {
                console.error(error);
            }
        },
        async logout() {
            this.profile = null;
            localStorage.clear();
            // localStorage.removeItem('token');
            this.selectedChatUser = null;

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
        },
        async sendUserInfo(info: any) {
            try {
                const result = await apiService.sendUserInfo(info);
                await this.getProfileInfo()
                return result?.data;

            } catch (error) {
                console.error('Failed to send user info:', error);
            }
        },
        setSocketStatus(status: boolean) {
            this.isSocketConnected = status;
            if (status) {
                this.socketError = null;
            }
        },

        setSocketError(error: string | null) {
            this.socketError = error;
            if (error) {
                this.isSocketConnected = false;
            }
        },
    },
});
