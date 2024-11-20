<script setup></script>

<template>
  <div id="main-wrapper">
    <header>
      <h1>LetterGTP</h1>
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
}

h1 {
  font-size: 48px;
  font-weight: 600;
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
