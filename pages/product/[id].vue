<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { productMenu } from '@/data/default/productMenu';
import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';
const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const appStore = useAppStore();
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://shop-back-mh7t.onrender.com'
    : 'http://localhost:3001';
async function fetchProduct() {
  try {
    const id = route.params.id;
    console.log(id);

    await productStore.getProduct(id as string);
    console.log(productStore.currentProduct.image);
  } catch (e) {
    console.error(e);
    // router.push('/');
  }
}

fetchProduct();
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <h1 class="text-center mb-4">{{ productStore.currentProduct.name }}</h1>
        <v-carousel
          height="400"
          show-arrows="hover"
          cycle
          hide-delimiter-background
          v-if="productStore.currentProduct.image"
        >
          <v-carousel-item
            v-for="img in productStore.currentProduct.image"
            :key="img"
            :src="apiUrl + '/' + img"
          >
          </v-carousel-item>
        </v-carousel>
        <atom-DiscountedPrice :price="productStore.currentProduct.price" />
      </v-col>
    </v-row>
  </v-container>
</template>