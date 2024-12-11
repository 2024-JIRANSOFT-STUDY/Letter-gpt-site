<script setup>
import SignInForm from "../SignInForm.vue";
</script>

<template>
  <main class="wrapper">
    <v-sheet class="container">
      <a href="/">
        <img
          src="@/assets/MainLogo.png"
          alt="logo"
          width="250px"
          height="150px"
        />
      </a>
      <slot name="signInForm"></slot>
      <slot name="signUpButton"></slot>
    </v-sheet>
    <slot name="signUpModal"></slot>
  </main>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 4rem;
}
</style>
