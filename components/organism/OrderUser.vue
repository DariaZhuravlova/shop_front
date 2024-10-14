<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
const appStore = useAppStore();
const cartStore = useCartStore();

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
</script>

<template>
  <div>
    <h1>Заказы клиент</h1>
  </div>
</template>