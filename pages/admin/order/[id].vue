<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useAppStore } from '@/stores/AppStore';

interface Order {
  delivery: {
    city: string;
    department: string;
  };
  guestContact: {
    email: string;
    name: string;
    phone: string;
  };
  number: number;
  products: [];
  totalPrice: number;
  _id: string;
}

const appStore = useAppStore();
const route = useRoute();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const order = ref<Order | null>(null);
appStore.isLoading = true;
async function getOrder() {
  try {
    const response = await axios.get(`${apiUrl}/api/order/${route.params.id}`);
    order.value = response.data;
    appStore.isLoading = false;
  } catch (error) {
    console.log(error);
  }
}

getOrder();
</script>



<template>
  <div>
    <organism-Loader v-if="appStore.isLoading" :isBlock="true" />
    <div v-else class="order-admin">
      <h1 v-if="order">Заказ №{{ order.number }}</h1>
    </div>
  </div>
</template>
