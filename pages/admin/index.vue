<template>
  <v-container>
    <v-form @submit.prevent="submit">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            variant="solo"
            v-model="productName.value.value"
            :error-messages="productName.errorMessage.value"
            label="Product Name"
          ></v-text-field>
          <v-select
            label="Select"
            :items="extractCategories(productMenu)"
            :error-messages="productCategory.errorMessage.value"
            v-model="productCategory.value.value"
            variant="solo"
          ></v-select>
          <v-text-field
            variant="solo"
            v-model="productPrice.value.value"
            :error-messages="productPrice.errorMessage.value"
            label="Product Price"
            type="number"
            min="0"
          ></v-text-field>
          <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
        </v-col>
      </v-row>
    </v-form>

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
          <p>Category: {{ product.category }}</p>
          <v-btn color="error" @click="deleteProduct(product._id)"
            >Delete</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../../stores/ProductStore';
import { useField, useForm } from 'vee-validate';
import type { ProductData } from '@/types/productData';
import { productMenu } from '@/data/default/productMenu';

const productStore = useProductStore();

const extractCategories = (productMenu) => {
  return productMenu.map((item) => {
    return { title: item.name.ru, value: item.name.en };
  })
}

onMounted(() => {
  productStore.getProducts();
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    productName(value: string) {
      if (!value?.length) return 'Введите название';
      else if (value?.length >= 2) return true;
      else return 'Имя содержит минимум 2 символа';
    },
    productPrice(value: number) {
      if (value > 0) return true;

      return 'Введите цену';
    },
    productCategory(value: string) {
      if (!value?.length) return 'Выберите категорию';
      else return true;
    }
  },
});

const productName = useField('productName');
const productPrice = useField('productPrice');
const productCategory = useField('productCategory');

const submit = handleSubmit(async (values: any) => {
  const objProduct: ProductData = {
    name: values.productName,
    price: values.productPrice,
    category: values.productCategory
  };
  await productStore.postProduct(objProduct);
  handleReset();
});
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
