<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useProductStore } from '../../stores/ProductStore';
const productStore = useProductStore();

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});
const envConfig = useNuxtApp().$envConfig;

// Локальное состояние для отслеживания выбранности
const isSelected = ref(false);

function toggleSelected() {
  isSelected.value = !isSelected.value;
  const selectedImg = [...productStore.selectedFiles];
  if (isSelected.value) {
    selectedImg.push(props.src);
  } else {
    const index = selectedImg.indexOf(props.src);
    if (index > -1) {
      selectedImg.splice(index, 1);
    }
  }
  productStore.selectedFiles = selectedImg;
}
</script>
<template>
  <div :class="{ selected: isSelected }" @click="toggleSelected">
    <v-img
      aspect-ratio="1/1"
      cover
      :src="`${envConfig.apiUrl}/${src}`"
      alt="img"
      :title="src"
    >
    </v-img>
  </div>
</template>

<style  scoped>
.selected {
  border: 2px solid grey;
  border-radius: 10px;
  overflow: hidden;
}
</style>