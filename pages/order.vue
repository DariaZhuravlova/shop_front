<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();
const appStore = useAppStore();
const productStore = useProductStore();
</script>

<template>
  <div class="order">
    <div class="order-info">
      <div style="width: 500px" class="contact-info">
        <div class="action">1 Контактная информация</div>
        <v-form v-model="valid">
          <v-container>
            <v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="firstname"
                  :counter="10"
                  :rules="nameRules"
                  label="First name"
                  hide-details
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="lastname"
                  :counter="10"
                  :rules="nameRules"
                  label="Phone"
                  hide-details
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-col>
          </v-container>
        </v-form>
      </div>
      <molecule-OrderedProducts />
    </div>
    <div class="delivery">
      <div class="action">2 Доставка</div>
      <organism-Delivery />
    </div>
    <v-btn class="mt-2" text="Сделать заказ" type="submit" block></v-btn>
  </div>
</template>  

<style lang="scss" scoped>
.order {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 40px 0;
  &-info {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .contact-info {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      position: relative;

      .action {
        position: absolute;
        top: -25px;
        left: 0;
      }
    }
  }
  .delivery {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 800px;
    height: 400px;
    margin-top: 40px;
    position: relative;

    .action {
      position: absolute;
      top: -25px;
      left: 0;
    }
  }
}

@media (min-width: 1024px) {
  .order-info {
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>