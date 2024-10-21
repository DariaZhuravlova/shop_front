<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
const appStore = useAppStore();
const cartStore = useCartStore();
</script>

<template>
  <div class="profile pa-2">
    <h1 class="d-flex justify-center ma-3">Профиль</h1>
    <organism-UserProfile v-if="appStore.profile" />
    <template v-if="appStore.profile">
      <organism-OrderAdmin v-if="appStore.profile.role === 'admin'" />
      <organism-OrderUser v-else />
    </template>
  </div>
</template>
