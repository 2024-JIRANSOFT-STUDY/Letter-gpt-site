<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, watch, ref } from 'vue';
import axiosInstance from '@/services/base';

const route = useRoute();
const store = useStore();

const letterId = route.params.id;
const userInfo = computed(() => store.getters["auth/getUserId"]);

const letterTitle = ref("");
const letterContent = ref("");
const letterCreatedAt = ref("");

const getLetterInfo = async () => {
  const userId = userInfo.value;
  if (!userInfo) return;
  try {
    const response = await axiosInstance.get(`/api/users/${userId}/letters/${letterId}`);
    if(response.statusText === "OK") {
      const responseData= response.data;
      letterTitle.value = responseData.letter.title;
      letterContent.value = responseData.letter.generated_content;
      letterCreatedAt = responseData.letter.created_at;
    }
  } catch (error) {
    console.error(error);
  }
}

const deleteLetter = async () => {
  try {
    const response = await axiosInstance.delete(`/api/users/${userId}/letters/${letterId}`);
  } catch (error) {
    console.error(error)
  }
}

watch(userInfo, (newUserInfo) => {
  if (newUserInfo) {
    getLetterInfo();
  }
}, { immediate: true });
</script>

<template>
  <div class="wrapper">
    <img src="/src/assets/MainLogo.png" alt="logo" />
    <main class="container">
      <div class="title-container">
        <h2 class="title">{{ letterTitle }}</h2>
      </div>
      <div class="content-container">
        <pre class="content"> {{ letterContent }}</pre>
      </div>
    </main>
    <div class="button-container">
      <v-btn class="custom-button" variant="outlined">편지 삭제하기</v-btn>
    </div>
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

.button-container {
  width: calc(100% - 240px);
  margin: 0 auto;
  margin-top: 12px;
  text-align: end;
  

  .custom-button {
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .custom-button:hover :deep(.v-btn__overlay) {
    opacity: 0;
  }
}



</style>
