<template>
  <div class="text-center pa-4">
    <!-- <v-btn @click="appStore.isShowModal = true">
        Open Dialog
      </v-btn> -->

    <v-dialog v-model="appStore.isShowModal" width="auto">
      <v-card
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
              :style="
                item.display ? `display: ${item.display}` : 'display: block'
              "
            >
              <template v-if="item.type === 'text'">
                {{ item.text }}
              </template>
              <template v-if="item.type === 'divider'">
                <v-divider></v-divider>
              </template>
              <template v-if="item.type === 'component'">
                <!-- <component
                    v-if="loadComponent(item.dir, item.component)"
                    :is="loadComponent(item.dir, item.component)"
                  ></component> -->
                <!-- <component :is="'organism-SelectableImgBlock'"></component> -->
                <organism-SelectableImgBlock />
              </template>
            </div>
            <v-btn
              class="ms-auto"
              text="Ok"
              @click="appStore.isShowModal = false"
            ></v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useAppStore } from '../../stores/AppStore';
const appStore = useAppStore();

const loadComponent = (componentDir: string, componentName: string) => {
  return defineAsyncComponent({
    loader: () =>
      import(`../../components/${componentDir}/${componentName}.vue`).catch(
        (error) => {
          console.error(
            `Failed to load component ${componentName} from ${componentDir}:`,
            error
          );
          return null;
        }
      ),
    loadingComponent: undefined,
    errorComponent: undefined,
  });
};
</script>
  
<style>
.content-item {
  margin-top: 20px;
  width: fit-content;
}

.cls-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>