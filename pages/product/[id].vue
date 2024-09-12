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
async function fetchProduct() {
  try {
    const id = route.params.id;
    await productStore.getProduct(id as string);
  } catch (e) {
    console.error(e);
  }
}

const allCharacteristicsProduct = computed(() => {
  let allCharacteristics = JSON.parse(
    JSON.stringify(characteristicsSchemaKeys)
  );

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
fetchProduct();

onMounted(() => {});

function updateProduct() {
  let arrayProdCharact = [];

  arrayProdCharact = allCharacteristicsProduct.value;
  let objCharacteristics: Record<string, string> = {};

  arrayProdCharact.forEach((elem: Characteristic) => {
    if (elem.value) {
      objCharacteristics[elem.key] = elem.value;
    }
  });
  productStore.currentProduct.characteristics = objCharacteristics;

  productStore.editProduct(productStore.currentProduct);
  appStore.isEditMode = false;
}

function cancelChanges() {
  appStore.isEditMode = false;
  fetchProduct();
}
</script>

<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <div class="product__title text-center mb-4">
          <input
            type="text"
            :disabled="!appStore.isEditMode"
            v-model="productStore.currentProduct.name"
            class="product__title-input"
          />
        </div>
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
        <atom-DiscountedPrice />
      </v-col>
      <v-col cols="12" md="6">
        <h2 style="text-align: center">Характеристики</h2>
        <div
          v-if="appStore.isEditMode"
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
              <span class="product__characteristic-title">
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
    <v-row justify="space-around">
      <v-col
        cols="12"
        md="6"
        v-if="appStore.role === 'admin' && !appStore.isEditMode"
        class="d-flex justify-center"
      >
        <v-btn @click="appStore.isEditMode = true">Редактировать</v-btn>
      </v-col>
      <v-col
        cols="12"
        md="6"
        v-if="appStore.role === 'admin' && appStore.isEditMode"
        class="d-flex flex-column flex-sm-row justify-space-around"
      >
        <v-btn class="mb-4 mb-sm-0" @click="updateProduct">Сохранить</v-btn>
        <v-btn @click="cancelChanges">Отменить изменения</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<style lang="scss" scoped>
.product__title {
  &-input {
    font-size: 20px;
    font-weight: 700;
    color: black;
  }
  &-input:focus {
    outline: none;
  }
}
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


