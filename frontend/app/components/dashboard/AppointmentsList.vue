<template>
  <div>
    <div v-if="loading" class="loading">{{ t('common.loading') }}</div>

    <div v-else-if="appointments.length === 0" class="empty-state glass-card">
      <p>{{ t('dashboard.noAppointments') }}</p>
      <NuxtLink to="/#appointment" class="btn btn-primary" style="margin-top: var(--space-4)">
        {{ t('dashboard.newAppointment') }}
      </NuxtLink>
    </div>

    <div v-else class="table-wrapper glass-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>{{ t('common.date') }}</th>
            <th>{{ t('common.time') }}</th>
            <th>{{ t('appointment.service') }}</th>
            <th>{{ t('common.status') }}</th>
            <th>{{ t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appt in appointments" :key="appt.id">
            <td>{{ appt.date }}</td>
            <td>{{ appt.timeSlot }}</td>
            <td>{{ appt.service }}</td>
            <td>
              <span class="badge" :class="`badge-${appt.status.toLowerCase()}`">
                {{ appt.status }}
              </span>
            </td>
            <td>
              <button
                v-if="appt.status === 'PENDING' || appt.status === 'CONFIRMED'"
                @click="cancelAppointment(appt.id)"
                class="btn btn-sm btn-danger"
              >
                {{ t('dashboard.cancel') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { accessToken } = useAuth();
const toast = useToast();

const appointments = ref<any[]>([]);
const loading = ref(true);

const headers = computed(() => {
  const h: Record<string, string> = {};
  if (accessToken.value) h['Authorization'] = `Bearer ${accessToken.value}`;
  return h;
});

const fetchAppointments = async () => {
  try {
    appointments.value = await $fetch('/api/appointments', { headers: headers.value }) as any[];
  } catch {
    toast.error(t('common.error'));
  } finally {
    loading.value = false;
  }
};

const cancelAppointment = async (id: number) => {
  try {
    await $fetch(`/api/appointments/${id}/cancel`, {
      method: 'PATCH',
      headers: headers.value,
    });
    toast.success('Запис скасовано');
    await fetchAppointments();
  } catch {
    toast.error(t('common.error'));
  }
};

onMounted(fetchAppointments);
</script>

<style scoped>
.table-wrapper { padding: 0; overflow-x: auto; }
.empty-state { text-align: center; padding: var(--space-12); color: var(--color-text-muted); }
.loading { text-align: center; padding: var(--space-12); color: var(--color-text-muted); }
</style>
