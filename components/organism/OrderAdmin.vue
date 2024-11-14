<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { ref, onMounted } from 'vue';
import socket, { getUserList } from '@/socket-client';
const cartStore = useCartStore();
const orders = ref([]);

onMounted(async () => {
  const response = await cartStore.getOrders();
  orders.value = response?.data;
  const userList = await getUserList();
  console.log(userList);
});
</script>

<template>
  <div class="orders-admin">
    <h1 class="title">Заказы админ</h1>
    <v-table class="order-table" height="300px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Номер заказа</th>
          <th class="text-left">Имя Клиента</th>
          <th class="text-left">Телефон</th>
          <th class="text-left">E-mail</th>
          <th class="text-left">Итоговая сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item._id" class="order-row">
          <td>
            <NuxtLink :to="`/admin/order/${item._id}`" class="order-link">{{
              item.number
            }}</NuxtLink>
          </td>
          <td>{{ item.guestContact.name }}</td>
          <td>{{ item.guestContact.phone }}</td>
          <td>{{ item.guestContact.email }}</td>
          <td>{{ item.totalPrice }}₴</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style lang="scss" scoped>
.orders-admin {
  padding: 10px;

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
    // color: #333;
  }

  .order-table {
    width: 100%;
    border-collapse: collapse;

    thead th {
      background-color: #f5f5f5;
      padding: 8px;
      border-bottom: 2px solid #ddd;
      font-size: 14px;
      font-weight: 600;
    }

    tbody td {
      padding: 12px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      text-align: left;
    }

    tbody tr {
      &:hover {
        background-color: #f9f9f9;
      }
    }

    .order-link {
      color: #1e88e5;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (min-width: 768px) {
  .orders-admin {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .order-table {
    thead th {
      padding: 10px;
      font-size: 16px;
    }

    tbody td {
      padding: 15px;
      font-size: 16px;
    }
  }
}
</style>
