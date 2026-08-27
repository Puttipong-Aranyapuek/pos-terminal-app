<script setup lang="ts">
defineProps<{
  label: string;
  tone: "success" | "warning" | "danger";
}>();
</script>

<template>
  <span class="ui-status" :class="`ui-status--${tone}`">
    <span class="ui-status__dot" aria-hidden="true" />
    {{ label }}
  </span>
</template>

<style scoped>
.ui-status {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 var(--space-3);
  gap: var(--space-2);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 650;
}

.ui-status__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.ui-status--success {
  background: var(--color-success-soft);
  color: var(--color-success);
}

.ui-status--warning {
  background: var(--color-warning-soft);
  color: var(--color-warning);
}

.ui-status--danger {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
</style>
