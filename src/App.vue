<template>
  <v-app>
    <Sidebar />
    <router-view />
  </v-app>
</template>

<script setup>
import { ref, provide } from "vue";
import Sidebar from "./components/Sidebar.vue";

const isExpanded = ref(false);

// 사이드바 토글 함수
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

provide("isExpanded", isExpanded);
provide("toggleSidebar", toggleSidebar);
</script>

<style lang="scss">
:root {
  --main: #1a1a1d;
  --mid: #3b1c32;
  --point: #6a1e55;
  --light: #ffffff;
  background-color: #1a1a1d;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
}

body {
  background-color: var(--main);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
</style>
