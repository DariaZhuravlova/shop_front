<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
const appStore = useAppStore();
const cartStore = useCartStore();
</script>

<template>
  <div class="profile">
    <h1>Профиль</h1>
    <organism-UserProfile v-if="appStore.profile" />
  </div>
</template>