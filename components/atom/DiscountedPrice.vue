<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore';

import { useAppStore } from '@/stores/AppStore';

const appStore = useAppStore();

const productStore = useProductStore();

const oldPrice = computed(() => {
  return Math.floor(
    productStore.currentProduct.price +
      (productStore.currentProduct.price * Math.random() * 0.3 + 0.1)
  );
});
</script>

<template>
  <v-row class="product__price" justify="end">
    <v-col cols="3">
      <v-row class="product__price-old">{{ oldPrice }} $</v-row>
      <v-row class="product__price-current">
        <input
          class="product__price-current-input"
          :disabled="!appStore.isEditMode"
          type="text"
          v-model="productStore.currentProduct.price"
        />
      </v-row>
    </v-col>
  </v-row>
</template>  

<style lang="scss" scoped>
.product__price {
  margin-top: 15px;
  .product__price-old {
    font-size: 12px;
    color: #797878;
    text-decoration: line-through;
  }

  .product__price-current {
    &-input {
      font-size: 16px;
      color: #f84147;
    }
    &-input:focus {
      outline: none;
    }
  }
}
</style>