<template>
  <organism-Header>  
        <slot />   
  <organism-Chat />
  </organism-Header>
  
</template>

<script setup>
import Header from '~/components/organism/Header.vue';
</script>