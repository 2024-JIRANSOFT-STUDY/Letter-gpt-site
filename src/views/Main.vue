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

import { ref, provide } from "vue";

const isExpanded = ref(false); // 사이드바 열림 상태
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

provide("isExpanded", isExpanded);
provide("toggleSidebar", toggleSidebar);
</script>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
