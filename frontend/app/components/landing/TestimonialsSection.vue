<template>
  <section class="section testimonials-section" id="testimonials">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: var(--space-12)">
        <h2 class="section-title">Відгуки клієнтів</h2>
        <p class="section-subtitle" style="margin: 0 auto">Що кажуть ті, чиї права ми успішно захистили</p>
      </div>
      <div class="carousel-wrapper reveal delay-2">
        <button class="carousel-btn carousel-prev" @click="prev" aria-label="Previous">‹</button>
        <div class="carousel-viewport" ref="viewportRef">
          <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="(testimonial, i) in testimonials" :key="i" class="carousel-slide">
              <div class="glass-card testimonial-card">
                <div class="testimonial-quote">"</div>
                <p class="testimonial-text">{{ testimonial.text }}</p>
                <div class="testimonial-footer">
                  <div class="testimonial-stars">★★★★★</div>
                  <div class="testimonial-author">{{ testimonial.author }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-btn carousel-next" @click="next" aria-label="Next">›</button>
      </div>
      <div class="carousel-dots">
        <button
          v-for="(_, i) in testimonials"
          :key="i"
          class="carousel-dot"
          :class="{ active: i === currentIndex }"
          @click="goTo(i)"
          :aria-label="`Go to slide ${i + 1}`"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useReveal();

const currentIndex = ref(0);
let autoplayInterval: ReturnType<typeof setInterval> | null = null;

const testimonials = [
  {
    text: 'Богдан Валерійович — справжній професіонал. Справа, яка здавалася безнадійною, була вирішена на мою користь. Дуже вдячна за підтримку!',
    author: '— Олена К.',
  },
  {
    text: 'Швидко, чітко і по суті. Отримав вичерпну консультацію щодо бізнес-спору, яка допомогла уникнути великих фінансових втрат.',
    author: '— Михайло П.',
  },
  {
    text: 'Звернувся за допомогою у сімейній справі. Адвокат підійшов до проблеми дуже делікатно та ефективно. Рекомендую всім знайомим.',
    author: '— Андрій В.',
  },
  {
    text: 'Чудовий спеціаліст у галузі нерухомості. Допоміг вирішити складну ситуацію з документами та уникнути потенційних проблем з купівлею квартири.',
    author: '— Ірина Д.',
  },
  {
    text: 'Дякую за професійний підхід до моєї справи. Результат перевершив усі очікування. Тепер рекомендую Богдана Валерійовича всім колегам.',
    author: '— Олександр Т.',
  },
];

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length;
  resetAutoplay();
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length;
  resetAutoplay();
};

const goTo = (index: number) => {
  currentIndex.value = index;
  resetAutoplay();
};

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.length;
  }, 5000);
};

const resetAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval);
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval);
});
</script>

<style scoped>
.testimonials-section {
  background: var(--color-bg-secondary);
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.carousel-viewport {
  overflow: hidden;
  flex: 1;
  border-radius: var(--radius-lg);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.carousel-slide {
  min-width: 100%;
  padding: 0 var(--space-2);
}

.testimonial-card {
  padding: var(--space-10) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.testimonial-card:hover {
  transform: none;
}

.testimonial-quote {
  font-family: var(--font-display);
  font-size: 4rem;
  color: var(--color-accent);
  line-height: 0.5;
  opacity: 0.3;
}

.testimonial-text {
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.8;
  font-size: var(--text-lg);
}

.testimonial-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.testimonial-stars {
  color: var(--color-accent);
  font-size: var(--text-xl);
  letter-spacing: 2px;
}

.testimonial-author {
  color: var(--color-text-primary);
  font-weight: 600;
}

.carousel-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-bg-glass);
  backdrop-filter: blur(10px);
  color: var(--color-text-secondary);
  font-size: var(--text-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  cursor: pointer;
}

.carousel-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 0 15px var(--color-accent-glow);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-8);
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: transparent;
  cursor: pointer;
  transition: all var(--transition-base);
}

.carousel-dot.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: 0 0 10px var(--color-accent-glow);
}

.carousel-dot:hover {
  border-color: var(--color-accent);
}

@media (max-width: 768px) {
  .carousel-btn { display: none; }
  .testimonial-card { padding: var(--space-6) var(--space-4); }
  .testimonial-text { font-size: var(--text-base); }
}
</style>
