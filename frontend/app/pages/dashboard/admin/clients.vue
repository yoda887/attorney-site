<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="clients-page">
        <h1 class="page-title">{{ t('admin.clients') }}</h1>

        <div v-if="clients.length === 0" class="empty-state glass-card">
          <p>Немає зареєстрованих клієнтів</p>
        </div>

        <div v-else class="table-wrapper glass-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ім'я</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Записів</th>
                <th>Документів</th>
                <th>Дата реєстрації</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in clients" :key="c.id">
                <td>{{ c.fullName }}</td>
                <td>{{ c.email }}</td>
                <td>{{ c.phone || '—' }}</td>
                <td>{{ c._count.appointments }}</td>
                <td>{{ c._count.documents }}</td>
                <td>{{ new Date(c.createdAt).toLocaleDateString('uk-UA') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { t } = useI18n();
const { accessToken, isAdmin } = useAuth();

watch(isAdmin, (val) => { if (!val) navigateTo('/dashboard'); }, { immediate: true });

const clients = ref<any[]>([]);

onMounted(async () => {
  try {
    clients.value = await $fetch('/api/admin/clients', {
      headers: { 'Authorization': `Bearer ${accessToken.value}` },
    }) as any[];
  } catch {}
});
</script>

<style scoped>
.clients-page { max-width: 1000px; }
.page-title { font-family: var(--font-display); font-size: var(--text-2xl); margin-bottom: var(--space-6); }
.table-wrapper { padding: 0; overflow-x: auto; }
.empty-state { text-align: center; padding: var(--space-12); color: var(--color-text-muted); }
</style>
