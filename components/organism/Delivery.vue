<script lang="ts" setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

const cities = ref<any[]>([]);
const departments = ref<string[]>([]);
const selectedCity = ref<{} | null>(null);
const selectedDepartment = ref<string>('');
let citySearchTerm = ref<string>('');
const isInputActive = ref<boolean>(false);
// Конфигурация API
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

async function searchDepartment(ref: string) {
  try {
    const response = await axios.get(
      `${apiUrl}/api/search-departments?CityRef=${ref}`
    );
    departments.value = response.data.departments.map(
      (elem) => elem.DescriptionRu
    );
  } catch (error) {
    console.log(error);
  }
}

async function searchCity(city: string) {
  try {
    let response = await axios.get(`${apiUrl}/api/search-cities?q=${city}`);

    cities.value = response.data.cities[0].Addresses;
    console.log(cities.value);
  } catch (error) {
    console.log(error);
  }
}

function selectCity(city: string) {
  selectedCity.value = city;
  isInputActive.value = false;
  citySearchTerm.value = city.MainDescription;
}

watch(
  () => citySearchTerm.value,
  (newValue: string, oldValue: string) => {
    cities.value = [];
    if (newValue) {
      searchCity(newValue);
    }
  }
);

watch(
  () => selectedCity.value,
  (newValue: {}, oldValue: string) => {
    if (newValue) {
      console.log(newValue.Ref);

      searchDepartment(newValue.Ref);
    }
  }
);
</script>

<template>
  <v-container>
    <v-row class="city-select">
      <v-col cols="12">
        <input
          placeholder="Введите город"
          @focus="isInputActive = true"
          type="text"
          v-model="citySearchTerm"
        />
        <div
          :class="isInputActive ? 'all-cities' : 'd-none'"
          id="scroll-target"
          class="overflow-y-auto"
          style="max-height: 150px"
        >
          <div
            v-for="city in cities"
            :key="city.Present"
            class="city"
            @click="selectCity(city)"
          >
            <span>{{ city.Present }}</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Поле выбора отделения -->
    <v-row>
      <v-col cols="12">
        <v-select
          v-model="selectedDepartment"
          :items="departments"
          label="Выберите отделение"
          item-text="DescriptionRu"
          item-value="Ref"
          :disabled="!selectedCity"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.city-select {
  width: 100%;
  height: 28px;
  z-index: 1;
  margin: 0 auto 35px auto;
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid;
    border-radius: 5px;
  }
  input:focus {
    outline: none;
  }
  .all-cities {
    max-height: 150px;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 11;
    background-color: white;
  }
  .d-none {
    display: none;
  }
  .city {
    padding: 5px 10px;
  }
  .city:hover {
    background-color: rgb(203, 208, 206);
    cursor: pointer;
  }
}
</style>