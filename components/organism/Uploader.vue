<template>
  <div>
    <input type="file" multiple @change="handleFileUpload" />
    <button @click="submitFiles">Загрузить файлы</button>

    <div v-if="uploadedFiles.length">
      <h3>Загруженные файлы:</h3>
      <ul>
        <li v-for="file in uploadedFiles" :key="file">{{ file }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useProductStore } from '../../stores/ProductStore';

const productStore = useProductStore();

const files = ref([]);
const uploadedFiles = ref([]);

const handleFileUpload = (event) => {
  files.value = event.target.files;
};

const submitFiles = async () => {
  if (files.value.length === 0) {
    alert('Выберите файлы для загрузки');
    return;
  }

  const formData = new FormData();

  for (let i = 0; i < files.value.length; i++) {
    formData.append('files', files.value[i]);
  }

  try {
    const response = await axios.post('http://localhost:3001/upload-multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    uploadedFiles.value = response.data.filenames;
    productStore.uploadedFiles = response.data.filenames;
  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
  }
};
</script>
