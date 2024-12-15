<template>
  <div class="wrapper">
    <SignInLayout>
      <template #signInForm>
        <SignInForm />
      </template>
      <template #signUpButton>
        <v-container class="signup-button-container">
          <span>회원이 아니신가요?</span>
          <span class="signup-button" @click="dialog = true">
            회원가입 하기
          </span>
        </v-container>
      </template>
      <template #signUpModal>
        <v-dialog
          width="auto"
          v-model="dialog"
          min-width="500px"
          transition="dialog-bottom-transition"
        >
          <SignUpModal />
        </v-dialog>
      </template>
    </SignInLayout>
    <v-snackbar
      v-model="snackbar"
      :timeout=3000
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          닫기
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import SignInLayout from "@/components/Layout/SignInLayout.vue";
import SignInForm from "@/components/SignInForm.vue";
import SignUpModal from "@/components/SignUpModal.vue";
import { ref, provide } from "vue";

const dialog = ref(false);
const snackbar = ref(false);
const snackbarText = ref(false);

const closeDialog = () => {
  dialog.value = false;
}

const setOpenSnackBar = (text) => {
  snackbar.value = true;
  snackbarText.value = text;  
}

provide("closeDialog", closeDialog);
provide("setOpenSnackBar", setOpenSnackBar);
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}

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
