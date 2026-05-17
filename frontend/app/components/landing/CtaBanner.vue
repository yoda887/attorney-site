<template>
  <section class="cta-section">
    <div class="cta-bg">
      <div class="cta-orb cta-orb-1"></div>
      <div class="cta-orb cta-orb-2"></div>
    </div>
    <div class="container cta-content reveal">
      <h2 class="cta-title">Потрібна юридична допомога?</h2>
      <p class="cta-subtitle">Запишіться на безкоштовну первинну консультацію та отримайте професійну оцінку вашої ситуації</p>
      <div class="cta-buttons">
        <a href="#appointment" class="btn btn-primary btn-lg">Записатися на консультацію</a>
        <a href="tel:+380501234567" class="btn btn-outline btn-lg">📞 +380 50 123 45 67</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useReveal();
</script>

<style scoped>
.cta-section {
  position: relative;
  padding: var(--space-24) 0;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, var(--color-bg-primary) 50%, rgba(212, 175, 55, 0.03) 100%);
}

.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.cta-orb-1 {
  width: 300px;
  height: 300px;
  background: rgba(212, 175, 55, 0.1);
  top: -100px;
  right: 10%;
}

.cta-orb-2 {
  width: 200px;
  height: 200px;
  background: rgba(212, 175, 55, 0.08);
  bottom: -80px;
  left: 20%;
}

.cta-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.cta-title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.cta-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 560px;
  margin: 0 auto var(--space-8);
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .cta-title { font-size: var(--text-3xl); }
}
</style>
