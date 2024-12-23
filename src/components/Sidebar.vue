<template>
  <v-navigation-drawer
    v-model="isExpanded"
    app
    width="300"
    class="custom-drawer"
  >
    <!-- 로고 -->
    <div class="logo" @click="toggleSidebar">
      <img src="@/assets/Letter_GPT_logo.png" alt="logo" />
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
              <div class="list-item-title">{{ prompt.title }}</div>
              <div class="list-item-subtitle">{{ prompt.created_at }}</div>
            </div>
          </v-list-item>
        </v-list>
        <div ref="observer" class="observer"></div>
        <div v-if="isLoading" class="loading-indicator">로딩 중...</div>
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
import axiosInstance from "@/services/base";
import { computed, ref, inject, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const isExpanded = inject("isExpanded");
const toggleSidebar = inject("toggleSidebar");

const store = useStore();
const userId = computed(() => store.getters["auth/getUserId"]);

const prompts = ref([]); 
const selectedPromptId = ref(null); 
const isLoading = ref(false); 
const hasMore = ref(true); // 추가 데이터가 있는지
const observer = ref(null); 
let currentPage = 1; 

// 프롬프트 선택
const selectPrompt = (id) => {
  selectedPromptId.value = id;
};

// 데이터 불러오기
const fetchPrompts = async () => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;

  try {
    const response = await axiosInstance.get(
      `/api/users/${userId.value}/letters`,
      {
        params: {
          limit: 10, // 한 번에 가져올 데이터
          pagination: true,
          page: currentPage, // 현재 페이지
        },
        headers: {
          Authorization: `Bearer ${store.getters["auth/getToken"]}`,
        },
      }
    );

    const data = response.data;

    if (data.data && data.data.length > 0) {
      prompts.value = [...prompts.value, ...data.data]; 
      currentPage++; 
      hasMore.value = !!data.next_page; // 다음 페이지 존재 여부 확인
    } else {
      hasMore.value = false; // 데이터가 없음
    }
  } catch (error) {
    console.error("데이터 로드 실패:", error.response?.data || error.message);
  } finally {
    isLoading.value = false;
  }
};

// Intersection Observer 생성
const createObserver = () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const callback = (entries) => {
    if (entries[0].isIntersecting && hasMore.value && !isLoading.value) {
      console.log("Observer 트리거 : 데이터 로드 중...");
      fetchPrompts();
    }
  };

  const observerInstance = new IntersectionObserver(callback, options);
  if (observer.value) {
    observerInstance.observe(observer.value);
  }
  return observerInstance;
};

let observerInstance = null;

onMounted(() => {
  if (userId.value) {
    prompts.value = []; 
    currentPage = 1; 
    hasMore.value = true; 
    fetchPrompts(); 
  }
  observerInstance = createObserver();
});

onUnmounted(() => {
  if (observerInstance && observer.value) {
    observerInstance.unobserve(observer.value);
  }
});
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
  height: 100vh;
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
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
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