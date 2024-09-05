<template>
  <Nuxt-Link :to="'/product/' + product._id">
    <v-card class="product-card">
      <v-img
        :src="
          product.image[mainImagePointer]
            ? 'https://shop-back-mh7t.onrender.com/' +
              product.image[mainImagePointer]
            : ''
        "
      ></v-img>
      <v-card-title>{{ product.name }}</v-card-title>
      <div class="card-content">
        <p><b>Price:</b> ${{ product.price }}</p>
        <p><b>Category:</b> {{ product.category }}</p>
        <p><b>Subcategory:</b> {{ product.subcategory }}</p>
      </div>
    </v-card>
  </Nuxt-Link>
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

<style lang="scss" scoped>
.product-card {
  max-width: 300px;
  margin: 10px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.03);
  }

  .v-img {
    height: 200px;
    width: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }

  .card-content {
    padding: 10px;
    flex-grow: 1;

    p {
      margin: 5px 0;
    }
  }

  .v-card-title {
    font-size: 16px;
    text-align: center;
  }

  @media (max-width: 600px) {
    max-width: 100%;
    height: auto;
    margin: 0;
    border-radius: 0;
  }
}
</style>
