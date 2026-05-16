<template>
  <div class="profile-card glass-card">
    <div class="profile-header">
      <div class="avatar-placeholder">{{ user?.fullName?.[0] || 'U' }}</div>
      <div>
        <h2 class="profile-name">{{ user?.fullName || 'User' }}</h2>
        <p class="profile-email">{{ user?.email || '' }}</p>
      </div>
    </div>
    <div class="profile-stats">
      <div class="stat-item">
        <span class="stat-value">{{ appointmentCount }}</span>
        <span class="stat-label">{{ t('dashboard.appointments') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ documentCount }}</span>
        <span class="stat-label">{{ t('dashboard.documents') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { user } = useAuth();

defineProps({
  appointmentCount: { type: Number, default: 0 },
  documentCount: { type: Number, default: 0 }
});
</script>

<style scoped>
.profile-card {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.avatar-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-2xl);
  font-family: var(--font-display);
  font-weight: 700;
}

.profile-name {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.profile-email {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.profile-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-4);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-accent);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
