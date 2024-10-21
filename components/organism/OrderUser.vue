<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';

const appStore = useAppStore();
const cartStore = useCartStore();
const envConfig: any = useNuxtApp().$envConfig;
const orders = ref([]);

const sendUserInfo = async () => {
  const result = await axios.put(
    `${envConfig.apiUrl}/api/user`,
    appStore.profile
  );
};

onMounted(async () => {
  const response = await cartStore.getOrder();
  orders.value = response?.data;
  if (!appStore.profile) return; // stop
  const { name: pName, surname: pSurname, email: pEmail } = appStore.profile;

  if (orders.value.length > 0 && (!pName || !pSurname || !pEmail)) {
    const { name, surname, email } =
      orders.value[orders.value.length - 1].guestContact;
    if (!pName && name) appStore.profile.name = name;
    if (!pSurname && surname) appStore.profile.surname = surname;
    if (!pEmail && email) appStore.profile.email = email;

    sendUserInfo(); // ???
  }

  orders.value = await Promise.all(
    orders.value.map(async (elem) => {
      const updatedProducts = await Promise.all(
        elem.products.map(async (item) => {
          const { data } = await axios.get(
            `${envConfig.apiUrl}/api/product/${item.product}`
          );
          return {
            productName: data.name,
            productImg: data.image[0],
            quantity: item.quantity,
            price: data.price,
          };
        })
      );
      elem.products = updatedProducts;
      return elem;
    })
  );
});
</script>

<template>
  <div>
    <v-row v-for="order in orders" :key="order.number" class="order">
      <v-col cols="12" class="mb-6">
        <v-row justify="space-between" align="center">
          <span class="font-weight-bold">Заказ №{{ order.number }}</span>
          <span class="font-weight-bold text-success">Оформлен</span>
        </v-row>
      </v-col>
      <v-col v-for="prod in order.products" :key="prod.productName" cols="12">
        <v-row align="center">
          <v-col cols="2" class="pa-0">
            <img
              class="w-100"
              :src="`${envConfig.apiUrl}/${prod.productImg}`"
              alt="product"
            />
          </v-col>
          <v-col cols="6">
            <div>{{ prod.productName }}</div>
            <div style="color: grey">{{ prod.quantity }} шт.</div>
            <div>{{ prod.price }} грн/шт.</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="space-between" align="center">
          <span class="font-weight-bold">К оплате:</span>
          <span class="font-weight-bold">{{ order.totalPrice }} грн.</span>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.order {
  max-width: 700px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
}
</style> 