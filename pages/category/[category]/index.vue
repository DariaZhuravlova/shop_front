<template>
  <div>
    <!-- <h1>{{ route.params.category }}</h1>
    <h2>category page</h2> -->
    <organism-Loader v-if="appStore.isLoading" :isBlock="true" />

    <organism-ProductList v-else />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { productMenu } from '@/data/default/productMenu';
import { replaceSpace } from '../utils';
import { useProductStore } from '../stores/ProductStore';
import { useAppStore } from '../stores/AppStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const appStore = useAppStore();

function categoryToId(category, productMenu) {
  return productMenu.find((elem) => replaceSpace(elem.name.en) == category).id;
}

try {
  const categoryId = categoryToId(route.params.category, productMenu);
  productStore.getProducts({ category: categoryId });
} catch (e) {
  router.push('/');
}
</script>