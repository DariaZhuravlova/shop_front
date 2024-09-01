<script setup>
import { useProductStore } from '../../stores/ProductStore';
import { useAppStore } from '../../stores/AppStore';

const productStore = useProductStore();
const appStore = useAppStore();
</script>

<template>
  <div class="">
    <molecule-SelectableImg
      v-for="img in productStore.existingFiles"
      :key="img"
      :src="img"
    />
  </div>
</template>