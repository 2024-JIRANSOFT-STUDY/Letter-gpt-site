<template>
  <div class="main">
    <Sidebar />
    <MainLayout>
      <template #children>
        <PromptForm></PromptForm>
        <PromptResult></PromptResult>
      </template>
    </MainLayout>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import MainLayout from "../components/Layout/MainLayout.vue";
import PromptForm from "../components/PromptForm.vue";
import PromptResult from "../components/PromptResult.vue";
</script>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
