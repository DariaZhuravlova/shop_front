<template>
  <organism-Header>
    <v-row class="d-flex justify-center" v-if="$vuetify.display.mdAndUp">
      <organism-Aside />
      <v-col cols="7" md="9" lg="9" xl="9">
        <slot />
      </v-col>
    </v-row>
  </organism-Header>
</template>
  
  <script setup>
import Header from '~/components/organism/Header.vue';
</script>