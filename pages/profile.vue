<script lang="ts" setup>
import { useAppStore } from '../stores/AppStore';
const appStore = useAppStore();
</script>

<template>
  <div class="profile pa-2">
    <h1 class="d-flex justify-center ma-3">Профиль</h1>
    <organism-UserProfile v-if="appStore.profile" />
    <template v-if="appStore.profile">
      <organism-UsersList v-if="appStore.profile.role === 'admin'" />
      <organism-OrderAdmin v-if="appStore.profile.role === 'admin'" />
      <organism-OrderUser v-if="appStore.profile.role === 'customer'" />
      <organism-AdminMessages v-if="appStore.profile.role === 'admin'" />
    </template>
  </div>
</template>
