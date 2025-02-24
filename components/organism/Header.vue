<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          class="d-xs-block d-sm-none"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <NuxtLink to="/" class="icon-link">
          <v-toolbar-title class="logo">SHOP</v-toolbar-title>
        </NuxtLink>

        <v-spacer></v-spacer>

        <v-btn
          icon="mdi-magnify"
          variant="text"
          class="d-none d-md-flex"
        ></v-btn>
        <v-btn
          icon="mdi-heart-outline"
          variant="text"
          class="d-none d-md-flex"
        ></v-btn>
        <span v-if="appStore.profile">{{ appStore.profile.name }}</span>
        <template v-if="!appStore.profile">
          <NuxtLink to="/auth" class="icon-link">
            <v-btn icon="mdi-account-outline" variant="text"></v-btn>
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/profile" class="icon-link">
            <v-btn icon="mdi-account-outline" variant="text"></v-btn>
          </NuxtLink>
          <v-btn icon="mdi-logout" variant="text" @click="logout"></v-btn>
        </template>
        <div style="position: relative">
          <v-btn
            @click.stop="appStore.drawerCart = !appStore.drawerCart"
            icon="mdi-cart-outline"
            variant="text"
          >
          </v-btn>
          <div v-if="cartStore.currentCart.length > 0" class="amount_product">
            {{ cartStore.currentCart.length }}
          </div>
        </div>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" width="310">
        <molecule-ProductCatalog @closeMenu="closeMenu" />
      </v-navigation-drawer>

      <v-navigation-drawer
        v-model="appStore.drawerCart"
        location="right"
        temporary
        width="330"
      >
        <organism-cart />
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
import { ref } from 'vue';
import { useAppStore } from '../stores/AppStore';
import { useCartStore } from '@/stores/CartStore';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { sendUserInfo } from '@/utils/socket-events';

const { $socket } = useNuxtApp();

const cartStore = useCartStore();
const appStore = useAppStore();
const drawer = ref(false);
const router = useRouter();

function closeMenu() {
  drawer.value = false;
}
const logout = async () => {
  await appStore.logout();
  await router.push('/');
  location.reload();
};

async function fetchProfileInfo() {
  if (localStorage.getItem('token')) {
    const result = await appStore.getProfileInfo();
    sendUserInfo($socket, result);
  }
}

onMounted(() => {
  fetchProfileInfo();
});
</script>

<style scoped lang="scss">
.amount_product {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  color: white;
  position: absolute;
  top: 1px;
  right: 6px;
  font-size: 12px;
}
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
