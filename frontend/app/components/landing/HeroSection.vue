<template>
  <section class="hero" id="hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-pattern"></div>
    </div>
    <div class="container hero-content">
      <div class="hero-text animate-fade-in-up">
        <div class="hero-badge">⚖️ {{ t('about.name') }}</div>
        <h1 class="hero-title">{{ t('hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('hero.subtitle') }}</p>
        <div class="hero-buttons">
          <a href="#appointment" class="btn btn-primary btn-lg">{{ t('hero.cta') }}</a>
          <a href="#about" class="btn btn-outline btn-lg">{{ t('hero.cta2') }}</a>
        </div>
      </div>
      <div class="hero-stats animate-fade-in-up delay-3">
        <div class="stat-card">
          <span class="stat-number">15+</span>
          <span class="stat-label">{{ t('hero.experience') }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">500+</span>
          <span class="stat-label">{{ t('hero.cases') }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">1000+</span>
          <span class="stat-label">{{ t('hero.clients') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(201, 169, 78, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(74, 158, 255, 0.05) 0%, transparent 50%),
              linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(201, 169, 78, 0.03) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(201, 169, 78, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-top: calc(var(--header-height) + var(--space-12));
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-accent-glow);
  border: 1px solid var(--color-border-accent);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-6);
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--space-6);
  background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  max-width: 560px;
  line-height: 1.7;
  margin-bottom: var(--space-8);
}

.hero-buttons {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  gap: var(--space-8);
  margin-top: var(--space-16);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.stat-number {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-accent);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .hero-title { font-size: var(--text-4xl); }
  .hero-subtitle { font-size: var(--text-lg); }
  .hero-stats { flex-direction: column; gap: var(--space-4); }
}

@media (max-width: 480px) {
  .hero-title { font-size: var(--text-3xl); }
}
</style>
