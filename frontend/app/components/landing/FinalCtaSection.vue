<template>
  <section class="section final-cta-section" role="complementary" aria-label="Final call to action">
    <div class="container text-center reveal">
      <h2 class="final-cta-title">{{ t('final_cta.title') }}</h2>
      <a href="#quiz" class="btn btn-navy btn-lg final-cta-btn">{{ t('final_cta.button') }}</a>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useReveal();
</script>

<style scoped>
.final-cta-section {
  background: var(--color-accent);
  padding: var(--space-12) 0;
  position: relative;
  overflow: hidden;
}

.final-cta-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-inverse);
  margin-bottom: var(--space-6);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.final-cta-btn {
  background: var(--color-navy);
  color: var(--color-text-inverse);
  border-color: var(--color-navy);
  box-shadow: var(--shadow-md);
}

.final-cta-btn:hover {
  background: var(--color-navy-light);
  border-color: var(--color-navy-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
  .final-cta-title {
    font-size: var(--text-2xl);
  }
}
</style>
