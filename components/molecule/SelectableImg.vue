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
// Определяем событие 'update:selected'
const emit = defineEmits(['update:selected']);

// Локальное состояние для отслеживания выбранности
const isSelected = ref(false);

function toggleSelected() {
  isSelected.value = !isSelected.value;
  emit('update:selected', isSelected.value);
  if (isSelected.value) {
    productStore.selectedFiles.push(props.src);
  } else {
    const index = productStore.selectedFiles.indexOf(props.src);
    if (index > -1) {
      productStore.selectedFiles.splice(index, 1);
    }
  }
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