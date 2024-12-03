<template>
  <div class="setting">
    <Sidebar />
    <div id="setting-wrapper">
      <header>
        <button v-if="!isExpanded" class="logo-btn" @click="toggleSidebar">
          <img src="@/assets/Letter_GPT_logo.png" alt="logo" />
        </button>
      </header>
      <main id="setting-container">
        <v-card class="setting-card" variant="outlined">
          <v-card-title class="setting-title">설정</v-card-title>
          <v-divider class="border-opacity-100"></v-divider>
          <v-card-subtitle class="setting-subtitle">사용자 정보</v-card-subtitle>
          <v-card-text>
            <v-list dense class="setting-user">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>이름: 김지란</v-list-item-title>
              </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-email</v-icon>
              </v-list-item-icon>
                <v-list-item-title>이메일: jiran@jiran.com</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions class="action-buttons">
            <v-btn color="primary" variant="outlined" @click="logoutConfirm">로그아웃</v-btn>
            <v-btn color="error" variant="outlined" @click="clearHistoryConfirm">히스토리 지우기</v-btn>
          </v-card-actions>
          
        </v-card>

        <!-- 히스토리 삭제 확인 다이얼로그 -->
        <v-dialog v-model="dialog_history" max-width="300">
          <v-card>
            <v-card-title>정말 지우겠습니까?</v-card-title>
            <v-card-actions>
              <v-btn color="primary" text @click="clearHistory">예</v-btn>
              <v-btn color="secondary" text @click="dialog_history= false">아니오</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- 로그아웃 확인 다이얼로그 -->
        <v-dialog v-model="dialog_logout" max-width="300">
          <v-card>
            <v-card-title>정말 로그아웃 하시겠습니까?</v-card-title>
            <v-card-actions>
              <v-btn color="primary" text @click="logout">예</v-btn>
              <v-btn color="secondary" text @click="dialog_logout = false">아니오</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue"; 
import { ref, provide } from "vue";

// 사이드바
const isExpanded = ref(false);
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

provide("isExpanded", isExpanded);
provide("toggleSidebar", toggleSidebar);


const dialog_history = ref(false); // 히스토리 삭제 다이얼로그 상태
const dialog_logout = ref(false); // 로그아웃 다이얼로그 상태

// 로그아웃
const logout = () => {
  alert("로그아웃되었습니다.");
  dialog_logout.value = false;
};

const logoutConfirm = () => {
  dialog_logout.value = true;
}

// 히스토리 지우기
const clearHistory = () => {
  alert("히스토리가 삭제되었습니다.");
  dialog_history.value = false;
};

const clearHistoryConfirm = () => {
  dialog_history.value = true;
};

</script>

<style scoped>
.setting {
  display: flex;
  width: 100%;
  height: 100%;
}

.setting-title {
  font-size: 30px;
  font-weight: bold;
  color: var(--light);
}

.setting-subtitle {
  padding-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: var(--light);
}

.setting-user {
  background-color: var(--light);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--light);
  opacity: 0.8;
}

.action-buttons {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  margin-top: auto; 
  padding-bottom: 20px; 
  gap: 10px; /* 버튼 간격 */
}

.setting-text {
  font-size: 13px;
  color: var(--light);
}

.logo-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.logo-btn img {
  width: 40px;
  height: 40px;
}

.setting {
  display: flex;
  flex-direction: column;
  background-color: var(--main);
  height: 100vh; /* 화면 전체 높이 */
  width: 100%;
}

#setting-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 50px); /* header 높이를 제외한 영역 */
  width: 100%;
  padding-top: 50px;
}

#setting-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  height: 100%;
}

.setting-card {
  background-color: var(--mid);
  width: 100%;
  max-width: 1000px;
  height: 60%; /* 카드 높이를 부모의 80%로 설정 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--vuetify-box-shadow);
  border-radius: 8px;
}
</style>