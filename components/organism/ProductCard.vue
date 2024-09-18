<template>
  <Nuxt-Link :to="'/product/' + product._id">
    <v-card class="product-card pa-3">
      <v-img
        :src="
          product.image[mainImagePointer]
            ? 'https://shop-back-mh7t.onrender.com/' +
              product.image[mainImagePointer]
            : ''
        "
      ></v-img>
      <v-card-title
        ><b>{{ product.name }}</b></v-card-title
      >
      <div class="card-content">
        <p><b>Price:</b> {{ product.price }} грн</p>
        <p><b>Category:</b> {{ product.category }}</p>
        <p><b>Subcategory:</b> {{ product.subcategory }}</p>
      </div>
      <v-btn
        v-if="product.quantitiesInStore && !isProductInCart"
        color="primary"
        @click.prevent="cartStore.addProductToCart(product)"
        >Купить</v-btn
      >
      <v-btn
        v-if="!product.quantitiesInStore"
        disabled
        color="primary"
        @click.prevent=""
        >Товар закончился</v-btn
      >
      <v-btn
        v-if="product.quantitiesInStore && isProductInCart"
        color="primary"
        @click.prevent="appStore.drawerCart = true"
        >Товар в корзине</v-btn
      >
      <v-icon
        class="favorite-icon"
        :color="isFavorite ? 'primary' : 'grey'"
        @click.prevent="toggleFavorite"
      >
        {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
      </v-icon>
    </v-card>
  </Nuxt-Link>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import type { ProductData } from '../../types/productData';
import { useCartStore } from '@/stores/CartStore';
import { useAppStore } from '../stores/AppStore';

const appStore = useAppStore();
const cartStore = useCartStore();

const props = defineProps<{
  product: ProductData;
}>();

const mainImagePointer = ref(0);

if (props.product.mainImagePointer !== undefined) {
  mainImagePointer.value = props.product.mainImagePointer;
}

// Логика для добавления в избранное
const isFavorite = ref(false);
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const isProductInCart = computed(() => {
  return cartStore.currentCart.some(
    (elem: {}) => elem.product._id === props.product._id
  );
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;

  .product-card {
    width: 100%;
    max-width: 400px;
    height: 420px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .v-img {
      height: 200px;
      width: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease;
    }

    .card-content {
      height: 120px;
      flex-grow: 1;

      p {
        margin: 5px 0;
      }
    }

    .v-card-title {
      font-size: 16px;
      text-align: center;
    }

    .favorite-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      font-size: 24px;
      transition: color 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
