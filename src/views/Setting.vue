<template>
  <div class="setting">
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
            <div class="setting-user">
              <div class="user-item">
                <v-icon color="primary" class="user-icon">mdi-account</v-icon>
                <span class="user-text">이름: {{ user.name || '정보 없음'}}</span>
              </div>
              <div class="user-item">
                <v-icon color="primary" class="user-icon">mdi-email</v-icon>
                <span class="user-text">이메일: {{ user.email || '정보 없음'}}</span>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="action-buttons">
            <v-btn color="primary" variant="outlined" @click="logoutConfirm">로그아웃</v-btn>
            <v-btn color="error" variant="outlined" @click="clearHistoryConfirm">히스토리 지우기</v-btn>
          </v-card-actions>
        </v-card>

        <v-dialog v-model="dialog_history" max-width="300">
  <v-card class="dialog-card">
    <v-card-title class="dialog-title">정말 지우겠습니까?</v-card-title>
    <v-card-actions class="dialog-actions">
      <v-btn class="dialog-btn confirm-btn" @click="clearHistory">예</v-btn>
      <v-btn class="dialog-btn cancel-btn" @click="dialog_history = false">아니오</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-dialog v-model="dialog_logout" max-width="300">
  <v-card class="dialog-card">
    <v-card-title class="dialog-title">정말 로그아웃 하시겠습니까?</v-card-title>
    <v-card-actions class="dialog-actions">
      <v-btn class="dialog-btn confirm-btn" @click="logout">예</v-btn>
      <v-btn class="dialog-btn cancel-btn" @click="dialog_logout = false">아니오</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

      </main>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import axiosInstance from "@/services/base";
import { useCookies } from "vue3-cookies";

// App.vue에서 제공한 사이드바 상태와 컨트롤 함수 주입
const isExpanded = inject("isExpanded");
const toggleSidebar = inject("toggleSidebar");


const dialog_history = ref(false); // 히스토리 삭제 다이얼로그 상태
const dialog_logout = ref(false); // 로그아웃 다이얼로그 상태
const user = ref({});

const { cookies } = useCookies();

// 사용자 정보 불러오기
const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/me");
    if (response.data.result === "success") {
      user.value = response.data.user;
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 토큰이 없는 경우 리다이렉트
      const accessToken = cookies.get("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다. 다시 로그인해주세요.");
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        window.location.href = "/";
      } else {
        console.error("401 Unauthorized: 서버에서 요청을 거부했습니다.");
      }
    } else {
      console.error("사용자 정보 가져오기 중 오류:", error);
    }
  }
};

// 로그아웃
const logout = async() => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    if (response.data.result === "success") {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      alert("로그아웃되었습니다.");
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    } else {
      console.error(response.data.message);
      
    } 
  } catch (error) {
    console.error(error);
    alert("로그아웃에 실패했습니다.");
  }
};

// 히스토리 지우기
const clearHistory = async () => {
  try {
    const userId = user.value.id;
    if (!userId) {
      alert("사용자 정보 불러오기 실패");
      return;
    }

    const response = await axiosInstance.delete(`/api/users/${userId}/letters`);
    if (response.data.result === "success") {
      alert("히스토리가 삭제되었습니다.");
      dialog_history.value = false;
    } else {
      console.error(response.data.message);
      alert("히스토리 삭제 실패");
    }
  } catch (error) {
    console.error(error);
    alert("히스토리 삭제 실패");
  }
}

onMounted(() => {
  fetchUserInfo();
});

const logoutConfirm = () => {
  dialog_logout.value = true;
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

.user-text {
  font-size: 16px;
  color: var(--main);
}

.setting-user {
  background-color: var(--light);
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-icon {
  font-size: 24px;
}



.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding-bottom: 20px;
  gap: 10px; /* 버튼 간격 */
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
  height: 60%; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
}

/* 다이얼로그 전체 스타일 */
.dialog-card {
  background-color: var(--light); /* 어두운 배경 */
  color: var(--main); /* 텍스트 흰색 */
  border-radius: 8px;
}

/* 다이얼로그 제목 */
.dialog-title {
  margin-top: 30px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--main);
  margin-bottom: 12px;
}

/* 다이얼로그 액션 영역 */
.dialog-actions {
  display: flex;
  justify-content: space-around; /* 버튼 간격 균일 */
  margin-top: 16px;
}

/* 다이얼로그 버튼 기본 스타일 */
.dialog-btn {
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
}

/* 확인 버튼 스타일 */
.confirm-btn {
  background-color: var(--mid);
  color: #ffffff; 
}

.confirm-btn:hover {
  color: var(--mid);
}

/* 취소 버튼 스타일 */
.cancel-btn {
  background-color: var(--mid);
  color: #ffffff; 
}

.cancel-btn:hover {
  color: var(--mid);
}


</style>

