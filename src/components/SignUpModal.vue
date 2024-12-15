<template>
  <v-card class="modal-container">
    <v-form class="signup-form">
      <h2>SIGN UP</h2>
      <v-container class="field-container">
        <label>이름</label>
        <v-text-field
          class="signup-input custom-field"
          type="text"
          variant="outlined"
          v-model="name"
        />
      </v-container>
      <v-container class="field-container" style="padding-bottom: 0">
        <label>이메일</label>
        <v-text-field
          class="signup-input custom-field"
          type="text"
          variant="outlined"
          v-model="email"
          @input="onChangeEmailValue"
        />
      </v-container>
      <v-container style="display: flex; justify-content: flex-end;">
        <v-btn
          type="button"
          @click="checkEmailDuplicate"
          class="field-button custom-button"
          variant="outlined"
        >
          이메일 중복검사
        </v-btn>
      </v-container>
      <v-container class="field-container">
        <label>비밀번호</label>
        <v-text-field
          class="signup-input custom-field"
          type="password"
          variant="outlined"
          v-model="password"
        />
      </v-container>
      <v-container class="field-container">
        <label>비밀번호 확인</label>
        <v-text-field
          class="signup-input custom-field"
          type="password"
          variant="outlined"
          v-model="password_confirmation"
        />
      </v-container>
      <v-btn class="signup-button custom-button" type="submit" @click.prevent="signup">
        회원가입
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, inject } from "vue";
import axiosInstance from "../services/base";

const closeDialog = inject("closeDialog");
const setOpenSnackBar = inject("setOpenSnackBar");

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const isEmailAvailable = ref(null);

function validationEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return {
      message: "이메일 입력이 필요합니다.",
      isValid: false,
    }
  } else if (!emailRegex.test(email)) {
    return {
      message: "이메일 형식이 맞지 않습니다.",
      isValid: false,
    }
  } else {
    return {
      message: "",
      isValid: true,
    }
  }
}

function onChangeEmailValue () {
  isEmailAvailable.value = null;
}

const checkEmailDuplicate = async () => {
  const emailValue = email.value;
  const emailCheckValue = validationEmail(emailValue);
  if(!emailCheckValue.isValid) {
    setOpenSnackBar(emailCheckValue.message);
    return;
  }
  const body = {
    email: emailValue,
  }
  try {
    const response = await axiosInstance.post("/api/users/check-email", body);
    if(response.statusText === "OK") {
      setOpenSnackBar(response.data.message);
      isEmailAvailable.value = response.data.available;
    }
  } catch (error) {
    console.error(error);
  }
}

const signup = async () => {
  const body = {
      email: email.value,
      name: name.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
  };
  if (!isEmailAvailable.value) {
    setOpenSnackBar('이메일 중복체크가 필요합니다.');
    return;
  }
  try {
    const response = await axiosInstance.post("/api/users/register", body);
    if (response.statusText === "Created") {
      setOpenSnackBar("회원가입에 성공했습니다.");
      closeDialog();
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.modal-container {
  padding: 16px;
  background-color: var(--point);
}

.signup-form {
  display: flex;
  flex-direction: column;

  h2 {
    padding-left: 16px;
  }

  .field-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 24rem;
  }

  label {
    min-width: 6rem;
  }

  .signin-input {
    display: flex;
    flex: 1;

    & > :nth-child(n) {
      flex: 1;
    }

    .v-input__details {
      display: none;
    }
  }
}

.custom-button {
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.custom-button:hover :deep(.v-btn__overlay) {
  opacity: 0;
}

.field-button {
  flex: none;
}

.signup-button {
  align-self: center;
  border: 1px solid grey;
  border-radius: 8px;
  margin-top: 1rem;
  padding: 16px;
  height: auto;
  background-color: transparent;
  width: fit-content;
}
</style>
