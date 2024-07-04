<template>
  <div>
    <organism-Loader v-if="appStore.isLoading" />
    <v-container>
      <v-row>
        <v-col
          v-for="product in productStore.products"
          :key="product._id"
          cols="12"
          md="4"
        >
          <v-card class="product-card">
            <v-card-title>{{ product.name }}</v-card-title>
            <p>Price: ${{ product.price }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import type { dtoResponse } from '../types/dtoResponse';
import { useAppStore } from '../stores/AppStore';

const appStore = useAppStore();

const productStore = useProductStore();

onMounted(() => {
  productStore.getProducts();
});
</script>

<style scoped lang="scss">
.product-card {
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;

  .v-card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .v-btn {
    margin-top: 20px;
  }
}
</style>


