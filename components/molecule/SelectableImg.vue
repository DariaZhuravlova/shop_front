<script setup>
import { defineProps, defineEmits, ref } from 'vue';

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
}
</script>
<template>
  <div :class="{ selected: isSelected }" @click="toggleSelected">
    <p>{{ envConfig.apiUrl }}</p>
    <p>{{ src }}</p>

    <v-img
      aspect-ratio="1/1"
      cover
      :src="`${envConfig.apiUrl}/${src}`"
      alt="img"
    >
    </v-img>
  </div>
</template>

<style  scoped>
.selected {
  border: 2px solid grey;
  border-radius: 10px;
}
</style>