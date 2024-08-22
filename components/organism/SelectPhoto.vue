<template>
  <div>
    <!-- <v-file-input
      multiple
      v-model="selectedFiles"
      variant="solo"
      label="Выберите файлы"
      accept="image/*"
      show-size
      prepend-icon="mdi-camera"
      @cl="handleFileUpload"
    ></v-file-input> -->
    <button @click="getPhoto">getPhoto</button>

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
  </div>
</template>
  
  <script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useProductStore } from '../../stores/ProductStore';

const productStore = useProductStore();

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://shop-back-mh7t.onrender.com'
    : 'http://localhost:3001';

const selectedFiles = ref([]);
const getPhoto = () => {
  productStore.getUploadedFiles();
  console.log(productStore.existingFiles);
};
const handleFileUpload = async () => {
  productStore.previews = []; // Очистить предыдущие превью

  for (let i = 0; i < selectedFiles.value.length; i++) {
    const file = selectedFiles.value[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      productStore.previews.push(e.target.result); // Добавить новое превью
    };

    reader.readAsDataURL(file);
  }

  const formData = new FormData();

  for (let i = 0; i < selectedFiles.value.length; i++) {
    formData.append('files', selectedFiles.value[i]);
  }

  try {
    const response = await axios.post(`${apiUrl}/upload-multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    productStore.uploadedFiles = response.data.filenames;
    selectedFiles.value = []; // Очищаем выбранные файлы
  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
  }
};

const removePreview = (index) => {
  productStore.previews.splice(index, 1);
  selectedFiles.value.splice(index, 1);
};
</script>
  
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
  