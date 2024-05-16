<template>
  <div>
    <h1>{{ testStore.upper }}</h1>
    <v-btn @click="testStore.setMessage('New message!')">
      Set new message
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useTestStore } from "~/store/TestStore";
import { useProductStore } from "~/store/Product";

const testStore = useTestStore();
const productStore = useProductStore();

productStore.getProducts()
const x: number = 0;
</script>

<style lang="scss" scoped>
div {
  margin: 50px auto;
  text-align: center;
}
</style>
