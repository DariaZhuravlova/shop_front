<script lang="ts" setup>
import { useCartStore } from '@/stores/CartStore';
const cartStore = useCartStore();
</script>


<template>
  <div v-if="cartStore.currentCart.length > 0" class="order-info-description">
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
</template>

<style lang="scss" scoped>
.order-info-description {
  width: 100%;
  padding: 15px;
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

@media (max-width: 450px) {
  .table td:nth-child(3) {
    display: none;
  }
}

@media (min-width: 1024px) {
  .order-info-description {
    margin-top: 0;
  }
}
</style>