<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "danger";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    type: "button",
    disabled: false,
  }
);
</script>

<template>
  <button
    class="ui-button"
    :class="`ui-button--${variant}`"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  min-height: 48px;
  padding: 0 var(--space-4);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 650;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast);
}

.ui-button:active:not(:disabled) {
  transform: translateY(1px);
}

.ui-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.ui-button--primary {
  background: var(--color-primary);
  color: var(--color-surface);
}

.ui-button--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.ui-button--secondary {
  border-color: var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
}

.ui-button--secondary:hover:not(:disabled) {
  background: var(--color-surface-subtle);
}

.ui-button--danger {
  background: var(--color-danger);
  color: var(--color-surface);
}
</style>
