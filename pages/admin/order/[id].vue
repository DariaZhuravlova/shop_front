<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useAppStore } from '@/stores/AppStore';
import { useProductStore } from '@/stores/ProductStore';

interface Order {
  delivery: {
    city: string;
    department: string;
  };
  guestContact: {
    email: string;
    name: string;
    surname: String;

    phone: string;
  };
  number: number;
  products: [];
  totalPrice: number;
  _id: string;
}

const appStore = useAppStore();
const productStore = useProductStore();
const route = useRoute();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const order = ref<Order | null>(null);
const products = ref<any[] | null>([]);
appStore.isLoading = true;
async function getOrder() {
  try {
    const response = await axios.get(`${apiUrl}/api/order/${route.params.id}`);
    order.value = response.data;
    appStore.isLoading = false;
    order.value?.products.forEach(async (elem: {}) => {
      const product = await productStore.getProduct(elem.product);
      products.value.push({ product, quantity: elem.quantity });
    });
    console.log(products.value);
  } catch (error) {
    console.log(error);
  }
}

getOrder();
</script>



<template>
  <div class="pa-2">
    <organism-Loader v-if="appStore.isLoading" :isBlock="true" />
    <div v-else>
      <h1 v-if="order">Заказ №{{ order.number }}</h1>
      <div>
        <v-table
          style="border: 1px solid; max-width: 800px"
          class="mt-4 pa-1 center"
        >
          <strong>Контактная информация</strong>
          <tbody>
            <tr>
              <th class="text-left">Имя</th>
              <td>{{ order.guestContact.name || 'Отсутствует' }}</td>
            </tr>
            <tr>
              <th class="text-left">Фамилия</th>
              <td>{{ order.guestContact.surname || 'Отсутствует' }}</td>
            </tr>
            <tr>
              <th class="text-left">Email</th>
              <td>{{ order.guestContact.email || 'Отсутствует' }}</td>
            </tr>
            <tr>
              <th class="text-left">Телефон</th>
              <td>{{ order.guestContact.phone || 'Отсутствует' }}</td>
            </tr>
          </tbody>
        </v-table>
        <div
          style="border: 1px solid; max-width: 800px"
          class="mt-4 pa-1 center"
        >
          <strong>Заказ</strong>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Товар</th>
                <th class="text-left">Количество</th>
                <th class="text-left">Цена</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.product._id">
                <td>{{ item.product.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.product.price }} грн</td>
              </tr>
              <tr>
                <td>Сумма заказа</td>
                <td>{{ order.totalPrice }} грн</td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <v-table
          style="border: 1px solid; max-width: 800px"
          class="mt-4 pa-1 center"
        >
          <strong>Доставка</strong>
          <tbody>
            <tr>
              <th class="text-left">Город</th>
              <td>{{ order.delivery.city || 'Отсутствует' }}</td>
            </tr>
            <tr>
              <th class="text-left">Отделение</th>
              <td>{{ order.delivery.department || 'Отсутствует' }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>

<style  scoped>
.center {
  margin: 0 auto;
}
</style>
