<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();

const regPhone = /^\+38 \(0[1-9]\d{1}\) \d{3} \d{2} \d{2}$/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    username(value: string) {
      if (!value?.length) return 'Введите имя';
      else if (value?.length >= 2) return true;
      else return 'Имя содержит минимум 2 символа';
    },
    phone(value: string) {
      if (!value?.length) return 'Введите номер телефона';
      if (!regPhone.test(value)) return 'Неверный формат номера';
      return true;
    },
    email(value: string) {
      if (!value?.length) return 'Введите Email';
      if (!regEmail.test(value)) return 'Неверный формат Email';
      return true;
    },
    city(value: string) {
      if (!value?.length) return 'Введите город';
      return true;
    },
    department(value: string) {
      if (!value?.length && city.value.value) return 'Выберите отделение';
      return true;
    },
  },
});

const username = useField('username');
const phone = useField('phone');
const email = useField('email');
const city = useField('city');
const department = useField('department');
const submitOrder = handleSubmit(async (values: any) => {
  const contacts = {
    username: username.value.value,
    phone: phone.value.value,
    email: email.value.value,
  };
  const delivery = {
    city: city.value.value,
    department: department.value.value,
  };

  const result = await cartStore.addOrder(contacts, delivery);
  if (result?.data.ok) {
    cartStore.currentCart = [];
    alert('Ваш заказ принят. Спасибо за покупку!');
    handleReset();
    city.value.value = '';
  } else {
    alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
  }
});

function onInputPhone(event: any) {
  event.target.value = event.target.value
    .replace('+38 (0', '')
    .replace(/\D/g, '')
    .slice(0, 9);
  const phoneRegex = /^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/;

  event.target.value = event.target.value.replace(
    phoneRegex,
    (_match: string, p1: string, p2: string, p3: string, p4: string) => {
      const formattedNumber = [];

      if (p1) {
        formattedNumber.push(`+38 (0${p1}`);
      }
      if (p2) {
        formattedNumber.push(`) ${p2}`);
      }
      if (p3) {
        formattedNumber.push(` ${p3}`);
      }
      if (p4) {
        formattedNumber.push(` ${p4}`);
      }

      return formattedNumber.join('');
    }
  );
  phone.value.value = event.target.value;
}

function updateCity(selectedCity: string) {
  city.value.value = selectedCity;
}

function updateDepartment(selectedDepartment: string) {
  department.value.value = selectedDepartment;
}
</script>

<template>
  <v-form class="order" @submit.prevent="submitOrder">
    <v-row align="center">
      <v-col cols="12" md="6" class="contact-info">
        <div class="action">1 Контактная информация</div>
        <v-col cols="12" class="pa-0 pt-2">
          <v-text-field
            variant="solo"
            v-model="username.value.value"
            :error-messages="username.errorMessage.value"
            label="Имя"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            variant="solo"
            v-model="phone.value.value"
            @input="onInputPhone"
            label="Телефон"
            :error-messages="phone.errorMessage.value"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            variant="solo"
            v-model="email.value.value"
            label="E-mail"
            :error-messages="email.errorMessage.value"
          ></v-text-field>
        </v-col>
      </v-col>
      <v-col cols="12" md="6">
        <molecule-OrderedProducts />
      </v-col>
      <v-col align="center" cols="12">
        <div class="delivery">
          <div class="action">2 Доставка</div>
          <organism-Delivery
            @updateCity="updateCity"
            @updateDepartment="updateDepartment"
            :cityError="city.errorMessage.value"
            :departmentError="department.errorMessage.value"
          />
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        class="mt-4"
        style="width: 200px"
        text="Сделать заказ"
        type="submit"
      ></v-btn>
    </v-row>
  </v-form>
</template>  

<style lang="scss" scoped>
.order {
  padding: 60px 20px 40px 20px;
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
    max-width: 800px;
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