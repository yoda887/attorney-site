<template>
  <div class="dashboard-layout">
    <AppHeader />
    <div class="dashboard-container">
      <aside class="dashboard-sidebar">
        <nav class="sidebar-nav">
          <NuxtLink
            v-for="item in sidebarItems"
            :key="item.path"
            :to="item.path"
            class="sidebar-link"
            :class="{ active: route.path === item.path }"
          >
            <span class="sidebar-icon" v-html="item.icon"></span>
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </aside>
      <div class="dashboard-content">
        <main>
          <slot />
        </main>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { isAdmin } = useAuth();
const route = useRoute();

const sidebarItems = computed(() => {
  const items = [
    { path: '/dashboard', label: t('dashboard.title'), icon: '⬛' },
    { path: '/dashboard/appointments', label: t('dashboard.appointments'), icon: '📅' },
    { path: '/dashboard/documents', label: t('dashboard.documents'), icon: '📄' },
  ];

  if (isAdmin.value) {
    items.push(
      { path: '/dashboard/admin', label: t('admin.title'), icon: '⚙️' },
      { path: '/dashboard/admin/clients', label: t('admin.clients'), icon: '👥' },
      { path: '/dashboard/admin/schedule', label: t('admin.schedule'), icon: '🕐' },
    );
  }

  return items;
});
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-container {
  display: flex;
  flex: 1;
  padding-top: var(--header-height);
}

.dashboard-sidebar {
  width: 260px;
  background: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border);
  padding: var(--space-6) 0;
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  overflow-y: auto;
  z-index: 10;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: 0 var(--space-3);
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.sidebar-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-primary);
}

.sidebar-link.active {
  background: var(--color-accent-glow);
  color: var(--color-accent);
}

.sidebar-icon {
  font-size: var(--text-lg);
  width: 24px;
  text-align: center;
}

.dashboard-content {
  flex: 1;
  margin-left: 260px;
  padding: var(--space-8);
  min-height: calc(100vh - var(--header-height));
}

@media (max-width: 768px) {
  .dashboard-sidebar {
    display: none;
  }

  .dashboard-content {
    margin-left: 0;
    padding: var(--space-4);
  }
}
</style>
