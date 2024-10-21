<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
const appStore = useAppStore();
const cartStore = useCartStore();
const envConfig: any = useNuxtApp().$envConfig;
const sendUserInfo = async () => {
  const result = await axios.put(
    `${envConfig.apiUrl}/api/user`,
    appStore.profile
  );
};
</script>

<template>
  <div class="profile">
    <v-row>
      <v-col cols="5">
        <span>Телефон</span>
      </v-col>
      <v-col cols="6">
        <input
          variant="solo"
          v-model="appStore.profile.phone"
          placeholder="phone"
          disabled
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <span>Email</span>
      </v-col>
      <v-col cols="6">
        <input
          variant="solo"
          v-model="appStore.profile.email"
          placeholder="email"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <span>Имя</span>
      </v-col>
      <v-col cols="6">
        <input
          variant="solo"
          v-model="appStore.profile.name"
          placeholder="Имя"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <span>Фамилия</span>
      </v-col>
      <v-col cols="6">
        <input
          variant="solo"
          v-model="appStore.profile.surname"
          placeholder="Фамилия"
        />
      </v-col>
    </v-row>

    <v-col cols="12">
      <v-btn
        class="mt-4"
        style="width: 200px"
        text="Сохранить"
        type="button"
        @click="sendUserInfo"
      ></v-btn>
    </v-col>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  max-width: 700px;
  margin: 0 auto 20px auto;
}
</style>