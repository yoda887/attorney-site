<template>
  <section class="section" id="contacts">
    <div class="container">
      <h2 class="section-title text-center">{{ t('contact.title') }}</h2>
      <div class="contact-grid">
        <div class="glass-card contact-card">
          <div class="contact-icon">📍</div>
          <h3>{{ t('contact.address') }}</h3>
          <p>{{ t('contact.address.text') }}</p>
        </div>
        <div class="glass-card contact-card">
          <div class="contact-icon">📞</div>
          <h3>{{ t('contact.phone') }}</h3>
          <p>+380 50 123 45 67</p>
        </div>
        <div class="glass-card contact-card">
          <div class="contact-icon">✉️</div>
          <h3>{{ t('contact.email') }}</h3>
          <p>info@merkovich.law</p>
        </div>
        <div class="glass-card contact-card">
          <div class="contact-icon">🕐</div>
          <h3>{{ t('contact.schedule') }}</h3>
          <p>{{ t('contact.schedule.weekdays') }}</p>
          <p>{{ t('contact.schedule.saturday') }}</p>
          <p>{{ t('contact.schedule.sunday') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-12);
}

.contact-card {
  text-align: center;
  padding: var(--space-8) var(--space-4);
}

.contact-icon {
  font-size: 2rem;
  margin-bottom: var(--space-4);
}

.contact-card h3 {
  font-size: var(--text-base);
  font-weight: 600;
  margin-bottom: var(--space-3);
  color: var(--color-accent);
}

.contact-card p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .contact-grid { grid-template-columns: 1fr; }
}
</style>
