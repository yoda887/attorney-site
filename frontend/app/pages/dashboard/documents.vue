<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="documents-page">
        <DocumentsList />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
</script>

<style scoped>
.documents-page { max-width: 800px; }
</style>
