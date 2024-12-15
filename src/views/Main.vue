<template>
  <div class="main">
    <!-- <Sidebar /> -->
    <MainLayout>
      <template #children>
        <PromptForm></PromptForm>
      </template>
    </MainLayout>
    <BackdropLoading @set-loading="(fn) => setLoadingState = fn"  />
    <ConfirmModal @set-modal="(fn) => setModalState = fn" />
  </div>
</template>

<script setup>
// import Sidebar from "../components/Sidebar.vue";
import MainLayout from "../components/Layout/MainLayout.vue";
import PromptForm from "../components/PromptForm.vue";
import BackdropLoading from "@/components/BackdropLoading.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { ref, provide } from "vue";

let setLoadingState = null;
let setModalState = null;

provide('setLoading', (state) => {
  if (setLoadingState) {
    setLoadingState(state);
  }
});

provide('setModal', (open, title, content, callback) => {
  if (setModalState) {
    setModalState(open, title, content, callback);
  }
})

// const isExpanded = ref(false); // 사이드바 열림 상태
// const toggleSidebar = () => {
//   isExpanded.value = !isExpanded.value;
// };

// provide("isExpanded", isExpanded);
// provide("toggleSidebar", toggleSidebar);
</script>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>
