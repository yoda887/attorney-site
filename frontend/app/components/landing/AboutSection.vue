<template>
  <section class="section about-section" id="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-image">
          <div class="about-image-placeholder">
            <span class="about-avatar">⚖️</span>
            <p>{{ t('about.name') }}</p>
          </div>
        </div>
        <div class="about-content">
          <h2 class="section-title">{{ t('about.title') }}</h2>
          <h3 class="about-name">{{ t('about.name') }}</h3>
          <p class="about-desc">{{ t('about.description') }}</p>
          <div class="about-details">
            <div class="about-detail">
              <span class="detail-icon">🎓</span>
              <div>
                <strong>{{ t('about.education') }}</strong>
                <p>{{ t('about.education.text') }}</p>
              </div>
            </div>
            <div class="about-detail">
              <span class="detail-icon">📜</span>
              <div>
                <strong>{{ t('about.license') }}</strong>
                <p>{{ t('about.license.text') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped>
.about-section {
  background: var(--color-bg-secondary);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--space-12);
  align-items: center;
}

.about-image-placeholder {
  aspect-ratio: 3/4;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.about-avatar {
  font-size: 5rem;
}

.about-image-placeholder p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.about-name {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.about-desc {
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-8);
}

.about-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.about-detail {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.detail-icon {
  font-size: var(--text-xl);
  margin-top: 2px;
}

.about-detail strong {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.about-detail p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; }
}
</style>
