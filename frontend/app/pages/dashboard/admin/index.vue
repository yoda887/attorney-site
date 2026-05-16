<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="admin-page">
        <h1 class="page-title">{{ t('admin.title') }}</h1>

        <!-- Stats -->
        <div class="admin-stats">
          <div class="glass-card stat-item">
            <span class="stat-num">{{ stats.totalClients }}</span>
            <span class="stat-lbl">{{ t('admin.totalClients') }}</span>
          </div>
          <div class="glass-card stat-item">
            <span class="stat-num">{{ stats.totalAppointments }}</span>
            <span class="stat-lbl">{{ t('admin.totalAppointments') }}</span>
          </div>
          <div class="glass-card stat-item">
            <span class="stat-num" style="color: var(--color-warning)">{{ stats.pending }}</span>
            <span class="stat-lbl">{{ t('admin.pending') }}</span>
          </div>
          <div class="glass-card stat-item">
            <span class="stat-num" style="color: var(--color-success)">{{ stats.confirmed }}</span>
            <span class="stat-lbl">{{ t('admin.confirmed') }}</span>
          </div>
        </div>

        <!-- Appointments Filter -->
        <div class="admin-section">
          <h2>{{ t('admin.appointments') }}</h2>
          <div class="filter-bar">
            <select v-model="filter.status" class="form-input form-select" style="max-width:200px" @change="fetchAppointments">
              <option value="">Всі статуси</option>
              <option value="PENDING">Очікують</option>
              <option value="CONFIRMED">Підтверджені</option>
              <option value="CANCELLED">Скасовані</option>
              <option value="COMPLETED">Завершені</option>
            </select>
            <input type="date" v-model="filter.date" class="form-input" style="max-width:200px" @change="fetchAppointments" />
          </div>

          <div class="table-wrapper glass-card">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Клієнт</th>
                  <th>{{ t('common.date') }}</th>
                  <th>{{ t('common.time') }}</th>
                  <th>Послуга</th>
                  <th>{{ t('common.status') }}</th>
                  <th>{{ t('common.actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in appointments" :key="a.id">
                  <td>{{ a.user?.fullName || a.guestName || '—' }}<br><small style="color:var(--color-text-muted)">{{ a.user?.phone || a.guestPhone || '' }}</small></td>
                  <td>{{ a.date }}</td>
                  <td>{{ a.timeSlot }}</td>
                  <td>{{ a.service }}</td>
                  <td><span class="badge" :class="`badge-${a.status.toLowerCase()}`">{{ a.status }}</span></td>
                  <td>
                    <div class="action-btns">
                      <button v-if="a.status==='PENDING'" @click="updateStatus(a.id,'CONFIRMED')" class="btn btn-sm btn-success">{{ t('admin.confirm') }}</button>
                      <button v-if="a.status==='CONFIRMED'" @click="updateStatus(a.id,'COMPLETED')" class="btn btn-sm btn-outline">{{ t('admin.complete') }}</button>
                      <button v-if="a.status!=='CANCELLED'&&a.status!=='COMPLETED'" @click="updateStatus(a.id,'CANCELLED')" class="btn btn-sm btn-danger">{{ t('dashboard.cancel') }}</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Blocked Dates -->
        <div class="admin-section">
          <h2>{{ t('admin.blockedDates') }}</h2>
          <div class="filter-bar">
            <input type="date" v-model="newBlockedDate" class="form-input" style="max-width:200px" />
            <input v-model="newBlockedReason" class="form-input" placeholder="Причина" style="max-width:300px" />
            <button @click="addBlockedDate" class="btn btn-primary btn-sm">Додати</button>
          </div>
          <div class="blocked-list">
            <div v-for="bd in blockedDates" :key="bd.id" class="glass-card blocked-item">
              <span>{{ bd.date }} {{ bd.reason ? `— ${bd.reason}` : '' }}</span>
              <button @click="removeBlockedDate(bd.id)" class="btn btn-sm btn-danger">✕</button>
            </div>
          </div>
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

// Guard: admin only
watch(isAdmin, (val) => { if (!val) navigateTo('/dashboard'); }, { immediate: true });

const headers = computed(() => ({
  'Authorization': `Bearer ${accessToken.value}`,
  'Content-Type': 'application/json',
}));

const stats = ref({ totalClients: 0, totalAppointments: 0, pending: 0, confirmed: 0 });
const appointments = ref<any[]>([]);
const blockedDates = ref<any[]>([]);
const filter = reactive({ status: '', date: '' });
const newBlockedDate = ref('');
const newBlockedReason = ref('');

const fetchStats = async () => {
  try {
    stats.value = await $fetch('/api/admin/stats', { headers: headers.value }) as any;
  } catch {}
};

const fetchAppointments = async () => {
  try {
    const params: any = {};
    if (filter.status) params.status = filter.status;
    if (filter.date) params.date = filter.date;
    const query = new URLSearchParams(params).toString();
    const data: any = await $fetch(`/api/admin/appointments?${query}`, { headers: headers.value });
    appointments.value = data.appointments;
  } catch {}
};

const updateStatus = async (id: number, status: string) => {
  try {
    await $fetch(`/api/admin/appointments/${id}`, {
      method: 'PATCH', headers: headers.value, body: { status },
    });
    toast.success('Статус оновлено');
    await Promise.all([fetchAppointments(), fetchStats()]);
  } catch { toast.error(t('common.error')); }
};

const fetchBlockedDates = async () => {
  try {
    blockedDates.value = await $fetch('/api/admin/blocked-dates', { headers: headers.value }) as any[];
  } catch {}
};

const addBlockedDate = async () => {
  if (!newBlockedDate.value) return;
  try {
    await $fetch('/api/admin/blocked-dates', {
      method: 'POST', headers: headers.value,
      body: { date: newBlockedDate.value, reason: newBlockedReason.value || null },
    });
    toast.success('Дату заблоковано');
    newBlockedDate.value = '';
    newBlockedReason.value = '';
    await fetchBlockedDates();
  } catch { toast.error(t('common.error')); }
};

const removeBlockedDate = async (id: number) => {
  try {
    await $fetch(`/api/admin/blocked-dates/${id}`, {
      method: 'DELETE', headers: headers.value,
    });
    await fetchBlockedDates();
  } catch { toast.error(t('common.error')); }
};

onMounted(async () => {
  await Promise.all([fetchStats(), fetchAppointments(), fetchBlockedDates()]);
});
</script>

<style scoped>
.admin-page { max-width: 1000px; }
.page-title { font-family: var(--font-display); font-size: var(--text-3xl); margin-bottom: var(--space-8); }
.admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-bottom: var(--space-10); }
.stat-item { text-align: center; padding: var(--space-6); }
.stat-num { display: block; font-size: var(--text-3xl); font-weight: 700; color: var(--color-accent); }
.stat-lbl { font-size: var(--text-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.admin-section { margin-bottom: var(--space-10); }
.admin-section h2 { font-size: var(--text-xl); font-weight: 600; margin-bottom: var(--space-4); }
.filter-bar { display: flex; gap: var(--space-3); margin-bottom: var(--space-4); flex-wrap: wrap; }
.table-wrapper { padding: 0; overflow-x: auto; }
.action-btns { display: flex; gap: var(--space-2); }
.blocked-list { display: flex; flex-direction: column; gap: var(--space-2); }
.blocked-item { display: flex; justify-content: space-between; align-items: center; padding: var(--space-3) var(--space-4); }

@media (max-width: 768px) {
  .admin-stats { grid-template-columns: repeat(2, 1fr); }
}
</style>
