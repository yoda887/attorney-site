<template>
  <section class="hero" id="hero" role="region" aria-labelledby="hero-title">
    <div class="container hero-content">
      <div class="hero-text animate-fade-in-up">
        <div class="hero-badge" role="status">
          {{ dynamicBadge }}
        </div>
        <h1 class="hero-title" id="hero-title">
          {{ dynamicTitle }}<br>
          <span class="hero-title-accent">{{ dynamicTitleAccent }}</span>
        </h1>
        <p class="hero-subtitle">{{ dynamicSubtitle }}</p>

        <!-- Specializations bullets -->
        <ul class="hero-specs" aria-label="Спеціалізації">
          <li v-for="(spec, i) in specs" :key="i" class="hero-spec-item">
            <svg class="spec-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1"/>
              <path d="M6 10l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ t(spec) }}
          </li>
        </ul>

        <div class="hero-buttons">
          <a href="#quiz" class="btn btn-primary btn-lg" id="hero-cta-primary">{{ t('hero.cta') }}</a>
        </div>
        <p class="hero-guarantee">{{ t('hero.guarantee') }}</p>

        <!-- Trust badges -->
        <div class="hero-trust-badges" aria-label="Довіра">
          <span class="trust-badge">🏛️ {{ t('social.badge.naau') }}</span>
          <span class="trust-badge">⭐ {{ t('social.badge.winrate') }}</span>
        </div>
      </div>

      <div class="hero-photo animate-fade-in-up delay-2">
        <div class="hero-photo-wrapper">
          <img
            :src="photoUrl"
            :alt="t('about.name')"
            class="hero-photo-img"
            width="480"
            height="600"
            loading="eager"
          />
          <div class="hero-photo-overlay"></div>
        </div>

        <!-- Stats on photo card -->
        <div class="hero-stats-card" ref="statsRef">
          <div class="stat-item">
            <span class="stat-number">{{ animatedYears }}+</span>
            <span class="stat-label">{{ t('hero.experience') }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ animatedCases }}+</span>
            <span class="stat-label">{{ t('hero.cases') }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ animatedClients }}+</span>
            <span class="stat-label">{{ t('hero.clients') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

const dynamicBadge = computed(() => {
  return route.query.utm_badge ? String(route.query.utm_badge) : t('hero.badge');
});

const dynamicTitle = computed(() => {
  return route.query.utm_title ? String(route.query.utm_title) : t('hero.title');
});

const dynamicTitleAccent = computed(() => {
  return route.query.utm_title_accent ? String(route.query.utm_title_accent) : t('hero.title.accent');
});

const dynamicSubtitle = computed(() => {
  return route.query.utm_subtitle ? String(route.query.utm_subtitle) : t('hero.subtitle');
});

const photoUrl = '/images/attorney-photo.png';

const specs = [
  'hero.spec1',
  'hero.spec2',
  'hero.spec3',
  'hero.spec4',
  'hero.spec5',
  'hero.spec6',
];

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
          animateCounter(12, animatedYears, 1500);
          animateCounter(157, animatedCases, 2000);
          animateCounter(342, animatedClients, 2500);
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
  background: var(--color-bg-primary);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -20%;
  width: 70%;
  height: 150%;
  background: radial-gradient(ellipse, var(--color-bg-secondary) 0%, transparent 70%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-top: calc(var(--header-height) + var(--space-12));
  padding-bottom: var(--space-12);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
}

/* Gutenberg Diagram: photo in primary optical area (left), text+CTA in terminal area (right) */
.hero-photo {
  order: -1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-accent-bg);
  border: 1px solid var(--color-border-accent);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-accent-dark);
  margin-bottom: var(--space-6);
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--space-6);
  color: var(--color-navy);
}

.hero-title-accent {
  color: var(--color-accent);
}

.hero-subtitle {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: var(--space-6);
}

/* Specialization bullets */
.hero-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2) var(--space-6);
  margin-bottom: var(--space-8);
  list-style: none;
  padding: 0;
}

.hero-spec-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.spec-check {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-accent);
}

.hero-buttons {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-3);
}

.hero-guarantee {
  font-size: var(--text-sm);
  color: var(--color-success);
  font-weight: 600;
  margin-bottom: var(--space-6);
}

.hero-trust-badges {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* Photo */
.hero-photo {
  position: relative;
}

.hero-photo-wrapper {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.hero-photo-img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 4/5;
  object-fit: cover;
}

.hero-photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to top, rgba(27, 42, 74, 0.4), transparent);
  pointer-events: none;
}

/* Stats card overlapping photo */
.hero-stats-card {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-6);
  align-items: center;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-6);
  box-shadow: var(--shadow-lg);
  white-space: nowrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-accent);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--color-border);
}

/* Responsive */
@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text {
    order: 1;
  }

  .hero-photo {
    order: 0;
    max-width: 400px;
    margin: 0 auto;
  }

  .hero-specs {
    justify-items: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-trust-badges {
    justify-content: center;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .hero-title { font-size: var(--text-4xl); }
  .hero-subtitle { font-size: var(--text-lg); }
  .hero-specs { grid-template-columns: 1fr; }

  .hero-stats-card {
    position: relative;
    bottom: 0;
    left: 0;
    transform: none;
    margin-top: var(--space-4);
    justify-content: center;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-title { font-size: var(--text-3xl); }

  .hero-stats-card {
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
  }

  .stat-divider {
    width: 48px;
    height: 1px;
  }
}
</style>
