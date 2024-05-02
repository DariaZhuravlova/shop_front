<template>
  <div>
    <h1>Hello</h1>
    <v-btn>
      Button
    </v-btn>
    <v-list lines="one">
      <v-list-item v-for="n in 3" :key="n" :title="'Item ' + n"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"></v-list-item>
    </v-list>
  </div>

</template>

<script lang="ts" setup>
const x: number = 0
</script>

<style lang="scss" scoped></style>
