<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import type { ProductData } from '../../types/productData';

import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();
const appStore = useAppStore();
const productStore = useProductStore();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const props = defineProps<{
  indProduct: number;
}>();

let product = ref({});
product = cartStore.currentCart[props.indProduct];
function reduceQuantity() {
  if (product.quantity > 1) product.quantity--;
}
function addQuantity() {
  if (product.quantity < product.product.quantitiesInStore) product.quantity++;
}
</script>

<template>
  <div class="cart-wrapper">
    <div class="cart_items">
      <div class="cart_items-img">
        <img :src="apiUrl + '/' + product.product.image[0]" />
      </div>
      <div class="cart_items-property">
        <div>{{ product.product.name }}</div>
        <div>В наличии: {{ product.product.quantitiesInStore }} шт.</div>
        <div style="font-size: 16px">{{ product.product.price }} грн/шт.</div>
      </div>
    </div>
    <div class="items_amount">
      <div class="items_amount-price">
        <div>
          <button class="change_amount-btn" @click="reduceQuantity">-</button>
          <span>{{ product.quantity }}</span>
          <button class="change_amount-btn" @click="addQuantity">+</button>
        </div>
        <span>{{ product.product.price * product.quantity }} грн.</span>
      </div>
    </div>
  </div>
</template>  

<style lang="scss" scoped>
.cart-wrapper {
  margin-bottom: 12px;
  border-bottom: 1px solid;
  .cart_items {
    display: flex;
    flex-direction: colum;
    margin-bottom: 0 0 10px 0;
    padding: 0;
    height: 80px;

    &-img {
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-property {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .items_amount {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 10px 0 15px 0;

    &-price {
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      div {
        width: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .change_amount-btn {
        border: 1px solid;
        border-radius: 5px;
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>