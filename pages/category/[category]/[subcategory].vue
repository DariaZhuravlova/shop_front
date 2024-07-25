<template>
  <div>
    <h1>{{ route.params.category }}</h1>
    <h2>subcategory page</h2>
    <h2>{{ route.params.subcategory }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { productMenu } from '@/data/default/productMenu';
import { replaceSpace } from '../utils';
import { useProductStore } from '../stores/ProductStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

function subCategoryToId(category, subcategory, productMenu) {
  const categoryId = productMenu.find(
    (elem) => replaceSpace(elem.name.en) == category
  ).id;
  let subcategoryId = null;
  productMenu.forEach((elem) => {
    if (elem.id == categoryId) {
      elem.items.forEach((item) => {
        if (replaceSpace(item.name.en) == subcategory) {
          subcategoryId = item.id;
        }
      });
    }
  });
  return { categoryId, subcategoryId };
}

try {
  const objId = subCategoryToId(
    route.params.category,
    route.params.subcategory,
    productMenu
  );
  productStore.getProducts(objId);
} catch (e) {
  router.push('/');
}
</script>