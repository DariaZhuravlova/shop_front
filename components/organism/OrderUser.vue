<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';

const appStore = useAppStore();
const cartStore = useCartStore();

const orders = ref([]);

onMounted(async () => {
  const response = await cartStore.getOrder();
  orders.value = response?.data;
  console.log(orders.value);
});
</script>

<template>
  <div>
    <h1>Заказы клиент</h1>
  </div>
</template>