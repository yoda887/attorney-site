<template>
  <section class="hero" id="hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-pattern"></div>
      <!-- Floating ambient shapes -->
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
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
        <div class="stat-card" ref="statsRef">
          <span class="stat-number">{{ animatedYears }}+</span>
          <span class="stat-label">{{ t('hero.experience') }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-card">
          <span class="stat-number">{{ animatedCases }}+</span>
          <span class="stat-label">{{ t('hero.cases') }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-card">
          <span class="stat-number">{{ animatedClients }}+</span>
          <span class="stat-label">{{ t('hero.clients') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

const animatedYears = ref(0);
const animatedCases = ref(0);
const animatedClients = ref(0);
const statsRef = ref<HTMLElement | null>(null);
const hasAnimated = ref(false);

const animateCounter = (target: number, ref: ReturnType<typeof import('vue')['ref']>, duration: number = 2000) => {
  const start = performance.now();
  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    ref.value = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true;
          animateCounter(15, animatedYears, 1500);
          animateCounter(500, animatedCases, 2000);
          animateCounter(1000, animatedClients, 2500);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (statsRef.value) {
    observer.observe(statsRef.value);
  }
});
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
  background: radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 60%),
              linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.03) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Floating ambient orbs */
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 20s ease-in-out infinite;
}

.hero-orb-1 {
  width: 400px;
  height: 400px;
  background: rgba(212, 175, 55, 0.08);
  top: 10%;
  left: 15%;
  animation-delay: 0s;
}

.hero-orb-2 {
  width: 300px;
  height: 300px;
  background: rgba(212, 175, 55, 0.06);
  bottom: 20%;
  right: 10%;
  animation-delay: -7s;
}

.hero-orb-3 {
  width: 200px;
  height: 200px;
  background: rgba(212, 175, 55, 0.05);
  top: 50%;
  left: 60%;
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -40px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(15px, 30px) scale(1.02); }
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-top: calc(var(--header-height) + var(--space-12));
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
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
  max-width: 600px;
  line-height: 1.7;
  margin: 0 auto var(--space-8);
}

.hero-buttons {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
}

.hero-stats {
  display: flex;
  gap: var(--space-12);
  margin-top: var(--space-16);
  justify-content: center;
  align-items: center;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  align-items: center;
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

.stat-divider {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, transparent, var(--color-border-accent), transparent);
}

@media (max-width: 768px) {
  .hero-title { font-size: var(--text-4xl); }
  .hero-subtitle { font-size: var(--text-lg); }
  .hero-stats { flex-direction: column; gap: var(--space-4); }
  .stat-divider { width: 48px; height: 1px; background: linear-gradient(to right, transparent, var(--color-border-accent), transparent); }
}

@media (max-width: 480px) {
  .hero-title { font-size: var(--text-3xl); }
}
</style>
