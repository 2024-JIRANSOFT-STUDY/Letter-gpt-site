<template>
    <div v-show="showModal" class="modal-wrapper">
      <v-dialog v-model="showModal" max-width="500px" class="modal-container">
        <v-card>
          <v-card-title class="text-h5">{{ modalTitle }}</v-card-title>
          <v-card-text>
            {{ modalContent }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="custom-button" text @click="showModal = false">닫기</v-btn>
            <v-btn class="custom-button" text @click="confirm">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
let callbackConfirm = () => {};

const confirm = () => {
    callbackConfirm();
    showModal.value = false;
}

const setModal = (open, title, content, callback) => {
    showModal.value = open;
    modalTitle.value = title;
    modalContent.value = content;
    callbackConfirm = callback
}

const emit = defineEmits(['set-modal'])

emit('set-modal', setModal);

</script>
  
<style lang="scss" scoped>
.modal-wrapper {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 40;
}

.modal-container :deep(.v-overlay__content) {
    background-color: var(--mid);
}

.custom-button {
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
.custom-button:hover :deep(.v-btn__overlay) {
  opacity: 0;
}
</style>