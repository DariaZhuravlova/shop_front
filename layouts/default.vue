<template>
  <organism-Header>
    <v-row cols="12" class="d-flex justify-center">
      <organism-Aside class="d-none d-sm-block" />

      <slot />      

    </v-row>
  <organism-Chat />
   
  </organism-Header>

</template>

<script setup>
import Header from '~/components/organism/Header.vue';
</script>
