<template>
  <Transition name="fade">
    <button
      v-if="visible"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Повернутися до початку"
      title="Повернутися до початку"
    >
      ↑
    </button>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

if (import.meta.client) {
  window.addEventListener('scroll', () => {
    visible.value = window.scrollY > 400;
  });
}
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-navy);
  color: var(--color-text-inverse);
  border: 2px solid var(--color-navy);
  font-size: var(--text-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50;
  box-shadow: var(--shadow-md);
  transition: opacity var(--transition-base), transform var(--transition-base), background-color var(--transition-base);
}

.back-to-top:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
