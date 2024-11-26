<script setup>
import { inject } from "vue";

const isExpanded = inject("isExpanded");
const toggleSidebar = inject("toggleSidebar");
</script>

<template>
  <div id="main-wrapper">
    <header>
      <button v-if="!isExpanded" class="logo-btn" @click="toggleSidebar">
        <img src="@/assets/Letter_GPT_logo.png" alt="logo" />
      </button>
      <h1>LetterGPT</h1>
    </header>
    <main id="main-container">
      <slot name="children">
        <!-- 대체 컴포넌트 사용 가능 따라서 Loading 컴포넌트와 같은 것들을 사용할 수 있음 -->
      </slot>
    </main>
  </div>
</template>

<style scoped>
header {
  text-align: center;
  position: relative;
}

h1 {
  font-size: 48px;
  font-weight: 600;
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

#main-wrapper {
  position: relative;
  width: 100%;
}

#main-container {
  width: calc(100% - 240px);
  min-width: 768px;
  margin: 0 auto;
}
</style>