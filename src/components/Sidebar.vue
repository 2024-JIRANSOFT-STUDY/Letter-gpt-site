<template>
  <v-navigation-drawer
    v-model="isExpanded"
    app
    width="300"
    class="custom-drawer"
  >
    <!-- 로고 -->
    <div class="logo" @click="toggleSidebar">
      <img :src="logoURL" alt="logo" />
    </div>

    <!-- 이전 프롬프트 -->
    <template v-if="isExpanded">
      <h3 class="color-text">이전 프롬프트</h3>
      <div class="prompt-list-container">
        <v-list dense class="prompt-list">
          <v-list-item
            v-for="prompt in prompts"
            :key="prompt.id"
            :class="{ active: selectedPromptId === prompt.id }"
            @click="selectPrompt(prompt.id)"
          >
            <div class="list-item-content">
              <div class="list-item-title">{{ prompt.summary }}</div>
              <div class="list-item-subtitle">{{ prompt.DateOfUsed }}</div>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </template>

    <v-spacer></v-spacer>

    <!-- 설정 메뉴 -->
    <v-list>
      <v-list-item @click="$router.push('/setting')" class="settings-item">
        <div class="icon-text">
          <v-icon class="settings-icon">mdi-cog</v-icon>
          <v-list-item-title>설정</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, inject } from "vue";
import logoURL from "../assets/Letter_GPT_logo.png";

const isExpanded = inject("isExpanded");
const toggleSidebar = inject("toggleSidebar");

// 프롬프트 데이터
const prompts = ref([
    { id: 1, summary: "친구에게 쓰는 생일 편지", DateOfUsed: "2024-11-18" },
    { id: 2, summary: "상사에게 쓰는 감사 편지", DateOfUsed: "2024-11-15" },
    { id: 3, summary: "남자친구에게 쓰는 기념일 편지", DateOfUsed: "2024-10-20" },
    { id: 4, summary: "여자친구에게 쓰는 기념일 편지", DateOfUsed: "2024-10-11" },
    { id: 5, summary: "할아버지께 쓰는 칠순 기념 편지", DateOfUsed: "2024-10-03" },
    { id: 6, summary: "신년 인삿말", DateOfUsed: "2023-12-20" },
    { id: 7, summary: "한 해 마무리 인삿말", DateOfUsed: "2023-12-18" },
    { id: 8, summary: "수능 응원", DateOfUsed: "2023-11-12" },
    { id: 9, summary: "병문안 인사", DateOfUsed: "2023-11-02" },
    { id: 10, summary: "생일 축하 인사", DateOfUsed: "2023-10-30" },
    { id: 11, summary: "블라블라1", DateOfUsed: "2023-10-20" },
    { id: 12, summary: "블라블라2", DateOfUsed: "2023-10-08" },
    { id: 13, summary: "블라블라3", DateOfUsed: "2023-09-30" },
    { id: 14, summary: "블라블라4", DateOfUsed: "2023-09-02" },
    { id: 15, summary: "블라블라5", DateOfUsed: "2023-08-30" },
  ]); 

const selectedPromptId = ref(null);

const selectPrompt = (id) => {
  selectedPromptId.value = id;
};
</script>

<style scoped>
.list-item-content {
  display: flex;
  flex-direction: column;
}

.list-item-title {
  font-size: 16px;
}

.list-item-subtitle {
  font-size: 14px;
}


/* 사이드바 전체 스타일 */
.custom-drawer {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 사이드바 높이 고정 */
  background-color: var(--mid);
  color: var(--light);
}

/* 로고 스타일 */
.logo {
  margin: 10px;
  text-align: left;
}

.logo img {
  width: 40px;
  cursor: pointer;
}

/* 이전 프롬프트 타이틀 */
.color-text {
  font-size: 16px;
  color: var(--light);
  margin: 16px;
}

/* 프롬프트 리스트 컨테이너 */
.prompt-list-container {
  flex: 1; /* 부모 안에서 나머지 공간 차지 */
  overflow-y: auto; /* 스크롤 가능 */
  max-height: calc(100vh - 200px); /* 최대 높이 제한 */
}

/* 프롬프트 리스트 */
.prompt-list {
  margin: 0;
  padding: 0;
}

.v-list-item {
  margin: 8px 0;
  height: 55px;
  transition: background-color 0.2s ease;
}

.v-list-item:hover {
  background-color: var(--point);
  color: var(--light);
}

.v-list-item.active {
  background-color: var(--point);
  color: var(--light);
  font-weight: bold;
}

/* 설정 메뉴 */
.settings-item {
  margin: 10px;
  cursor: pointer;
}

.settings-item:hover {
  background-color: var(--point);
  color: var(--light);
}

/* 아이콘과 텍스트 정렬 */
.icon-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.settings-icon {
  font-size: 24px;
  color: var(--light);
}
</style>