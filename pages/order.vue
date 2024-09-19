<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();
const appStore = useAppStore();
const productStore = useProductStore();
</script>

<template>
  <h1>Order</h1>
</template>  

<style lang="scss" scoped>
</style>