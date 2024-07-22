<template>
  <div>
    <h1>{{ route.params.category }}</h1>
    <h2>subcategory page</h2>
    <h2>{{ route.params.subcategory }}</h2>
  </div>

</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();


</script>