<template>
  <v-row v-if="productStore.products.length > 0" class="pa-2">
    <v-col
      v-for="product in productStore.products"
      :key="product._id"
      cols="12"
      xs="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
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