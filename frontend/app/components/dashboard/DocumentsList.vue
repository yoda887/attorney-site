<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">{{ t('dashboard.documents') }}</h1>
      <label class="btn btn-primary btn-sm upload-btn">
        {{ t('dashboard.uploadDocument') }}
        <input type="file" @change="uploadFile" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" hidden />
      </label>
    </div>

    <div v-if="loading" class="loading">{{ t('common.loading') }}</div>

    <div v-else-if="documents.length === 0" class="empty-state glass-card">
      <p>{{ t('dashboard.noDocuments') }}</p>
    </div>

    <div v-else class="docs-list">
      <div v-for="doc in documents" :key="doc.id" class="glass-card doc-item">
        <div class="doc-info">
          <span class="doc-icon">{{ getFileIcon(doc.mimeType) }}</span>
          <div>
            <p class="doc-name">{{ doc.filename }}</p>
            <p class="doc-meta">{{ formatSize(doc.fileSize) }} • {{ formatDate(doc.createdAt) }}</p>
            <p v-if="doc.description" class="doc-desc">{{ doc.description }}</p>
          </div>
        </div>
        <div class="doc-actions">
          <a
            :href="`/api/documents/${doc.id}/download`"
            class="btn btn-sm btn-outline"
            target="_blank"
          >{{ t('dashboard.download') }}</a>
          <button @click="deleteDoc(doc.id)" class="btn btn-sm btn-danger">
            {{ t('dashboard.delete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { accessToken } = useAuth();
const toast = useToast();

const documents = ref<any[]>([]);
const loading = ref(true);

const headers = computed(() => {
  const h: Record<string, string> = {};
  if (accessToken.value) h['Authorization'] = `Bearer ${accessToken.value}`;
  return h;
});

const fetchDocuments = async () => {
  try {
    documents.value = await $fetch('/api/documents', { headers: headers.value }) as any[];
  } catch {
    toast.error(t('common.error'));
  } finally {
    loading.value = false;
  }
};

const uploadFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    await $fetch('/api/documents/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken.value}` },
      body: formData,
    });
    toast.success('Документ завантажено');
    await fetchDocuments();
  } catch {
    toast.error(t('common.error'));
  }
};

const deleteDoc = async (id: number) => {
  try {
    await $fetch(`/api/documents/${id}`, {
      method: 'DELETE',
      headers: headers.value,
    });
    toast.success('Документ видалено');
    await fetchDocuments();
  } catch {
    toast.error(t('common.error'));
  }
};

const getFileIcon = (mime: string) => {
  if (mime.includes('pdf')) return '📕';
  if (mime.includes('word') || mime.includes('document')) return '📘';
  if (mime.includes('image')) return '🖼️';
  return '📄';
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const formatDate = (date: string) => new Date(date).toLocaleDateString('uk-UA');

onMounted(fetchDocuments);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
.page-title { font-family: var(--font-display); font-size: var(--text-2xl); }
.docs-list { display: flex; flex-direction: column; gap: var(--space-4); }
.doc-item { display: flex; justify-content: space-between; align-items: center; padding: var(--space-5); }
.doc-info { display: flex; align-items: center; gap: var(--space-4); }
.doc-icon { font-size: 1.5rem; }
.doc-name { font-weight: 500; font-size: var(--text-sm); }
.doc-meta { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-1); }
.doc-desc { font-size: var(--text-xs); color: var(--color-text-secondary); margin-top: var(--space-1); }
.doc-actions { display: flex; gap: var(--space-2); }
.empty-state { text-align: center; padding: var(--space-12); color: var(--color-text-muted); }
.loading { text-align: center; padding: var(--space-12); color: var(--color-text-muted); }

@media (max-width: 640px) {
  .doc-item { flex-direction: column; align-items: flex-start; gap: var(--space-3); }
}
</style>
