<template>
  <v-row v-if="productStore.products.length > 0">
    <v-col
      v-for="product in productStore.products"
      :key="product._id"
      cols="12"
      md="4"
    >
      <v-card class="product-card">
        <v-card-title>{{ product.name }}</v-card-title>
        <p><b>Price:</b> ${{ product.price }}</p>
        <p><b>Category:</b> {{ product.category }}</p>
        <p><b>Subcategory:</b> {{ product.subcategory }}</p>
      </v-card>
    </v-col>
  </v-row>
  <h1 v-else>Товаров не найдено</h1>
</template>

<script lang="ts" setup>
import { useProductStore } from '../../stores/ProductStore';
const productStore = useProductStore();
</script>