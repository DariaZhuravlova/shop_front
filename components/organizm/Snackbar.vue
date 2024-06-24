<template>
  <div class="text-center">
    <v-snackbar 
    v-model="internalSnackbar" 
    :timeout="props.timeout" 
    :color="props.color"
    >
      {{ props.text }}

      <template v-slot:actions>
        <v-btn color="white" variant="flat" @click="emit('update:snackbar', false)">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: 'My timeout is set to 2000.',
  },
  timeout: {
    type: Number,
    default: 2000,
  },

  color: {
    type: String,
    default: 'success',
  },
});

const emit = defineEmits(['update:snackbar']);

const internalSnackbar = ref(props.isOpen);

watch(() => props.isOpen, (newValue) => {
  internalSnackbar.value = newValue;
});

watch(internalSnackbar, (newValue) => {
  emit('update:snackbar', newValue);
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
