<template>
  <v-form class="signin-form">
    <h2>SIGN IN</h2>
    <v-container class="field-container">
      <label>이메일</label>
      <v-text-field
        class="signin-input custom-field"
        type="text"
        variant="outlined"
        v-model="email"
      />
    </v-container>
    <v-container class="field-container">
      <label>비밀번호</label>
      <v-text-field
        class="signin-input custom-field"
        type="password"
        variant="outlined"
        v-model="password"
      />
    </v-container>
    <v-btn class="login-button" type="submit" @click.prevent="login">
      로그인
    </v-btn>
  </v-form>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const store = useStore();
const router = useRouter();

const login = async () => {
  try {
    const response = await store.dispatch("auth/login", {
      email: email._value,
      password: password._value,
    });
    router.push("/");
  } catch (error) {
    console.error(error);
    // TODO: 로그인 실패 메시지
  }
};
</script>

<style lang="scss" scoped>
.signin-form {
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  background-color: var(--point);
  border-radius: 24px;

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
    min-width: 4rem;
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

.login-button {
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
