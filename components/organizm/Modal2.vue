<template>
  <v-dialog
    transition="dialog-top-transition"
    v-model="useAppStore().isShowModal"
    width="auto"
  >
    <div class="modal-wrapper">
      <v-icon
        class="cls-btn"
        icon="mdi-close"
        @click="appStore.isShowModal = false"
      ></v-icon>

      <!-- <div
        v-if="appStore.modalContentTop"
        v-html="appStore.modalContentTop"
      ></div>
      <div
        v-if="appStore.modalContentBottom"
        v-html="appStore.modalContentBottom"
        class="bottom-content"
      ></div> -->
    </div>
  </v-dialog>
</template>

<script setup >
import { useAppStore } from "@/stores/AppStore";
const appStore = useAppStore();
</script>


<style scoped>
.modal-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 250px;
  min-height: 150px;
  padding: 10px;
  background-color: black;
  color: var(--white-color);
  font-family: var(--font-family-regular);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid var(--white-color);
}

.modal-wrapper h2 {
  margin: 0 auto;
}

.bottom-content {
  margin-top: 20px;
  text-align: center;
}

.cls-btn {
  position: absolute;
  top: 0;
  right: 0;
}
.cls-btn:hover {
  scale: 1.2;
}
</style>