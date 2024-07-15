<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <Nuxt-Link to="/" class="icon-link">
          <v-toolbar-title>SHOP</v-toolbar-title>
        </Nuxt-Link>
        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>
          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        <span v-if="appStore.profile">{{ appStore.profile.username }}</span>
        <Nuxt-Link to="/auth" class="icon-link">
          <v-btn icon="mdi-account-outline" variant="text"></v-btn>
        </Nuxt-Link>
        <v-btn icon="mdi-cart-outline" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" temporary>
        <v-list>
          <NuxtLink to="/" class="icon-link-aside">
            <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
          </NuxtLink>

          <v-list-group
            v-for="(category, index) in items"
            :key="index"
            :prepend-icon="category.icon"
            :title="category.name.ru"
          >
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props"></v-list-item>
            </template>

            <NuxtLink
              v-for="(item, subIndex) in category.items"
              :key="subIndex"
              :to="`/${replaceSpace(category.name.en)}/${replaceSpace(item.name.en)}`" 
              class="icon-link-aside"
            >
              <v-list-item
                :prepend-icon="item.icon"
                :title="item.name.ru"
              ></v-list-item>
            </NuxtLink>
          </v-list-group>
        </v-list>
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
import { productMenu } from '../../data/default/productMenu';
import { replaceSpace } from '../utils';

const appStore = useAppStore();

const drawer = ref(false);
const group = ref(null);
const items = ref(productMenu);

watch(group, () => {
  drawer.value = false;
});


</script>

<style scoped>
.icon-link {
  color: white;
  text-decoration: none;
}

.icon-link-aside {
  color: inherit;
  text-decoration: none;
}
</style>
