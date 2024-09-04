<script lang="ts" setup>
import { ref } from 'vue';
import { useProductStore } from '../../stores/ProductStore';
const productStore = useProductStore();
const addPhoto = ref<string>('choose');
function clearStore() {
  productStore.uploadedFiles.length = 0;
  productStore.currentFiles.length = 0;
  productStore.selectedFiles.length = 0;
  productStore.previews.length = 0;
}
</script>
<template>
  <div>
    <organism-Uploader v-if="addPhoto == 'download'" />
    <organism-SelectPhoto v-else />
    <div>
      <v-container fluid>
        <v-radio-group v-model="addPhoto" inline>
          <v-row justify="space-around">
            <v-radio
              label="Загрузить фото"
              value="download"
              @click="clearStore"
            ></v-radio>
            <v-radio
              label="Выбрать фото"
              value="choose"
              @click="clearStore"
            ></v-radio>
          </v-row>
        </v-radio-group>
      </v-container>
    </div>
    <molecule-Preview />
  </div>
</template>