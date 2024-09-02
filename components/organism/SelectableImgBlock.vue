<script setup>
import { useProductStore } from '../../stores/ProductStore';
import { useAppStore } from '../../stores/AppStore';

const productStore = useProductStore();
const appStore = useAppStore();

const select = () => {
  
  appStore.isShowModal = false;
}
</script>

<template>
  <div class="block-imgs">
    <div class="panel">
      <v-btn @click="select">select</v-btn>
    </div>
    <molecule-SelectableImg
      v-for="img in productStore.existingFiles"
      :key="img"
      :src="img"
      class="img"
    />
  </div>
</template>

<style scoped lang="scss">
  .block-imgs {
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;


    .img {
      width: 100px;
      // height: 100px;
      margin: 5px;
      cursor: pointer;
    }

  }

</style>