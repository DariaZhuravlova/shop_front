<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();
const appStore = useAppStore();
const productStore = useProductStore();

const totalPrice = computed(() =>
  cartStore.currentCart.reduce((acum, elem) => {
    acum = acum + elem.product.price * elem.quantity;

    return acum;
  }, 0)
);
</script>

<template>
  <v-col class="cart">
    <v-rov class="text-center">
      <h1>Корзина</h1>
      <v-icon
        class="cls-btn"
        icon="mdi-close"
        @click="appStore.drawerCart = false"
      ></v-icon>
    </v-rov>
    <v-col v-if="cartStore.currentCart.length > 0" class="cart-items">
      <organism-CartItem
        v-for="(item, ind) in cartStore.currentCart"
        :key="item.product._id"
        :indProduct="ind"
      />
    </v-col>
    <v-col>
      <p>
        {{ totalPrice }}
      </p>

      <v-btn>Перейти к оформлению</v-btn>
    </v-col>
  </v-col>
</template>  

<style lang="scss" scoped>
.cart {
  padding: 25px 10px;
  position: relative;

  .cls-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    border: none;
  }
  .cls-btn:hover {
    scale: 1.2;
  }
  .cart-items {
    margin: 15px 0;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>