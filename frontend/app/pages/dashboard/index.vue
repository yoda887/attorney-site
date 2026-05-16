<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="dashboard-home">
        <h1 class="page-title">{{ t('dashboard.welcome') }}, {{ user?.fullName || '' }}!</h1>

        <div class="profile-section" style="margin-bottom: var(--space-8)">
          <ProfileCard :appointmentCount="appointmentCount" :documentCount="documentCount" />
        </div>

        <div class="quick-actions">
          <NuxtLink to="/dashboard/appointments" class="btn btn-primary">
            {{ t('dashboard.newAppointment') }}
          </NuxtLink>
          <NuxtLink to="/dashboard/documents" class="btn btn-outline">
            {{ t('dashboard.documents') }}
          </NuxtLink>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { t } = useI18n();
const { user, accessToken } = useAuth();

const appointmentCount = ref(0);
const documentCount = ref(0);

onMounted(async () => {
  try {
    const headers: Record<string, string> = {};
    if (accessToken.value) headers['Authorization'] = `Bearer ${accessToken.value}`;

    const [apps, docs]: any[] = await Promise.all([
      $fetch('/api/appointments', { headers }),
      $fetch('/api/documents', { headers }),
    ]);
    appointmentCount.value = apps.length;
    documentCount.value = docs.length;
  } catch {}
});
</script>

<style scoped>
.dashboard-home {
  max-width: 800px;
}

.page-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  margin-bottom: var(--space-8);
}

.quick-actions {
  display: flex;
  gap: var(--space-4);
}
</style>
