<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header-inner container">
      <NuxtLink to="/" class="logo">
        <span class="logo-icon">⚖️</span>
        <span class="logo-text">Меркович <span class="logo-accent">Б.В.</span></span>
      </NuxtLink>

      <nav class="nav-desktop" v-if="!isDashboard">
        <a href="#services" class="nav-link">{{ t('nav.services') }}</a>
        <a href="#about" class="nav-link">{{ t('nav.about') }}</a>
        <a href="#appointment" class="nav-link">{{ t('nav.appointment') }}</a>
        <a href="#contacts" class="nav-link">{{ t('nav.contacts') }}</a>
      </nav>

      <div class="header-actions">
        <button class="lang-toggle" @click="toggleLocale" :title="locale === 'uk' ? 'Switch to English' : 'Українською'">
          {{ locale === 'uk' ? 'EN' : 'UA' }}
        </button>

        <template v-if="isAuthenticated">
          <NuxtLink to="/dashboard" class="btn btn-ghost btn-sm">{{ t('nav.dashboard') }}</NuxtLink>
          <button @click="logout" class="btn btn-ghost btn-sm">{{ t('nav.logout') }}</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="btn btn-outline btn-sm">{{ t('nav.login') }}</NuxtLink>
        </template>

        <button class="mobile-menu-btn" @click="mobileOpen = !mobileOpen" aria-label="Menu">
          <span :class="{ open: mobileOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="mobile-menu">
        <template v-if="!isDashboard">
          <a href="#services" class="mobile-link" @click="mobileOpen = false">{{ t('nav.services') }}</a>
          <a href="#about" class="mobile-link" @click="mobileOpen = false">{{ t('nav.about') }}</a>
          <a href="#appointment" class="mobile-link" @click="mobileOpen = false">{{ t('nav.appointment') }}</a>
          <a href="#contacts" class="mobile-link" @click="mobileOpen = false">{{ t('nav.contacts') }}</a>
        </template>
        <template v-if="isAuthenticated">
          <NuxtLink to="/dashboard" class="mobile-link" @click="mobileOpen = false">{{ t('nav.dashboard') }}</NuxtLink>
          <button class="mobile-link" @click="logout(); mobileOpen = false">{{ t('nav.logout') }}</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="mobile-link" @click="mobileOpen = false">{{ t('nav.login') }}</NuxtLink>
        </template>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n();
const { isAuthenticated, logout } = useAuth();
const route = useRoute();

const isScrolled = ref(false);
const mobileOpen = ref(false);
const isDashboard = computed(() => route.path.startsWith('/dashboard'));

const toggleLocale = () => {
  setLocale(locale.value === 'uk' ? 'en' : 'uk');
};

if (import.meta.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20;
  });
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  transition: all var(--transition-base);
  background: transparent;
  border-bottom: 1px solid transparent;
}

.header.scrolled {
  background: rgba(10, 10, 12, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: var(--color-border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: var(--text-lg);
}

.logo-icon {
  font-size: var(--text-2xl);
}

.logo-accent {
  color: var(--color-accent);
}

.nav-desktop {
  display: flex;
  gap: var(--space-6);
}

.nav-link {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: color var(--transition-fast);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-accent);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.lang-toggle {
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: all var(--transition-fast);
}

.lang-toggle:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.mobile-menu-btn {
  display: none;
  width: 32px;
  height: 32px;
  position: relative;
}

.mobile-menu-btn span,
.mobile-menu-btn span::before,
.mobile-menu-btn span::after {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-text-primary);
  transition: all var(--transition-fast);
  position: absolute;
  left: 6px;
}

.mobile-menu-btn span { top: 15px; }
.mobile-menu-btn span::before { content: ''; top: -6px; }
.mobile-menu-btn span::after { content: ''; top: 6px; }

.mobile-menu-btn span.open { background: transparent; }
.mobile-menu-btn span.open::before { transform: rotate(45deg); top: 0; }
.mobile-menu-btn span.open::after { transform: rotate(-45deg); top: 0; }

.mobile-menu {
  position: absolute;
  top: var(--header-height);
  left: 0;
  right: 0;
  background: rgba(10, 10, 12, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.mobile-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  border-radius: var(--radius-md);
  text-decoration: none;
  text-align: left;
  width: 100%;
  transition: all var(--transition-fast);
}

.mobile-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-accent);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-desktop { display: none; }
  .mobile-menu-btn { display: block; }
}
</style>
