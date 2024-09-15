<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          class="d-xs-block d-sm-none"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <Nuxt-Link to="/" class="icon-link">
          <v-toolbar-title class="logo">SHOP</v-toolbar-title>
        </Nuxt-Link>
        <v-spacer></v-spacer>

        <v-btn icon="mdi-magnify" variant="text" class="d-none d-md-flex"></v-btn>
        <v-btn icon="mdi-heart-outline" variant="text" class="d-none d-md-flex"></v-btn>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        <span v-if="appStore.profile">{{ appStore.profile.username }}</span>
        <Nuxt-Link to="/auth" class="icon-link">
          <v-btn icon="mdi-account-outline" variant="text"></v-btn>
        </Nuxt-Link>
        <v-btn icon="mdi-cart-outline" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
        width="330"
      >
        <molecule-ProductCatalog />
      </v-navigation-drawer>

      <v-main>
        <v-card-text>
          <slot />
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAppStore } from '../stores/AppStore';

const appStore = useAppStore();
const drawer = ref(false);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>

<style scoped lang="scss">
.icon-link {
  color: white;
  text-decoration: none;

  .logo {
    font-weight: 800;
  }

  @media (min-width: 540px) {
    .logo {
      padding: 0 32px;
    }
  }
}

.v-main {
  padding-left: 0;

  @media (min-width: 600px) {
    padding-left: 56px;
  }
}
</style>
