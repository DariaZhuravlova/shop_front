<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
const appStore = useAppStore();
const cartStore = useCartStore();

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const orders = ref([]);
async function getOrders() {
  orders.value = await axios.get(`${apiUrl}/api/orders`);
  // orders.value = orders.data;
  console.log(orders.value.data);
}



onMounted(() => {
  getOrders();
});

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    adress: '12345',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
  },
  {
    name: 'Eclair',
    calories: 262,
  },
  {
    name: 'Cupcake',
    calories: 305,
  },
  {
    name: 'Gingerbread',
    calories: 356,
  },
  {
    name: 'Jelly bean',
    calories: 375,
  },
  {
    name: 'Lollipop',
    calories: 392,
  },
  {
    name: 'Honeycomb',
    calories: 408,
  },
  {
    name: 'Donut',
    calories: 452,
  },
  {
    name: 'KitKat',
    calories: 518,
  },
]
</script>

<template>
  <div>
    <h1>Заказы админ</h1>
    <v-table
    height="300px"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-left font-weight-bold">
          Номер заказа
        </th>
        <th class="text-left font-weight-bold">
          Имя Клиента
        </th>
        <th class="text-left font-weight-bold">
          Телефон
        </th>
        <th class="text-left font-weight-bold">
          E-mail
        </th>
        <th class="text-left font-weight-bold">
          Итоговая сумма
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in orders.data"
        :key="item._id"
      >
        <td>{{ item.number }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.adress }}</td>
      </tr>
    </tbody>
  </v-table>
  </div>
</template>