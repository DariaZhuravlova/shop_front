<template>
  <div>
    <v-btn text="Выбрать фото" type="button" block @click="getPhoto"></v-btn>
  </div>
</template>
    
    <script setup>
import { useProductStore } from '../../stores/ProductStore';
import { useAppStore } from '../../stores/AppStore';

const productStore = useProductStore();
const appStore = useAppStore();

const getPhoto = () => {
  productStore.getUploadedFiles();
  appStore.modalData.content = [
    { type: 'component', dir: 'organism', component: 'SelectableImgBlock' },
  ];
  appStore.isShowModal = true;
};
</script>
    
  