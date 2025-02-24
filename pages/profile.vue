<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAppStore } from '../stores/AppStore';

definePageMeta({
  layout: 'empty',
});

const appStore = useAppStore();
const drawer = ref(true); // Боковое меню открыто по умолчанию
const activeTab = ref('profile'); // Открываем "Профиль" по умолчанию

const isAdmin = computed(() => appStore.profile?.role === 'admin');
const isCustomer = computed(() => appStore.profile?.role === 'customer');

// Определяем вкладки для админа и покупателя
const menuItems = computed(() => {
  const items = [{ title: 'Профиль', icon: 'mdi-account', tab: 'profile' }];
  if (isAdmin.value) {
    items.push(
      { title: 'Пользователи онлайн', icon: 'mdi-account-group', tab: 'users-online' },
      { title: 'Заказы', icon: 'mdi-cart', tab: 'orders-admin' },
      { title: 'Сообщения', icon: 'mdi-message-text', tab: 'messages' }
    );
  }
  if (isCustomer.value) {
    items.push({ title: 'Мои заказы', icon: 'mdi-package', tab: 'orders-user' });
  }
  return items;
});
</script>

<template>
  <v-app>
    <!-- Боковое меню -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6">Меню</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item
          v-for="item in menuItems"
          :key="item.tab"
          @click="activeTab = item.tab"
          :prepend-icon="item.icon"
          :class="{ 'bg-grey-lighten-2': activeTab === item.tab }"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Основной контент -->
    <v-main>
      <v-container>
        <organism-UserProfile v-if="activeTab === 'profile' && appStore.profile" />

        <template v-if="isAdmin">
          <organism-UsersList v-if="activeTab === 'users-online'" />
          <organism-OrderAdmin v-if="activeTab === 'orders-admin'" />
          <organism-AdminMessages v-if="activeTab === 'messages'" />
        </template>

        <template v-if="isCustomer">
          <organism-OrderUser v-if="activeTab === 'orders-user'" />
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>

