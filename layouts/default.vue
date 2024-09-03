<template>
  <organism-Header>
    <v-row class="d-flex justify-center" v-if="$vuetify.display.mdAndUp">
      <v-col cols="5" md="3" lg="3" xl="3">
        <organism-Aside />
      </v-col>
      <v-col cols="7" md="9" lg="9" xl="9">
        <slot />
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center" v-else>
      <v-col cols="12">
        <slot />
      </v-col>
    </v-row>
   
  </organism-Header>
</template>

<script setup>
import Header from '~/components/organism/Header.vue';
</script>
