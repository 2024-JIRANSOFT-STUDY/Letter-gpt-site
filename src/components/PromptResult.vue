<script setup></script>

<template>
  <div class="result-container">
    <slot name="result"></slot>
  </div>
</template>

<style scoped>
.result-container {
  border: 1px solid black;
  padding: 8px;
}
</style>
