<script setup>
import { useProductStore } from '../../stores/ProductStore';
import { ref, watch } from 'vue';
const productStore = useProductStore();
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://shop-back-mh7t.onrender.com'
    : 'http://localhost:3001';
let imgLocation = '';
function removePreview(index) {
  productStore.previews.splice(index, 1);
  if (imgLocation == 'upload') {
    productStore.currentFiles.splice(index, 1);
    productStore.uploadedFiles.splice(index, 1);
  } else if (imgLocation == 'select') {
    productStore.selectedFiles.splice(index, 1);
  }
}

watch(
  () => productStore.currentFiles,
  (newValue, oldValue) => {
    if (newValue) {
      imgLocation = 'upload';
      productStore.previews.length = 0;
      for (let i = 0; i < productStore.currentFiles.length; i++) {
        const file = productStore.currentFiles[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          productStore.previews.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
  }
);

watch(
  () => productStore.selectedFiles,
  (newValue, oldValue) => {
    if (newValue) {
      imgLocation = 'select';

      productStore.previews.length = 0;
      productStore.previews = productStore.selectedFiles.map(
        (elem) => apiUrl + '/' + elem
      );
    }
  }
);
</script>
<template>
  <v-row v-if="productStore.previews.length">
    <v-col
      v-for="(preview, index) in productStore.previews"
      :key="index"
      cols="4"
      class="d-flex justify-center position-relative"
    >
      <v-img
        :src="preview"
        :alt="`Превью ${index + 1}`"
        max-width="100%"
        max-height="150px"
        contain
      ></v-img>
      <v-btn icon small class="close-btn" @click="removePreview(index)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: black;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
  