<template>
  <section class="section" id="services">
    <div class="container">
      <div class="text-center" style="margin-bottom: var(--space-12)">
        <h2 class="section-title">{{ t('services.title') }}</h2>
        <p class="section-subtitle" style="margin: 0 auto">{{ t('services.subtitle') }}</p>
      </div>
      <div class="services-grid">
        <div v-for="(service, i) in services" :key="i" class="glass-card service-card" :class="`delay-${i + 1}`">
          <div class="service-icon">{{ service.icon }}</div>
          <h3 class="service-title">{{ t(service.titleKey) }}</h3>
          <p class="service-desc">{{ t(service.descKey) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

const services = [
  { icon: '🔒', titleKey: 'services.criminal', descKey: 'services.criminal.desc' },
  { icon: '📋', titleKey: 'services.civil', descKey: 'services.civil.desc' },
  { icon: '👨‍👩‍👧', titleKey: 'services.family', descKey: 'services.family.desc' },
  { icon: '🏢', titleKey: 'services.business', descKey: 'services.business.desc' },
  { icon: '🏠', titleKey: 'services.realestate', descKey: 'services.realestate.desc' },
  { icon: '💬', titleKey: 'services.consultation', descKey: 'services.consultation.desc' },
];
</script>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.service-card {
  text-align: center;
  padding: var(--space-8) var(--space-6);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
}

.service-title {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-3);
  color: var(--color-text-primary);
}

.service-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; }
}
</style>
