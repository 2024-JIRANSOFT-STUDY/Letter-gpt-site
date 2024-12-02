<script setup></script>

<template>
  <div id="main-wrapper">
    <div id="main-box">
      <header>
        <img src="/src/assets/MainLogo.png" alt="logo" />
      </header>
      <main id="main-container">
        <slot name="children">
          <!-- 대체 컴포넌트 사용 가능 따라서 Loading 컴포넌트와 같은 것들을 사용할 수 있음 -->
        </slot>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  height: auto;
  overflow-y: scroll;
  // background-color: var(--dark);
}

#main-box {
}

#main-container {
  width: calc(100% - 240px);
  min-width: 768px;
  max-width: 1024px;
  margin: 0 auto;
}
</style>
