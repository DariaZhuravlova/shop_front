<template>
  <v-card class="product-card">
    <v-img :src="product.image[mainImagePointer] ? 'http://localhost:3001/' + product.image[mainImagePointer] : ''"></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <p><b>Price:</b> ${{ product.price }}</p>
    <p><b>Category:</b> {{ product.category }}</p>
    <p><b>Subcategory:</b> {{ product.subcategory }}</p>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import type { ProductData } from '../../types/productData';

const props = defineProps<{
  product: ProductData;
}>();

const mainImagePointer = ref(0);

if (props.product.mainImagePointer !== undefined) {
  mainImagePointer.value = props.product.mainImagePointer;
}
</script>
