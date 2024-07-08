<template>
  <div>
    <h1>{{ route.params.category }}</h1>
  </div>

</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();


</script>