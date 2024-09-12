<template>
  <v-row v-if="productStore.products.length > 0">
    <v-col
      v-for="product in productStore.products"
      :key="product._id"
      cols="12"
      md="4"
    >
      <organism-ProductCard :product="product" />
    </v-col>
  </v-row>
  <h1 class="text-center" v-else>Товаров не найдено</h1>
</template>

<script lang="ts" setup>
import { useProductStore } from '../../stores/ProductStore';
const productStore = useProductStore();
</script>