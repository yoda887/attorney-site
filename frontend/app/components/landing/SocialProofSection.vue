<template>
  <section class="section social-proof-section" id="social-proof" role="region" aria-labelledby="social-title">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: var(--space-8)">
        <h2 class="section-title" id="social-title">{{ t('social.title') }}</h2>
        <p class="section-subtitle" style="margin: 0 auto">{{ t('social.subtitle') }}</p>
      </div>



      <!-- Cases grid -->
      <div class="cases-grid">
        <article
          v-for="(caseItem, i) in cases"
          :key="i"
          class="case-card reveal"
          :class="`delay-${i + 2}`"
        >
          <span class="case-tag">{{ t(caseItem.tagKey) }}</span>
          <div class="case-body">
            <div class="case-situation">
              <span class="case-label">Ситуація:</span>
              <p>{{ t(caseItem.situationKey) }}</p>
            </div>
            <div class="case-arrow" aria-hidden="true">→</div>
            <div class="case-result">
              <span class="case-label case-label--success">Результат:</span>
              <p>{{ t(caseItem.resultKey) }}</p>
            </div>
          </div>
          <div class="case-footer">
            <div class="case-stars" aria-label="5 зірок">★★★★★</div>
            <span class="case-author">{{ t(caseItem.authorKey) }}</span>
          </div>
        </article>
      </div>

      <!-- Terminal CTA (Gutenberg terminal area) -->
      <div class="social-cta reveal delay-5">
        <a href="#quiz" class="btn btn-primary btn-lg" id="social-cta">{{ t('social.cta') }}</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useReveal();

const cases = [
  {
    tagKey: 'social.case1.tag',
    situationKey: 'social.case1.situation',
    resultKey: 'social.case1.result',
    authorKey: 'social.case1.author',
  },
  {
    tagKey: 'social.case2.tag',
    situationKey: 'social.case2.situation',
    resultKey: 'social.case2.result',
    authorKey: 'social.case2.author',
  },
  {
    tagKey: 'social.case3.tag',
    situationKey: 'social.case3.situation',
    resultKey: 'social.case3.result',
    authorKey: 'social.case3.author',
  },
  {
    tagKey: 'social.case4.tag',
    situationKey: 'social.case4.situation',
    resultKey: 'social.case4.result',
    authorKey: 'social.case4.author',
  },
];
</script>

<style scoped>
.social-proof-section {
  background: var(--color-bg-primary);
}

.social-badges {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: var(--space-12);
}

.social-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-navy);
}

.social-badge--accent {
  background: var(--color-accent-bg);
  border-color: var(--color-border-accent);
  color: var(--color-accent-dark);
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.case-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  display: flex;
  flex-direction: column;
}

.case-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-3px);
}

.case-tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--color-navy);
  color: var(--color-text-inverse);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
  align-self: flex-start;
}

.case-body {
  flex: 1;
  margin-bottom: var(--space-4);
}

.case-label {
  display: block;
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-1);
}

.case-label--success {
  color: var(--color-success);
}

.case-situation p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--space-3);
}

.case-arrow {
  color: var(--color-accent);
  font-size: var(--text-xl);
  font-weight: 700;
  margin-bottom: var(--space-3);
}

.case-result p {
  font-size: var(--text-sm);
  color: var(--color-navy);
  font-weight: 600;
  line-height: 1.5;
}

.case-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
}

.case-stars {
  color: var(--color-accent);
  font-size: var(--text-base);
  letter-spacing: 2px;
}

.case-author {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .cases-grid {
    grid-template-columns: 1fr;
  }
}

.social-cta {
  display: flex;
  justify-content: center;
  margin-top: var(--space-12);
}
</style>
