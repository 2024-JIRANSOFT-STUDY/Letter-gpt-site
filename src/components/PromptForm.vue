<script setup>
import { reactive, computed, inject } from "vue";
import { useStore } from "vuex";
import axiosInstance from "@/services/base";
import { useRouter } from "vue-router";

const store = useStore();

const userInfo = computed(() => store.getters["auth/getUserId"]);;

const setLoading = inject('setLoading');
const setModal = inject('setModal');

const router = useRouter();

const formData = reactive({
  receiver: "",
  situation: "normal",
  my_age: null,
  my_gender: "male",
  friendly: null,
  essestial_comment: "",
  tone_file: null,
});

const situationListData = [
  { label: "그냥 편지 쓰고 싶어서", value: "normal" },
  { label: "생일", value: "birthday" },
  { label: "결혼", value: "marriage" },
  { label: "부고", value: "obituary" },
  { label: "취업", value: "employment" },
  { label: "졸업", value: "graduate" },
  { label: "입학", value: "entrance" },
  { label: "기념일", value: "anniversary" },
  { label: "기타", value: "etc" },
];

const GenderListData = [
  { label: "남", value: "male" },
  { label: "여", value: "female" },
];

const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    formData.tone_file = selectedFile;
    console.log(formData.tone_file);
  }
};

const onSubmitForm = async () => {
  setLoading(true);
  const userId = userInfo.value
  if (!userId) {
    setModal(true, '로그인 필요', '로그인이 필요합니다. 로그인 하러 갈까요?', () => router.push('/signIn'));
    setLoading(false);
    return;
  }
  try {
    const response = await axiosInstance.post(`/api/users/${userId}/letters`, formData);
    if (response.statusText === "Created") {
      setModal(true, '편지 생성 완료', '편지가 생성됐어요! 확인하러 갈까요?', () => router.push(`/result/${response.data.data.id}`))
    }
  } catch (error) {
    console.error(error);
    const errorResponse = error.response;
    if(errorResponse.data.message === "Validation error") {
      setModal(true, '편지 생성 에러', '필수 입력값을 입력해주세요.', () => {});
    } else {
      setModal(true, '편지 생성 에러', '알 수 없는 에러입니다. 다시 시도해주세요.', () => {});  
    }
  } finally {
    setLoading(false);
  }
};
</script>

<template>
  <v-sheet class="form-wrapper">
    <v-form>
      <v-container class="form-container">
        <label>상황선택</label>
        <v-select
          v-model="formData.situation"
          label="상황 선택"
          variant="outlined"
          :items="situationListData"
          item-title="label"
          item-value="value"
          :menu-props="{ contentClass: 'custom-v-list-item-list' }"
          class="custom-field"
        />
        <label for="receiver">누구에게</label>
        <v-text-field
          type="text"
          v-model="formData.receiver"
          label="Label"
          variant="outlined"
          name="receiver"
          class="custom-field"
        />
        <label for="myAge">본인나이</label>
        <v-text-field
          type="number"
          v-model="formData.my_age"
          name="myAge"
          variant="outlined"
          class="custom-field"
        />
        <label for="myGender">본인성별</label>
        <v-select
          v-model="formData.my_gender"
          label="본인성별"
          variant="outlined"
          :items="GenderListData"
          item-title="label"
          item-value="value"
          :menu-props="{ contentClass: 'custom-v-list-item-list' }"
          class="custom-field"
        />
        <label for="friendly">친근함 정도</label>
        <v-text-field
          type="number"
          min="1"
          max="5"
          label="(1 - 5 사이)"
          class="custom-field"
          variant="outlined"
          v-model="formData.friendly"
          name="friendly"
        />
        <label for="essestialComment">필수내용</label>
        <v-textarea
          class="custom-field"
          variant="outlined"
          label="필수내용"
          v-model="formData.essestial_comment"
          name="essestialComment"
        />
        <label for="toneFile">말투 파일</label>
        <v-file-input
          type="file"
          variant="outlined"
          @change="onFileChange"
          name="tone_file"
          class="custom-field-file"
          label="파일을 넣어주세요"
        />
      </v-container>
      <div class="form-button-wrapper">
        <v-btn class="form-button" type="submit" @click.prevent="onSubmitForm">
          편지생성
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style lang="scss" scoped>
.form-wrapper {
  border: 4px solid var(--point);
  border-radius: 16px;
  padding: 18px;
  margin: 0 8px;
  background: var(--point);
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px 8px;
  align-items: center;
  margin-bottom: 8px;
}

.field {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.field:focus {
  border-color: #007bff;
}

.text-area {
  resize: none;
  min-height: 8rem;
}

.form-button-wrapper {
  display: flex;
  justify-content: center;
}

.form-button {
  align-self: center;
  border: 1px solid grey;
  border-radius: 8px;
  font-size: 1.25rem;
  padding: 16px;
  height: auto;
  background-color: transparent;
  width: fit-content;
}

.form-button:hover {
  background-color: rgba(212, 212, 212, 0.6);
  cursor: pointer;
}

.form-button:active {
  background-color: rgba(212, 212, 212, 0.8);
}
</style>

<style lang="scss">
.custom-field-file {
  .v-input__prepend {
    display: none;
    margin: 0 !important;
  }

  .v-input__details {
    display: none;
  }
}

.custom-field {
  .v-input__details {
    display: none;
  }
}

.custom-v-list-item-list {
  .v-list {
    background-color: var(--point) !important;
  }
}
</style>
