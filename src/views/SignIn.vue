<template>
  <div>
    <SignInLayout>
      <template #signInForm>
        <SignInForm />
      </template>
      <template #signUpButton>
        <div>
          <span>회원이 아니신가요?</span>
          <span class="signup-button">회원가입 하기</span>
        </div>
      </template>
    </SignInLayout>
  </div>
</template>

<script setup>
import SignInLayout from "@/components/Layout/SignInLayout.vue";
import SignInForm from "@/components/SignInForm.vue";
</script>

<style lang="scss" scoped>
.signup-button {
  margin-left: 1rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
