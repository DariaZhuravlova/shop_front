<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { productMenu } from '@/data/default/productMenu';
import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';
import { characteristicsSchemaKeys } from '@/data/default/productCharacteristics';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const appStore = useAppStore();
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://shop-back-mh7t.onrender.com'
    : 'http://localhost:3001';

const characteristics = ref([...characteristicsSchemaKeys]);
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
        <div v-for="ch in characteristics" :key="ch.key">
          <div v-if="ch.active">
            <v-label>{{ ch.title }}</v-label>
            <input type="text" placeholder="Enter value"/>
            <v-icon @click="ch.active = false" class="black--text" icon="mdi-close">
             
            </v-icon>
          </div>

          <div v-else>
            <div @click="ch.active = true">{{ ch.title }}</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
