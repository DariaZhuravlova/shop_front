<template>
  <div>
    <h1>{{ route.params.category }}</h1>
    <h2>subcategory page</h2>
    <h2>{{ route.params.subcategory }}</h2>
    <organism-ProductList />
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

interface ProductMenu {
  id: number;
  name: {
    en: string;
    ru: string;
  };
  items: ProductMenuItem[];
}

interface ProductMenuItem {
  id: number;
  name: {
    en: string;
    ru: string;
  };
}

interface SubCategoryToIdArgs {
  category: string;
  subcategory: string;
  productMenu: ProductMenu[];
}

interface SubCategoryToIdResult {
  category: number | null;
  subcategory: number | null;
}

function findCategoryId(productMenu: ProductMenu[], category: string): number | null {
  return productMenu.find(
    (elem) => replaceSpace(elem.name.en) === category
  )?.id || null;
}

function subCategoryToId({
  category,
  subcategory,
  productMenu
}: SubCategoryToIdArgs): SubCategoryToIdResult {
  const categoryId = findCategoryId(productMenu, category);

  const subcategoryId = productMenu
    .filter(elem => elem.id === categoryId)
    .flatMap(elem => elem.items)
    .find(item => replaceSpace(item.name.en) === subcategory)?.id || null;

  return { category: categoryId, subcategory: subcategoryId };
}

async function fetchProducts() {
  try {
    // Приведение типов
    const category =  route.params.category;
    const subcategory = route.params.subcategory;

    // Проверка на наличие значений
    if (typeof category !== 'string' || typeof subcategory !== 'string') {
      throw new Error('Invalid route parameters');
    }

    const objId = subCategoryToId({
      category,
      subcategory,
      productMenu: productMenu
    });

    await productStore.getProducts(objId); // Убедитесь, что getProducts возвращает Promise
  } catch (e) {
    console.error(e); // Можно вывести ошибку в консоль для отладки
    router.push('/');
  }
}

fetchProducts();
</script>
