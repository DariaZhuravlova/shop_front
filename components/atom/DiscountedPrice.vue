<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps<{
  price: number;
}>();

const oldPrice = computed(() => {
  return Math.floor(props.price + (props.price * Math.random() * 0.3 + 0.1));
});
</script>

<template>
  <v-row class="product__price" justify="end">
    <v-col cols="3">
      <v-row class="product__price-old">{{ oldPrice }} $</v-row>
      <v-row class="product__price-current">{{ price }} $</v-row>
    </v-col>
  </v-row>
</template>  

<style lang="scss" scoped>
.product__price {
  margin-top: 15px;
  .product__price-old {
    font-size: 12px;
    color: #797878;
    text-decoration: line-through;
  }

  .product__price-current {
    font-size: 16px;
    color: #f84147;
  }
}
</style>