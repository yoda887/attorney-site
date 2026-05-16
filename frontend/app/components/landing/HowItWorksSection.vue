<template>
  <section class="section how-it-works" id="how-it-works">
    <div class="container">
      <div class="text-center" style="margin-bottom: var(--space-12)">
        <h2 class="section-title">Як записатися на прийом</h2>
        <p class="section-subtitle" style="margin: 0 auto">Отримайте професійну допомогу за три прості кроки</p>
      </div>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3 class="step-title">Оберіть час</h3>
          <p class="step-desc">Виберіть зручну для вас дату та вільний час у нашому онлайн-календарі.</p>
        </div>
        <div class="step-line"></div>
        <div class="step-card">
          <div class="step-number">2</div>
          <h3 class="step-title">Заповніть форму</h3>
          <p class="step-desc">Вкажіть свої контактні дані та коротко опишіть суть вашої проблеми.</p>
        </div>
        <div class="step-line"></div>
        <div class="step-card">
          <div class="step-number">3</div>
          <h3 class="step-title">Очікуйте дзвінка</h3>
          <p class="step-desc">Ми зв'яжемося з вами для підтвердження зустрічі та уточнення деталей.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped>
.how-it-works {
  background: var(--color-bg-primary);
}

.steps-grid {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  position: relative;
}

.step-card {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.step-number {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-6);
  box-shadow: 0 0 20px rgba(201, 169, 78, 0.3);
}

.step-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.step-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.step-line {
  flex: 0.5;
  height: 2px;
  background: var(--color-border);
  margin-top: 32px; /* Half of step-number height */
  z-index: 1;
}

@media (max-width: 768px) {
  .steps-grid {
    flex-direction: column;
    align-items: center;
    gap: var(--space-8);
  }
  
  .step-line {
    display: none;
  }
}
</style>
