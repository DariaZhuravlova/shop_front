<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();
const appStore = useAppStore();
const productStore = useProductStore();
</script>

<template>
  <v-col class="cart">
    <v-row class="cart__header">
      <h1 class="cart__title">Корзина</h1>
      <v-icon
        class="cart__close-btn"
        icon="mdi-close"
        @click="appStore.drawerCart = false"
      ></v-icon>
    </v-row>
    <v-col v-if="cartStore.currentCart.length > 0" class="cart__items">
      <organism-CartItem
        v-for="(item, ind) in cartStore.currentCart"
        :key="item.product._id"
        :indProduct="ind"
      />
      <v-row class="cart__total pa-4 justify-end">
        <strong class="cart__total-price"
          >ИТОГО: {{ cartStore.totalPrice }} грн.</strong
        >
      </v-row>
    </v-col>
    <v-col v-else class="cart__empty">
      <span>Корзина пока пуста... ((</span>
    </v-col>
    <Nuxt-Link :to="'/order'">
      <v-btn
        class="cart__checkout-btn mt-4"
        color="primary"
        v-if="cartStore.currentCart.length > 0"
        >Перейти к оформлению</v-btn
      >
    </Nuxt-Link>
  </v-col>
</template>  
  
  <style lang="scss" scoped>
.cart {
  padding: 25px 10px 50px 10px;
  position: relative;
  text-align: center;

  &__header {
    text-align: center;
  }

  &__title {
    font-size: 24px;
  }

  &__close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    border: none;
  }

  &__close-btn:hover {
    scale: 1.2;
  }

  &__items {
    margin: 15px 0;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__total {
    text-align: right;
  }

  &__total-price {
    font-weight: bold;
  }

  &__empty {
    font-style: italic;
  }

  &__checkout-btn {
    margin-top: 20px;
  }
}
</style>
  