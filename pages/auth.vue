<template>
  <v-container>
    <v-form @submit.prevent="submit">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            variant="solo"
            v-model="username.value.value"
            :error-messages="username.errorMessage.value"
            label="User Name"
          ></v-text-field>
          <v-text-field
            variant="solo"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            label="password"
            type="password"
            min="0"
          ></v-text-field>
          <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- <v-row>
      <v-col
        v-for="product in productStore.products"
        :key="product._id"
        cols="12"
        md="4"
      >
        <v-card class="product-card">
          <v-card-title>{{ product.name }}</v-card-title>
          <p>Price: ${{ product.price }}</p>
          <v-btn color="error" @click="deleteProduct(product._id)"
            >Delete</v-btn
          >
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script lang="ts" setup>
import type { RegisterData } from "../types";
import { ref, onMounted } from "vue";
import { useAppStore } from "../stores/AppStore";
import { useField, useForm } from "vee-validate";
const appStore = useAppStore();

onMounted(() => {
  // appStore.checkAuth();
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    username(value: string) {
      if (!value?.length) return "Введите имя";
      else if (value?.length >= 2) return true;
      else return "Имя содержит минимум 2 символа";
    },
    password(value: string) {
      if (!value?.length) return "Введите парооль";
      else if (value?.length >= 4) return true;
      else return "Пароль содержит минимум 4 символа";

    },
  },
});

const username = useField("username");
const password = useField("password");

const submit = handleSubmit(async (values) => {
  const { username, password } = values;

  if (!username || !password) {
    return alert("Заполните все поля"); 
  }

  await appStore.register({ username, password });
  handleReset();
});


</script>

<style scoped lang="scss">
.product-card {
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;

  .v-card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .v-btn {
    margin-top: 20px;
  }
}
</style>