<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';

const appStore = useAppStore();
const cartStore = useCartStore();

const orders = ref([]);

const sendUserInfo = async () => {
  const result = await axios.put(
    'http://localhost:3001/api/user',
    appStore.profile
  );
};

onMounted(async () => {
  const response = await cartStore.getOrder();
  orders.value = response?.data;
  console.log(orders.value);
  console.log(appStore.profile);
  if(!appStore.profile) return // stop
  const { name: pName, surname: pSurname, email: pEmail } = appStore.profile;
  console.log(pName, pSurname, pEmail);
  
  if (orders.value.length > 0 && (!pName || !pSurname || !pEmail)) {
    const { name, surname, email } = orders.value[orders.value.length - 1].guestContact;
    if (!pName && name) appStore.profile.name = name;
    if (!pSurname && surname) appStore.profile.surname = surname;
    if (!pEmail && email) appStore.profile.email = email;
    
  sendUserInfo(); // ??? 
  }
});

</script>

<template>
  <div>
    <h1>Заказы клиент</h1>
  </div>
</template>