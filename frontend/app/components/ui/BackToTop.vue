<template>
  <Transition name="fade-up">
    <button v-if="isVisible" class="back-to-top" @click="scrollToTop" aria-label="Back to top">
      <span class="back-to-top-icon">↑</span>
    </button>
  </Transition>
</template>

<script setup lang="ts">
const isVisible = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

if (import.meta.client) {
  window.addEventListener('scroll', () => {
    isVisible.value = window.scrollY > 400;
  });
}
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  z-index: 90;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--color-border-accent);
  background: rgba(10, 10, 12, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--color-accent);
  font-size: var(--text-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.back-to-top:hover {
  background: var(--color-accent);
  color: var(--color-bg-primary);
  box-shadow: 0 4px 20px var(--color-accent-glow);
  transform: translateY(-3px);
}

.back-to-top-icon {
  font-weight: 700;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
