<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

// Определяем интерфейсы для данных
interface City {
  Ref: string;
  DescriptionRu: string;
}

interface Department {
  Ref: string;
  DescriptionRu: string;
}

// Инициализируем состояния с типами
const cities = ref<City[]>([]);
const departments = ref<Department[]>([]);
const selectedCity = ref<City | null>(null); // Изменено на объект City или null
const selectedDepartment = ref<string>('');
const citySearchTerm = ref<string>('');

// Конфигурация API
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

// Поиск городов
const fetchCities = async (query: string) => {
  console.log('Поиск городов с запросом:', query);
  if (query) {
    try {
      const response = await axios.get(
        `${apiUrl}/api/search-cities?q=${encodeURIComponent(query)}`
      );
      if (Array.isArray(response.data.cities)) {
        cities.value = response.data.cities; // Устанавливаем города
      } else {
        console.error('Некорректный формат данных:', response.data);
      }
    } catch (error) {
      console.error('Ошибка при поиске городов:', error);
    }
  } else {
    cities.value = [];
  }
};

// Поиск отделений для выбранного города
const fetchDepartments = async (cityRef: string) => {
  if (cityRef) {
    try {
      const response = await axios.get(
        `${apiUrl}/api/search-departments?cityRef=${cityRef}`
      );

      console.log('Ответ от сервера для отделений:', response.data); // Логируем ответ

      // Проверяем, есть ли поле ok и является ли departments массивом
      if (response.data.ok) {
        if (
          Array.isArray(response.data.departments) &&
          response.data.departments.length > 0
        ) {
          departments.value = response.data.departments; // Устанавливаем данные в состояние
        } else {
          console.error('Отделения не найдены:', response.data.departments);
          alert('Отделения не найдены для данного города.');
          departments.value = []; // Очищаем список отделений
        }
      } else {
        console.error('Ошибка от API Новой Почты:', response.data);
        alert('Ошибка при получении данных от Новой Почты.');
      }
    } catch (error) {
      console.error('Ошибка при поиске отделений:', error);
      alert('Произошла ошибка при обращении к API.');
    }
  } else {
    departments.value = []; // Очистка списка отделений, если cityRef не задан
  }
};
</script>

<template>
  <v-container>
    <!-- Поле поиска и выбора города -->
    <v-autocomplete
      v-model="selectedCity"
      :items="['Киев', 'Харьков', 'Днепр', 'Одесса', 'Львов']"
      label="Введите название города"
      item-text="DescriptionRu"
      item-value="Ref"
      @update:model-value="(value: City | null) => {
        console.log('Выбранный город:', value); // Логируем выбранный город
        if (value) {
          fetchDepartments(value.Ref); // Используем Ref для запроса отделений
        } else {
          departments.value = []; // Очищаем отделения, если город не выбран
        }
      }"
      @search-input="fetchCities"
      :search-input.sync="citySearchTerm"
    />

    <!-- Поле выбора отделения -->
    <v-select
      v-model="selectedDepartment"
      :items="departments"
      label="Выберите отделение"
      item-text="DescriptionRu"
      item-value="Ref"
    />
  </v-container>
</template>
