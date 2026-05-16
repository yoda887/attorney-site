<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-icon">⚖️</span>
            <span class="logo-text">Меркович <span class="text-accent">Б.В.</span></span>
          </div>
          <p class="footer-desc">{{ t('about.description').slice(0, 120) }}...</p>
        </div>
        <div class="footer-links">
          <h4>{{ t('nav.services') }}</h4>
          <a href="#services">{{ t('services.criminal') }}</a>
          <a href="#services">{{ t('services.civil') }}</a>
          <a href="#services">{{ t('services.family') }}</a>
          <a href="#services">{{ t('services.business') }}</a>
        </div>
        <div class="footer-links">
          <h4>{{ t('contact.title') }}</h4>
          <p>{{ t('contact.address.text') }}</p>
          <p>+380 50 123 45 67</p>
          <p>info@merkovich.law</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped>
.footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--space-16) 0 var(--space-8);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

.footer-brand .logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
}

.logo-icon { font-size: var(--text-2xl); }

.footer-desc {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  line-height: 1.7;
}

.footer-links h4 {
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
}

.footer-links a,
.footer-links p {
  display: block;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin-bottom: var(--space-2);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-accent);
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-6);
  text-align: center;
}

.footer-bottom p {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}
</style>
