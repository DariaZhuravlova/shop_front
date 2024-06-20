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
                  v-model="username.value.value"
                  :error-messages="username.errorMessage.value"
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
      <v-tabs-window-item :key="1" :value="1">
        <v-container fluid>
          <v-form @submit.prevent="submitLogin">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-text-field
                  variant="solo"
                  v-model="username.value.value"
                  :error-messages="username.errorMessage.value"
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
          <v-card-title>{{ user.username }}</v-card-title>
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

const appStore = useAppStore();
const tab = ref(null);
onMounted(() => {
  appStore.getUsers();
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    username(value: string) {
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

const username = useField('username');
const password = useField('password');

const submitRegister = handleSubmit(async (values: any) => {
  const { username, password } = values;

  if (!username || !password) {
    return alert('Заполните все поля');
  }

  const result = await appStore.register({ username, password });
  handleReset();
  appStore.getUsers();
});

const submitLogin = handleSubmit(async (values: any) => {
  const { username, password } = values;

  if (!username || !password) {
    return alert('Заполните все поля');
  }

  const result: dtoResponse | undefined = await appStore.login({
    username,
    password,
  });
  console.log(result);
  if (!result) return alert('Can not login');
  if (result.ok) {
    console.log('ok');
    //redirect to login page or tost-message
  } else {
    alert(result.message);
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