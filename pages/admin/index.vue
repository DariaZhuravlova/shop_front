<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="submit">
          <v-text-field
            variant="solo"
            v-model="productName.value.value"
            :error-messages="productName.errorMessage.value"
            label="Product Name"
          ></v-text-field>
          <v-select
            label="Category"
            :items="categories"
            :error-messages="productCategory.errorMessage.value"
            v-model="productCategory.value.value"
            variant="solo"
            @change="updateSubcategories"
          ></v-select>
          <v-select
            label="Subcategory"
            :items="subcategories"
            :error-messages="productSubcategory.errorMessage.value"
            v-model="productSubcategory.value.value"
            variant="solo"
            :disabled="!productCategory.value.value"
          ></v-select>
          <v-text-field
            variant="solo"
            v-model="productPrice.value.value"
            :error-messages="productPrice.errorMessage.value"
            label="Product Price"
            type="number"
            min="0"
          ></v-text-field>
          <organism-AddPhoto />

          <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
        </v-form>
      </v-col>
      <v-col
        cols="12"
        md="6"
        id="scroll-target"
        class="overflow-y-auto"
        style="max-height: 500px"
      >
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
              v-model="ch.value"
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
    <v-row>
      <v-col
        v-for="product in productStore.products"
        :key="product._id"
        cols="12"
        md="4"
      >
        <v-card class="product-card">
          <v-img
            :src="product.image[0] ? `${apiUrl}/` + product.image[0] : ''"
          ></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <p><b>Price:</b> ${{ product.price }}</p>
          <p><b>Category:</b> {{ product.category }}</p>
          <p><b>Subcategory:</b> {{ product.subcategory }}</p>
          <v-btn color="error" @click="deleteProduct(product._id)"
            >Delete</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useProductStore } from '../../stores/ProductStore';
import { useField, useForm } from 'vee-validate';
import type { ProductData } from '../../types/productData';
import { productMenu } from '../../data/default/productMenu';
import { characteristicsSchemaKeys } from '@/data/default/productCharacteristics';

import axios from 'axios';

// import { definePageMeta } from 'nuxt/app';

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://shop-back-mh7t.onrender.com'
    : 'http://localhost:3001';

definePageMeta({
  layout: 'empty',
});

interface Characteristic {
  key: string;
  value: string;
  active: boolean;
}

const characteristics = ref<Characteristic[]>([...characteristicsSchemaKeys]);
const productStore = useProductStore();
const fileInput = ref(null);
const extractCategories = (productMenu) => {
  return productMenu.map((item) => {
    return { title: item.name.ru, value: item.id };
  });
};

const extractSubcategories = (categoryID: number) => {
  const foundCategory = productMenu.find((item) => item.id === categoryID);
  if (foundCategory) {
    return foundCategory.items.map((item) => {
      return { title: item.name.ru, value: item.id };
    });
  }
  return [];
};

onMounted(() => {
  productStore.getProducts();
});

const uploadFile = () => {
  const file = fileInput.value.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  axios
    .post(`${apiUrl}/api/upload`, formData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/auth';
      } else {
        console.error(error);
      }
    });
};

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
    productCategory(value: number) {
      if (!value) return 'Выберите категорию';
      else return true;
    },
    productSubcategory(value: number) {
      if (!value) return 'Выберите подкатегорию';
      else return true;
    },
  },
});

const productName = useField('productName');
const productPrice = useField('productPrice');
const productCategory = useField('productCategory');
const productSubcategory = useField('productSubcategory');

const categories = extractCategories(productMenu);
const subcategories = ref([]);

const updateSubcategories = (category: number) => {
  subcategories.value = extractSubcategories(category);
  productSubcategory.value.value ? (productSubcategory.value.value = '') : null;
};

const submit = handleSubmit(async (values: any) => {
  const objProduct: ProductData = {
    name: values.productName,
    price: values.productPrice,
    category: values.productCategory,
    subcategory: values.productSubcategory,
    description: '',
    image: productStore.uploadedFiles.length
      ? productStore.uploadedFiles
      : productStore.selectedFiles,
    characteristics: currentCharacteristics.value,
  };

  await productStore.postProduct(objProduct);
  handleReset();
  clearCharacteristicsValue();
  productStore.uploadedFiles.length = 0;
  productStore.currentFiles.length = 0;
  productStore.selectedFiles.length = 0;
  productStore.previews.length = 0;
});
const deleteProduct = (productId: string) => {
  productStore.deleteProduct(productId);
};

watch(productCategory.value, (newCategory: any) => {
  updateSubcategories(newCategory);
});

const currentCharacteristics = computed(() => {
  let objCharacteristics: Record<string, string> = {};
  characteristics.value.forEach((elem: Characteristic) => {
    if (elem.value) {
      objCharacteristics[elem.key] = elem.value;
    }
  });
  return objCharacteristics;
});

function clearCharacteristicsValue() {
  characteristics.value.forEach((elem: Characteristic) => {
    elem.value = '';
    elem.active = false;
  });
}
</script>

<style scoped lang="scss">
.product__characteristic {
  max-width: 700px;
  margin-bottom: 4px;
  border-bottom: 1px solid;
  margin: 0 auto;
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
.product-card {
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  text-align: left;
  padding: 20px;

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

