<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="schedule-page">
        <h1 class="page-title">{{ t('admin.schedule') }}</h1>

        <div class="glass-card schedule-grid">
          <div v-for="day in schedule" :key="day.id" class="schedule-row">
            <div class="day-name">{{ dayNames[day.dayOfWeek] }}</div>
            <label class="toggle-label">
              <input type="checkbox" v-model="day.isActive" />
              <span>{{ day.isActive ? 'Робочий' : 'Вихідний' }}</span>
            </label>
            <template v-if="day.isActive">
              <input type="time" v-model="day.startTime" class="form-input time-input" />
              <span class="time-sep">—</span>
              <input type="time" v-model="day.endTime" class="form-input time-input" />
              <select v-model.number="day.slotDuration" class="form-input form-select slot-select">
                <option :value="30">30 хв</option>
                <option :value="60">60 хв</option>
                <option :value="90">90 хв</option>
                <option :value="120">2 год</option>
              </select>
            </template>
          </div>

          <button @click="saveSchedule" class="btn btn-primary" style="margin-top: var(--space-6)">
            {{ t('common.save') }}
          </button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { t } = useI18n();
const { accessToken, isAdmin } = useAuth();
const toast = useToast();

watch(isAdmin, (val) => { if (!val) navigateTo('/dashboard'); }, { immediate: true });

const dayNames = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];
const schedule = ref<any[]>([]);

const headers = computed(() => ({
  'Authorization': `Bearer ${accessToken.value}`,
  'Content-Type': 'application/json',
}));

onMounted(async () => {
  try {
    schedule.value = await $fetch('/api/admin/schedule', { headers: headers.value }) as any[];
  } catch {}
});

const saveSchedule = async () => {
  try {
    await $fetch('/api/admin/schedule', {
      method: 'PUT',
      headers: headers.value,
      body: { schedules: schedule.value },
    });
    toast.success('Розклад збережено');
  } catch {
    toast.error(t('common.error'));
  }
};
</script>

<style scoped>
.schedule-page { max-width: 800px; }
.page-title { font-family: var(--font-display); font-size: var(--text-2xl); margin-bottom: var(--space-6); }
.schedule-grid { padding: var(--space-6); }
.schedule-row {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-border);
}
.day-name { width: 120px; font-weight: 600; font-size: var(--text-sm); }
.toggle-label { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-text-secondary); min-width: 100px; cursor: pointer; }
.toggle-label input { accent-color: var(--color-accent); }
.time-input { max-width: 120px; }
.time-sep { color: var(--color-text-muted); }
.slot-select { max-width: 100px; }

@media (max-width: 768px) {
  .schedule-row { flex-wrap: wrap; }
  .day-name { width: 100%; }
}
</style>
