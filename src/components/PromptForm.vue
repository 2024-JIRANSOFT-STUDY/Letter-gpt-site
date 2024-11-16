<script setup>
import { reactive } from "vue";

const formData = reactive({
  receiver: "",
  situation: "normal",
  myAge: null,
  myGender: "male",
  friendly: null,
  essestialComment: "",
  toneFile: null,
});

const situationList = [
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

const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    formData.toneFile = selectedFile;
    console.log(formData.toneFile);
  }
};

const onSubmitForm = () => {
  console.log(JSON.stringify(formData));
};
</script>

<template>
  <div class="form-wrapper">
    <form>
      <div class="form-container">
        <label>상황선택</label>
        <select class="field" v-model="formData.situation">
          <option
            v-for="{ label, value } in situationList"
            :key="value"
            :value="value"
          >
            {{ label }}
          </option>
        </select>
        <label for="receiver">누구에게</label>
        <input
          type="text"
          class="field"
          v-model="formData.receiver"
          name="receiver"
        />
        <label for="myAge">본인나이</label>
        <input
          type="number"
          class="field"
          v-model="formData.myAge"
          name="myAge"
        />
        <label for="myGender">본인성별</label>
        <select class="field" v-model="formData.myGender" name="myGender">
          <option value="male">남</option>
          <option value="female">여</option>
        </select>
        <label for="friendly">친근함 정도</label>
        <input
          type="number"
          min="1"
          max="5"
          class="field"
          placeholder="1~5 사이 (높을 수록 친근합니다.)"
          v-model="formData.friendly"
          name="friendly"
        />
        <label for="essestialComment">필수내용</label>
        <textarea
          class="field text-area"
          v-model="formData.essestialComment"
          name="essestialComment"
        />
        <label for="toneFile">말투 파일</label>
        <input type="file" @change="onFileChange" name="toneFile" />
      </div>
      <div class="form-button-wrapper">
        <button class="form-button" type="submit" @click.prevent="onSubmitForm">
          편지생성
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  border: 1px solid grey;
  border-radius: 16px;
  padding: 12px;
  margin: 16px 8px;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 8px;
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
  padding: 8px 16px;
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
