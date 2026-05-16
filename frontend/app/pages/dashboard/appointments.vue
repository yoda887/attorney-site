<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="appointments-page">
        <div class="page-header">
          <h1 class="page-title">{{ t('dashboard.appointments') }}</h1>
        </div>
        <AppointmentsList />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
const { t } = useI18n();
</script>

<style scoped>
.appointments-page { max-width: 900px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
.page-title { font-family: var(--font-display); font-size: var(--text-2xl); }
</style>
