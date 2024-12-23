<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, watch, ref, inject } from "vue";
import axiosInstance from "@/services/base";

const route = useRoute();
const router = useRouter();
const store = useStore();

const isExpanded = inject("isExpanded"); 
const toggleSidebar = inject("toggleSidebar"); 

const letterId = ref(route.params.id); 
const userInfo = computed(() => store.getters["auth/getUserId"]);

const letterTitle = ref("");
const letterContent = ref("");
const letterCreatedAt = ref("");

const getLetterInfo = async () => {
  const userId = userInfo.value;
  if (!userId) return;
  try {
    const response = await axiosInstance.get(`/api/users/${userId}/letters/${letterId.value}`);
    if (response.statusText === "OK") {
      const responseData = response.data;
      letterTitle.value = responseData.letter.title;
      letterContent.value = responseData.letter.generated_content;
      letterCreatedAt = responseData.letter.created_at;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteLetter = async () => {
  try {
    const response = await axiosInstance.delete(`/api/users/${userId}/letters/${letterId}`);
  } catch (error) {
    console.error(error)
  }
}

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      letterId.value = newId;
      getLetterInfo();
    }
  },
  { immediate: true }
);

watch(
  () => route.params.id, 
  (newId) => {
    if (newId) {
      letterId.value = newId; 
      getLetterInfo(); 
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="wrapper">
    <!-- 사이드바 토글 버튼 -->
    <button class="sidebar-toggle-btn" @click="toggleSidebar">
      <v-icon>mdi-menu</v-icon>
    </button>

    <!-- 본문 -->
    <img src="/src/assets/MainLogo.png" alt="logo" class="logo" @click="toggleSidebar" />
    <main class="container">
      <div class="title-container">
        <h2 class="title">{{ letterTitle }}</h2>
      </div>
      <div class="content-container">
        <pre class="content"> {{ letterContent }}</pre>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  text-align: center;
}

.sidebar-toggle-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: transparent;
  border: none;
  color: var(--main);
  cursor: pointer;
  font-size: 24px;

  &:hover {
    color: var(--light);
  }
}

.logo {
  cursor: pointer;
  width: 80px;
}

.container {
  background-color: var(--point);
  padding: 16px;
  border-radius: 16px;
  margin: 0 8px;
  text-align: start;
  width: calc(100% - 240px);
  margin: 0 auto;
}

.title-container {
  margin: 8px 0;
  .title {
    font-size: 1.25rem;
  }
}

.content-container {
  .content {
    word-break: break-all;
    text-wrap: auto;
  }
}
</style>