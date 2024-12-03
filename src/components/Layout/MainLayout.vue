<script setup>
import { inject } from "vue";

const isExpanded = inject("isExpanded");
const toggleSidebar = inject("toggleSidebar");
</script>

<template>
  <div id="main-wrapper">
    <button v-if="!isExpanded" class="logo-btn" @click="toggleSidebar">
      <img src="@/assets/Letter_GPT_logo.png" alt="logo" />
    </button>
    <div id="main-box">
      <img src="/src/assets/MainLogo.png" alt="logo" />
      <main id="main-container">
        <div class="b-level-comment">
          <p>편지는 써야겠고 하지만 편지쓰기는 힘들 때가 있죠?</p>
          <p>글 솜씨가 없어서 편지의 초안을 만들기 힘들 때도 있죠?</p>
          <p>Lettery가 대신 편지를 작성해드립니다.</p>
          <p>
            각 입력폼에 맞게 넣어주시고, 상대와의 대화파일을 넣으면 말투를
            반영해 직접 작성한 것 같은 편지 생성합니다.
          </p>
        </div>
        <slot name="children">
          <!-- 대체 컴포넌트 사용 가능 따라서 Loading 컴포넌트와 같은 것들을 사용할 수 있음 -->
        </slot>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  height: auto;
  overflow-y: scroll;
  background-color: var(--main);
}

#main-box {
  text-align: center;
}

.b-level-comment {
  text-align: left;
  color: white;
  margin-left: 1rem;
  margin-bottom: 1.5rem;

  p {
    line-height: 1.5;
    word-break: keep-all;
  }
}

#main-container {
  width: calc(100% - 240px);
  min-width: 768px;
  max-width: 1024px;
  margin: 0 auto;
}
</style>
