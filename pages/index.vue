<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-text-field
          variant="solo"
          v-model="productName"
          label="Product Name"
        ></v-text-field>
        <v-text-field
          variant="solo"
          v-model="productPrice"
          label="Product Price"
          type="number"
          min="0"
        ></v-text-field>
        <v-btn @click="submitForm" :disabled="!productName.trim()" color="primary">Add Product</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="product in productStore.products" :key="product._id" cols="12" md="4">
        <v-card class="product-card">
          <v-card-title>{{ product.name }}</v-card-title>
          <p>Price: ${{ product.price }}</p>
          <v-btn color="error" @click="deleteProduct(product._id)">Delete</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/ProductStore";

const productStore = useProductStore();

onMounted(() => {
  productStore.getProducts();
});

const productName = ref("");
const productPrice = ref(0);

const submitForm = () => {
  productStore.postProduct(productName.value, productPrice.value);
  productName.value = "";
  productPrice.value = 0;
};

const deleteProduct = (productId: string) => {
  productStore.deleteProduct(productId);
};
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


