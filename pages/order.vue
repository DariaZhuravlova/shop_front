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
      <div
        v-if="cartStore.currentCart.length > 0"
        class="order-info-description"
      >
        <h2>Вы заказали:</h2>
        <table class="table">
          <tbody>
            <tr v-for="item in cartStore.currentCart" :key="item.product._id">
              <td>{{ item.product.name }}</td>
              <td>x {{ item.quantity }}</td>
              <td>{{ item.product.price }} грн/шт</td>
              <td>{{ item.product.price * item.quantity }} грн</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex pa-2 justify-end">
          <span>Общая сумма заказа {{ cartStore.totalPrice }} грн</span>
        </div>
      </div>
    </div>
    <div class="delivery">
      <div class="action">2 Доставка</div>
    </div>
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

    &-description {
      max-width: 800px;
      padding: 15px;
      margin-top: 40px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;

        tr {
          border-bottom: 1px solid #ddd;
        }

        td {
          padding: 12px 20px;
          text-align: left;

          &:first-child {
            width: 50%;
          }

          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4) {
            white-space: nowrap;
            text-align: right;
          }

          &:nth-child(2) {
            width: 10%;
          }

          &:nth-child(3) {
            width: 20%;
          }

          &:nth-child(4) {
            width: 20%;
          }
        }
      }

      hr {
        margin: 20px 0;
        border: none;
        border-top: 1px solid #ddd;
      }

      .d-flex {
        display: flex;
        justify-content: flex-end;
        padding: 10px 0;

        span {
          font-weight: bold;
          font-size: 16px;
        }
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

@media (max-width: 450px) {
  .table td:nth-child(3) {
    display: none;
  }
}

@media (min-width: 1024px) {
  .order-info {
    flex-direction: row;
    justify-content: space-around;
  }
  .order-info-description {
    margin-top: 0;
  }
}
</style>