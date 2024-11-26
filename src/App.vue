<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup></script>

<style lang="scss">
@import 'vuetify/styles';

:root {
  --main: #1A1A1D;
  --mid: #3B1C32;
  --point: #6A1E55;
  --light: #FFFFFF;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--main);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
</style>
