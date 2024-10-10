<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
const appStore = useAppStore();
const cartStore = useCartStore();

const sendUserInfo = async () => {
  const result = await axios.put(
    'http://localhost:3001/api/user',
    appStore.profile
  );
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <input
        variant="solo"
        v-model="appStore.profile.username"
        label="userName"
        placeholder="neiunfei"
        disabled
      />
    </v-col>

    <v-col cols="12">
      <input
        variant="solo"
        v-model="appStore.profile.phone"
        label="phone"
        placeholder="phone"
      />
    </v-col>

    <v-col cols="12">
      <input
        variant="solo"
        v-model="appStore.profile.email"
        label="phone"
        placeholder="email"
      />
    </v-col>

    <v-col cols="12">
      <input
        variant="solo"
        v-model="appStore.profile.name"
        label="Имя"
        placeholder="Имя"
      />
    </v-col>

    <v-col cols="12">
      <input
        variant="solo"
        v-model="appStore.profile.surname"
        label="Фамилия"
        placeholder="Фамилия"
      />
    </v-col>

    <v-col cols="12">
      <v-btn
        class="mt-4"
        style="width: 200px"
        text="Сохранить"
        type="button"
        @click="sendUserInfo"
      ></v-btn>
    </v-col>
  </v-row>
</template>