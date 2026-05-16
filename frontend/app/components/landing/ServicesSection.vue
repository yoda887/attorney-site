<template>
  <section class="section" id="services">
    <div class="container reveal">
      <div class="text-center" style="margin-bottom: var(--space-12)">
        <h2 class="section-title">{{ t('services.title') }}</h2>
        <p class="section-subtitle" style="margin: 0 auto">{{ t('services.subtitle') }}</p>
      </div>
      <div class="services-grid">
        <div 
          v-for="(service, i) in services" 
          :key="i" 
          class="glass-card service-card reveal" 
          :class="`delay-${i + 1}`"
          @click="openModal(service)"
        >
          <div class="service-icon">{{ service.icon }}</div>
          <h3 class="service-title">{{ t(service.titleKey) }}</h3>
          <p class="service-desc">{{ t(service.descKey) }}</p>
          <div class="service-action">Дізнатися більше &rarr;</div>
        </div>
      </div>
    </div>

    <!-- Service Modal -->
    <div v-if="selectedService" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="modal-icon">{{ selectedService.icon }}</div>
        <h3 class="modal-title">{{ t(selectedService.titleKey) }}</h3>
        <p class="modal-desc">{{ t(selectedService.descKey) }}</p>
        <div class="modal-footer">
          <a href="#appointment" class="btn btn-primary" @click="closeModal">Записатися на консультацію</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

onMounted(() => {
  useReveal();
});

const selectedService = ref<any>(null);

const openModal = (service: any) => {
  selectedService.value = service;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedService.value = null;
  document.body.style.overflow = '';
};

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
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
  border-color: var(--color-accent);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
  transition: transform var(--transition-fast);
}

.service-card:hover .service-icon {
  transform: scale(1.1);
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
  flex-grow: 1;
}

.service-action {
  margin-top: var(--space-4);
  color: var(--color-accent);
  font-size: var(--text-sm);
  font-weight: 600;
  opacity: 0;
  transform: translateY(10px);
  transition: all var(--transition-base);
}

.service-card:hover .service-action {
  opacity: 1;
  transform: translateY(0);
}

/* Modal specific styles */
.modal-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  font-size: var(--text-2xl);
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.modal-close:hover {
  color: var(--color-text-primary);
}

.modal-content {
  position: relative;
  text-align: center;
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}

.modal-title {
  font-size: var(--text-2xl);
  font-family: var(--font-display);
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.modal-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-8);
}

.modal-footer {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; }
}
</style>
