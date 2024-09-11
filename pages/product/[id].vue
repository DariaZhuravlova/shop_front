<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { productMenu } from '@/data/default/productMenu';
import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';
import { characteristicsSchemaKeys } from '@/data/default/productCharacteristics';
import { ref, computed, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const appStore = useAppStore();

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

// const characteristics = ref([...allCharacteristicsProduct]);
async function fetchProduct() {
  try {
    const id = route.params.id;
    await productStore.getProduct(id as string);
  } catch (e) {
    console.error(e);
  }
}

fetchProduct();

const allCharacteristicsProduct = computed(() => {
  const allCharacteristics = [...characteristicsSchemaKeys];

  for (let key in productStore.currentProduct.characteristics) {
    allCharacteristics.forEach((elem) => {
      if (elem.key == key) {
        elem.value = productStore.currentProduct.characteristics[key];
      }
    });
  }
  return allCharacteristics;
});

const currentProductCharacteristics = computed(() => {
  let currentCharacteristics = [];
  allCharacteristicsProduct.value.forEach((elem) => {
    if (elem.value) {
      currentCharacteristics.push(elem);
    }
  });
  return currentCharacteristics;
});

onMounted(() => {});
</script>

<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <h1 class="product__title text-center mb-4">
          {{ productStore.currentProduct.name }}
        </h1>
        <v-carousel
          class="product__carousel"
          height="400"
          show-arrows="hover"
          cycle
          hide-delimiter-background
          v-if="productStore.currentProduct.image"
        >
          <v-carousel-item
            class="product__carousel-item"
            v-for="img in productStore.currentProduct.image"
            :key="img"
            :src="apiUrl + '/' + img"
          >
          </v-carousel-item>
        </v-carousel>
        <atom-DiscountedPrice :price="productStore.currentProduct.price" />
      </v-col>
      <v-col cols="12" md="6">
        <h2 style="text-align: center">Характеристики</h2>
        <div
          v-if="appStore.role === 'admin'"
          id="scroll-target"
          class="overflow-y-auto"
          style="max-height: 500px"
        >
          <v-row
            class="product__characteristic d-flex align-center"
            v-for="ch in allCharacteristicsProduct"
            :key="ch.key"
          >
            <v-col cols="12" sm="6">
              <span
                class="product__characteristic-title"
                @click="ch.active = !ch.active"
              >
                {{ ch.title }}
              </span>
            </v-col>
            <v-col
              :class="{ 'product__characteristic-input--active': ch.active }"
              cols="12"
              sm="6"
            >
              <input
                class="product__characteristic-input"
                type="text"
                :disabled="!ch.active"
                placeholder="Enter value"
                v-model="ch.value"
              />
              <v-icon
                v-if="ch.active"
                @click="ch.active = false"
                class="product__characteristic-close"
                icon="mdi-close"
              >
              </v-icon>
            </v-col>
          </v-row>
        </div>
        <div
          v-else
          id="scroll-target"
          class="overflow-y-auto"
          style="max-height: 500px"
        >
          <v-row
            class="product__characteristic d-flex align-center"
            v-for="ch in currentProductCharacteristics"
            :key="ch"
          >
            <v-col cols="12" sm="6">
              <span class="product__characteristic-title">
                {{ ch.title }}
              </span>
            </v-col>
            <v-col
              :class="{ 'product__characteristic-input--active': ch.active }"
              cols="12"
              sm="6"
            >
              <span>{{ ch.value }}</span>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
  
 <!-- <div v-for="ch in characteristics" :key="ch.key">
          <div cols="12" v-if="ch.active">
            <v-label>{{ ch.title }}</v-label>
            <input type="text" placeholder="Enter value" />
            <v-icon
              @click="ch.active = false"
              class="black--text"
              icon="mdi-close"
            >
            </v-icon>
          </div>

          <div v-else>
            <div @click="ch.active = true">{{ ch.title }}</div>
          </div>
        </div> -->
<style lang="scss" scoped>
.product__characteristic {
  max-width: 700px;
  margin-bottom: 4px;
  border-bottom: 1px solid;
  margin: 0 auto;
  &-title {
    cursor: pointer;
  }
  &-input--active {
    border-bottom: 1px solid;
    padding: 0;
    height: 28px;
  }
  &-input {
    width: 90%;
    color: black;
  }
  &-input:focus {
    outline: none;
  }
}
</style>


