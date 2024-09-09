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

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

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
      <v-col cols="12" md="6">
        <h1 class="product__title text-center mb-4">
          {{ productStore.currentProduct.name }}
        </h1>
        <v-carousel
          class="product__carousel"
          height="400"
          show-arrows="hover"
          cycle
          hide-delimiter-background
          v-if="productStore.currentProduct.image"
        >
          <v-carousel-item
            class="product__carousel-item"
            v-for="img in productStore.currentProduct.image"
            :key="img"
            :src="apiUrl + '/' + img"
          >
          </v-carousel-item>
        </v-carousel>
        <atom-DiscountedPrice :price="productStore.currentProduct.price" />
      </v-col>
      <v-col cols="12" md="6">
        <v-row
          class="product__characteristic d-flex align-center"
          v-for="ch in characteristics"
          :key="ch.key"
        >
          <v-col cols="12" sm="6">
            <span
              class="product__characteristic-title"
              @click="ch.active = !ch.active"
            >
              {{ ch.title }}
            </span>
          </v-col>
          <v-col
            :class="{ 'product__characteristic-input--active': ch.active }"
            cols="12"
            sm="6"
          >
            <input
              class="product__characteristic-input"
              type="text"
              :disabled="!ch.active"
              placeholder="Enter value"
            />
            <v-icon
              v-if="ch.active"
              @click="ch.active = false"
              class="product__characteristic-close"
              icon="mdi-close"
            >
            </v-icon>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
  
 <!-- <div v-for="ch in characteristics" :key="ch.key">
          <div cols="12" v-if="ch.active">
            <v-label>{{ ch.title }}</v-label>
            <input type="text" placeholder="Enter value" />
            <v-icon
              @click="ch.active = false"
              class="black--text"
              icon="mdi-close"
            >
            </v-icon>
          </div>

          <div v-else>
            <div @click="ch.active = true">{{ ch.title }}</div>
          </div>
        </div> -->
<style lang="scss" scoped>
.product__characteristic {
  margin-bottom: 4px;
  border-bottom: 1px solid;
  &-title {
    cursor: pointer;
  }
  &-input--active {
    border-bottom: 1px solid;
    padding: 0;
    height: 28px;
  }
  &-input {
    width: 90%;
    color: black;
  }
  &-input:focus {
    outline: none;
  }
}
</style>


