<template>
<v-row>
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
</template>

<script lang="ts" setup>
import { useProductStore } from '../../stores/ProductStore';
const productStore = useProductStore();

</script>