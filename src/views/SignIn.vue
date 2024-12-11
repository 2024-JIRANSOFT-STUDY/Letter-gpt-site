<template>
  <div>
    <SignInLayout>
      <template #signInForm>
        <SignInForm />
      </template>
      <template #signUpButton>
        <v-container class="signup-button-container">
          <span>회원이 아니신가요?</span>
          <v-dialog transition="dialog-bottom-transition" width="auto">
            <template v-slot:activator="{ props: activatorProps }">
              <span class="signup-button" v-bind="activatorProps">
                회원가입 하기
              </span>
            </template>
            <template #signUpModal>
              <SignUpModal />
            </template>
          </v-dialog>
        </v-container>
      </template>
    </SignInLayout>
  </div>
</template>

<script setup>
import SignInLayout from "@/components/Layout/SignInLayout.vue";
import SignInForm from "@/components/SignInForm.vue";
import SignUpModal from "@/components/SignUpModal.vue";
</script>

<style lang="scss" scoped>
.signup-button-container {
  text-align: center;
}

.signup-button {
  margin-left: 1rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
