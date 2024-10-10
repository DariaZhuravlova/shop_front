<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
const appStore = useAppStore();
const cartStore = useCartStore();
// const userName = ref(appStore.profile.phone || null);

// const phone = ref(appStore.profile.phone || null);

const sendUserInfo = async () => {
  const result = await axios.put('http://localhost:3001/api/user', {
    data: true,
  });
  console.log(result);
};
</script>

<template>
  <div class="profile">
    <h1>hjrgfnklerwmfdol</h1>
    <div class="user">
      <h1>bgrhdhnfekwejsfmoiewjfoi</h1>
      <input
        variant="solo"
        v-model="appStore.profile.username"
        label="userName"
        placeholder="neiunfei"
        disabled
      />
    </div>
    <div class="phone">
      <input
        variant="solo"
        v-model="appStore.profile.phone"
        label="phone"
        placeholder="phone"
      />
    </div>
    <div class="phone">
      <input
        variant="solo"
        v-model="appStore.profile.email"
        label="phone"
        placeholder="email"
      />
    </div>
    <div class="phone">
      <input
        variant="solo"
        v-model="appStore.profile.name"
        label="Имя"
        placeholder="Имя"
      />

      <input
        variant="solo"
        v-model="appStore.profile.surname"
        label="Фамилия"
        placeholder="Фамилия"
      />
    </div>
    <v-btn
      class="mt-4"
      style="width: 200px"
      text="Сохранить"
      type="button"
      @click="sendUserInfo"
    ></v-btn>
  </div>
</template>