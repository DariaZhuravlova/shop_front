<template>
  <div>
    <v-file-input
      multiple
      v-model="productStore.currentFiles"
      variant="solo"
      label="Загрузить файлы"
      accept="image/*"
      show-size
      prepend-icon="mdi-camera"
      @change="handleFileUpload"
    ></v-file-input>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useProductStore } from '../../stores/ProductStore';

const productStore = useProductStore();

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://shop-back-mh7t.onrender.com'
    : 'http://localhost:3001';

const handleFileUpload = async () => {
  const formData = new FormData();

  for (let i = 0; i < productStore.currentFiles.length; i++) {
    formData.append('files', productStore.currentFiles[i]);
  }

  try {
    const response = await axios.post(`${apiUrl}/upload-multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    productStore.uploadedFiles = response.data.filenames;
  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
  }
};
</script>

