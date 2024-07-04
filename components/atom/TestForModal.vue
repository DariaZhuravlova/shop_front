<template>
  <div>
    <div class="test-atom">test component for modal ATOM</div>
    <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
      <template>
        <v-card title="Step One" flat>...</v-card>
      </template>

      <template>
        <v-card title="Step Two" flat>...</v-card>
      </template>

      <template>
        <v-card title="Step Three" flat>...</v-card>
      </template>
    </v-stepper>
  </div>
</template>

<style>
.test-atom {
  color: green;
  font-weight: 700;
}
</style>
