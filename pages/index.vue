<template>
  <div>
    <organism-Loader v-if="appStore.isLoading" :isFixed="true" />
    <!-- <v-row class="d-flex justify-center">
      <v-col v-if="$vuetify.display.mdAndUp" cols="5" md="3" lg="3" xl="3">
        <organism-Aside />
      </v-col>
      <v-col cols="7" md="9" lg="9" xl="9"> -->
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
      <!-- </v-col>
    </v-row> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import { useAppStore } from '../stores/AppStore';
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay();

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
  text-align: left;
  padding: 20px;
  width: 100%;

  .v-card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .v-btn {
    margin-top: 20px;
  }

  p {
    margin-bottom: 10px;
  }
}
</style>
