<script setup>
import MainLayout from "./components/Layout/MainLayout.vue";
import PromptForm from "./components/PromptForm.vue";
import PromptResult from "./components/PromptResult.vue";
</script>

<template>
  <MainLayout>
    <template #children>
      <PromptForm></PromptForm>
      <PromptResult></PromptResult>
    </template>
  </MainLayout>
</template>

<style scoped></style>
