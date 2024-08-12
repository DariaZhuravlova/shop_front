<template>
  <v-list>
    <NuxtLink to="/" class="icon-link-aside">
      <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
    </NuxtLink>

    <v-list-group
      v-for="(category, index) in items"
      @click.stop="goToCategory(category, index)"
      :key="index"
      :prepend-icon="category.icon"
      :title="(currentCategoryIndex == index) + category.name.ru"
      :value="currentCategoryIndex == index"
    >
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props"></v-list-item>
      </template>

      <NuxtLink
        v-for="(item, subIndex) in category.items"
        :key="subIndex"
        :to="`/category/${replaceSpace(category.name.en)}/${replaceSpace(item.name.en)}`"
        @click.stop=""
        class="icon-link-aside"
      >
        <v-list-item
          :prepend-icon="item.icon"
          :title="item.name.ru"
        ></v-list-item>
      </NuxtLink>
    </v-list-group>
  </v-list>
</template>

<script setup>
import { ref } from 'vue';
import { productMenu } from '../../data/default/productMenu';
import { replaceSpace } from '../utils';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref(productMenu);

const currentCategoryIndex = ref(-1);

const goToCategory = (category, index) => {
  if (index === currentCategoryIndex.value) {
    // Если кликнули по уже открытому элементу, то просто закрыть его
    currentCategoryIndex.value = -1;
  } else {
    // Открыть новый элемент и закрыть все остальные
    currentCategoryIndex.value = index;
  }
  router.push(`/category/${replaceSpace(category.name.en)}`);
};
</script>

<style scoped>
.icon-link-aside {
  color: inherit;
  text-decoration: none;
}
</style>
