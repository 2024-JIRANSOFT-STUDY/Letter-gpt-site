<template v-slot:default="{ isActive }">
  <v-card>
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
      <v-container class="field-container">
        <label>이메일</label>
        <v-text-field
          class="signup-input custom-field"
          type="text"
          variant="outlined"
          v-model="email"
        />
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
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import axiosInstance from "../services/base";

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");

const singup = async () => {
  try {
    console.log("a");
  } catch (error) {
    console.error(error);
  }
};
</script>
