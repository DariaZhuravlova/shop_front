<template>
  <v-container>
    <v-tabs v-model="tab" align-tabs="center" color="primary">
      <v-tab :value="1">Login</v-tab>
      <v-tab :value="2">Registration</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :key="2" :value="2">
        <v-container fluid>
          <v-form @submit.prevent="submitRegister">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-text-field
                  variant="solo"
                  v-model="phone.value.value"
                  :error-messages="
                    phone.errorMessage.value || errorResponseRegister
                  "
                  label="User Name"
                  @input="errorResponseRegister = ''"
                ></v-text-field>
                <v-text-field
                  variant="solo"
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  label="password"
                  type="password"
                  min="0"
                ></v-text-field>
                <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :key="1" :value="1">
        <v-container fluid>
          <v-form @submit.prevent="submitLogin">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-text-field
                  variant="solo"
                  v-model="phone.value.value"
                  :error-messages="
                    phone.errorMessage.value || errorResponseLogin
                  "
                  @input="errorResponseLogin = ''"
                  label="User Name"
                ></v-text-field>
                <v-text-field
                  variant="solo"
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  label="password"
                  type="password"
                  min="0"
                ></v-text-field>
                <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>

    <h2>Все пользователи</h2>
    <v-row>
      <v-col v-for="user in appStore.users" :key="user._id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ user.phone }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/AppStore';
import { useField, useForm } from 'vee-validate';
import type { dtoResponse } from '../types/dtoResponse';
import { useRouter } from 'vue-router';
import socket, { sendUserInfo } from '@/socket-client';

const router = useRouter();
definePageMeta({
  layout: 'empty',
});

const appStore = useAppStore();
const tab = ref<null | number>(null);
const errorResponseRegister = ref<undefined | string>('');
const errorResponseLogin = ref<undefined | string>('');

onMounted(() => {
  appStore.getUsers();
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    phone(value: string) {
      if (!value?.length) return 'Введите имя';
      else if (value?.length >= 2) return true;
      else return 'Имя содержит минимум 2 символа';
    },
    password(value: string) {
      if (!value?.length) return 'Введите парооль';
      else if (value?.length >= 4) return true;
      else return 'Пароль содержит минимум 4 символа';
    },
  },
});

const phone = useField('phone');
const password = useField('password');

const submitRegister = handleSubmit(async (values: any) => {
  const { phone, password } = values;

  const result = await appStore.register({ phone, password });
  if (result?.data.ok) {
    appStore.snackbarText = result?.data.message;
    appStore.snackbarColor = 'success';
    appStore.isOpenSnackbar = true;
    tab.value = 1;
  } else {
    appStore.snackbarText = result?.data.message;
    appStore.snackbarColor = 'error';
    appStore.snackbarTimeout = 4000;
    appStore.isOpenSnackbar = true;
    errorResponseRegister.value = result?.data.message;
  }

  handleReset();
  appStore.getUsers();
});

const submitLogin = handleSubmit(async (values: any) => {
  const { phone, password } = values;

  const result = await appStore.login({
    phone,
    password,
  });

  if (result?.ok) {
    appStore.snackbarText = result?.message;
    appStore.snackbarColor = 'success';
    appStore.isOpenSnackbar = true;
    // localStorage.setItem('token', result.token);
    router.push('/');
    sendUserInfo(result.user);
  } else if (typeof result == 'string') {
    appStore.snackbarText = result;
    appStore.snackbarColor = 'error';
    appStore.isOpenSnackbar = true;
    errorResponseLogin.value = result;
  }
  handleReset();
});
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
}

.product-card {
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;

  .v-card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .v-btn {
    margin-top: 20px;
  }
}
</style>