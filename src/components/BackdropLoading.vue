<script setup>
import { ref } from 'vue';

const isLoading = ref(false);

const setLoading = (state) => {
    isLoading.value = state;
}

const emit = defineEmits(['set-loading'])

emit('set-loading', setLoading)
</script>

<template>
    <div v-show="isLoading" class="loading-wrapper">
        <div class="loading-container">
            <v-progress-circular
                class="custom-progress"
                indeterminate
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.loading-wrapper {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
}

.loading-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
}

.custom-progress :deep(.v-progress-circular__overlay)  {
  color: #6a1e55;
}

.custom-progress :deep(.v-progress-circular__underlay) {
    stroke: none;
}

</style>