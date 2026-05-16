<template>
  <section class="section testimonials-section" id="testimonials">
    <div class="container">
      <div class="text-center" style="margin-bottom: var(--space-12)">
        <h2 class="section-title">Відгуки клієнтів</h2>
        <p class="section-subtitle" style="margin: 0 auto">Що кажуть ті, чиї права ми успішно захистили</p>
      </div>
      <div class="testimonials-grid">
        <div class="glass-card testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"Богдан Валерійович — справжній професіонал. Справа, яка здавалася безнадійною, була вирішена на мою користь. Дуже вдячна за підтримку!"</p>
          <div class="testimonial-author">- Олена К.</div>
        </div>
        <div class="glass-card testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"Швидко, чітко і по суті. Отримав вичерпну консультацію щодо бізнес-спору, яка допомогла уникнути великих фінансових втрат."</p>
          <div class="testimonial-author">- Михайло П.</div>
        </div>
        <div class="glass-card testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"Звернувся за допомогою у сімейній справі. Адвокат підійшов до проблеми дуже делікатно та ефективно. Рекомендую всім знайомим."</p>
          <div class="testimonial-author">- Андрій В.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Mockup component
</script>

<style scoped>
.testimonials-section {
  background: var(--color-bg-secondary);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.testimonial-card {
  padding: var(--space-8) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.testimonial-stars {
  color: var(--color-accent);
  font-size: var(--text-xl);
  letter-spacing: 2px;
}

.testimonial-text {
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.6;
  flex-grow: 1;
}

.testimonial-author {
  color: var(--color-text-primary);
  font-weight: 600;
  text-align: right;
  margin-top: var(--space-4);
}

@media (max-width: 768px) {
  .testimonials-grid { grid-template-columns: 1fr; }
}
</style>
