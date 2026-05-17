<template>
  <div class="section-divider">
    <div class="divider-line"></div>
    <div class="divider-diamond">◆</div>
    <div class="divider-line"></div>
  </div>
</template>

<style scoped>
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: 0 var(--space-6);
  max-width: 600px;
  margin: 0 auto;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-border-accent), transparent);
}

.divider-diamond {
  color: var(--color-accent);
  font-size: var(--text-xs);
  opacity: 0.6;
}
</style>
