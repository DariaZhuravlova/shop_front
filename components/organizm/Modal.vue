<template>
  <div class="text-center pa-4">
    <!-- <v-btn @click="appStore.isShowModal = true">
      Open Dialog
    </v-btn> -->

    <v-dialog v-model="appStore.isShowModal" width="auto">
      <v-card
        max-width="400"
        :prepend-icon="appStore.modalData.icon"
        :title="appStore.modalData.title"
      >
        <v-icon
          class="cls-btn"
          icon="mdi-close"
          @click="appStore.isShowModal = false"
        ></v-icon>

        <template v-slot:actions>
          <div class="content">
            <div
              class="content-item"
              v-for="(item, i) in appStore.modalData.content"
              :key="i + 'modal-item'"
              :style="item.display ? `display: ${item.display}` : 'display: block'"
            >
              <template v-if="item.type === 'text'">
                {{ item.text }}
              </template>
              <template v-if="item.type === 'divider'">
                <v-divider></v-divider>
              </template>
              <template v-if="item.type === 'component'">
                <component :is="item.component"></component>
              </template>
              <organizm-Header />
              <component :is="'Loader'"></component>
            </div>
            <v-btn
            class="ms-auto"
            text="Ok"
            @click="appStore.closeModal()"
          ></v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '../../stores/AppStore';
const appStore = useAppStore();
</script>

<style>
.content-item {
  margin-top: 20px;
  width: fit-content;
}
</style>
