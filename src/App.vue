<template>
  <router-view />
</template>

<script setup></script>

<style lang="scss">
:root {
  --primary: #c9e6f0;
  --primary-alt: #c9e6f0;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 25%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
</style>
