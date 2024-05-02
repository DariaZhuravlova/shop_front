<template>
  <div>
    <h1>{{testStore.upper}}</h1>
    <v-btn @click="testStore.setMessage('New message!')">
      Set new message
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useTestStore } from '~/store/TestStore';

const testStore = useTestStore()
const x: number = 0
</script>

<style lang="scss" scoped>
div {
  margin: 50px auto;
  text-align: center;
}
</style>
