<template>
  <section class="section empathy-section" id="empathy" role="region" aria-labelledby="empathy-title">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: var(--space-12)">
        <h2 class="section-title" id="empathy-title">{{ t('empathy.title') }}</h2>
        <p class="section-subtitle" style="margin: 0 auto">{{ t('empathy.subtitle') }}</p>
      </div>

      <div class="empathy-grid">
        <!-- Row 1: Icon Left, Text Right (Z-pattern) -->
        <div class="empathy-card reveal delay-1">
          <div class="empathy-icon-wrapper">
            <svg class="empathy-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.08"/>
              <path d="M24 14v10l6 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="24" cy="24" r="11" stroke="currentColor" stroke-width="2"/>
              <path d="M20 20h0M28 20h0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M19 28c1 2 3 3 5 3s4-1 5-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
            </svg>
          </div>
          <div class="empathy-text">
            <h3>{{ t('empathy.fear.title') }}</h3>
            <p>{{ t('empathy.fear.desc') }}</p>
            <p class="empathy-loss">⚠️ {{ t('empathy.fear.loss') }}</p>
          </div>
        </div>

        <!-- Row 2: Text Left, Icon Right -->
        <div class="empathy-card empathy-card--reversed reveal delay-2">
          <div class="empathy-icon-wrapper">
            <svg class="empathy-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.08"/>
              <rect x="14" y="20" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M14 24h20M20 24v10M28 24v10" stroke="currentColor" stroke-width="2"/>
              <circle cx="24" cy="16" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="empathy-text">
            <h3>{{ t('empathy.stress.title') }}</h3>
            <p>{{ t('empathy.stress.desc') }}</p>
            <p class="empathy-loss">⚠️ {{ t('empathy.stress.loss') }}</p>
          </div>
        </div>

        <!-- Row 3: Icon Left, Text Right -->
        <div class="empathy-card reveal delay-3">
          <div class="empathy-icon-wrapper">
            <svg class="empathy-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.08"/>
              <circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M24 18v6l4 3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M16 14l-2-2M32 14l2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="empathy-text">
            <h3>{{ t('empathy.time.title') }}</h3>
            <p>{{ t('empathy.time.desc') }}</p>
            <p class="empathy-loss">⚠️ {{ t('empathy.time.loss') }}</p>
          </div>
        </div>

        <!-- Row 4: Text Left, Icon Right -->
        <div class="empathy-card empathy-card--reversed reveal delay-4">
          <div class="empathy-icon-wrapper">
            <svg class="empathy-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.08"/>
              <path d="M24 14l2.5 5 5.5.8-4 3.9.9 5.3-4.9-2.6L19.1 29l.9-5.3-4-3.9 5.5-.8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M16 34c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="empathy-text">
            <h3>{{ t('empathy.trust.title') }}</h3>
            <p>{{ t('empathy.trust.desc') }}</p>
            <p class="empathy-loss">⚠️ {{ t('empathy.trust.loss') }}</p>
          </div>
        </div>
      </div>

      <div class="empathy-cta reveal delay-5">
        <a href="#quiz" class="btn btn-primary btn-lg" id="empathy-cta">
          {{ t('empathy.solution') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useReveal();
</script>

<style scoped>
.empathy-section {
  background: var(--color-bg-secondary);
}

.empathy-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 800px;
  margin: 0 auto;
}

.empathy-card {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-8);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.empathy-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.empathy-card--reversed {
  flex-direction: row-reverse;
}

.empathy-icon-wrapper {
  flex-shrink: 0;
}

.empathy-icon {
  width: 64px;
  height: 64px;
  color: var(--color-accent);
}

.empathy-text h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-navy);
  margin-bottom: var(--space-2);
}

.empathy-text p {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.empathy-loss {
  margin-top: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: rgba(197, 48, 48, 0.06);
  border-left: 3px solid var(--color-error);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: var(--text-sm) !important;
  font-weight: 600;
  color: var(--color-error) !important;
  line-height: 1.5;
}

.empathy-cta {
  text-align: center;
  margin-top: var(--space-12);
}

@media (max-width: 768px) {
  .empathy-card,
  .empathy-card--reversed {
    flex-direction: column;
    text-align: center;
    padding: var(--space-6) var(--space-4);
  }

  .empathy-icon {
    width: 56px;
    height: 56px;
  }
}
</style>
