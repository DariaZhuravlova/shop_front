<template>
  <v-list v-model:opened="open">
    <NuxtLink to="/" class="icon-link-aside">
      <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
    </NuxtLink>

    <v-list-group
      v-for="(category, index) in items"
      @click="goToCategory(category, index)"
      :key="index"
      :prepend-icon="category.icon"
      :title="category.name.ru"
      :value="category.name.ru"
    >
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props"></v-list-item>
      </template>

      <NuxtLink
        v-for="(item, subIndex) in category.items"
        :key="subIndex"
        :to="`/category/${replaceSpace(category.name.en)}/${replaceSpace(
          item.name.en
        )}`"
        @click.stop=""
        class="icon-link-aside"
      >
        <v-list-item
          @click.stop="closeMenu"
          class="chosen"
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
import { defineProps, defineEmits } from 'vue';

const router = useRouter();
const emits = defineEmits(['closeMenu']);
let open = ref([]);
const items = ref(productMenu);
const goToCategory = (category, index) => {
  if (open.value.length != 0) {
    open.value[0] = category.name.ru;
  }
  router.push(`/category/${replaceSpace(category.name.en)}`);
};

function closeMenu() {
  emits('closeMenu');
}
</script>

<style scoped>
.icon-link-aside {
  color: inherit;
  text-decoration: none;
}
.chosen:hover {
  background: lightgray;
}
.chosen:active {
  background: gray;
}
</style>
