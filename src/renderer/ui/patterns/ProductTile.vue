<script setup lang="ts">
defineProps<{
  name: string;
  priceLabel: string;
  category: string;
}>();
</script>

<template>
  <button class="product-tile" type="button">
    <span class="product-tile__category">{{ category }}</span>
    <strong class="product-tile__name">{{ name }}</strong>
    <span class="product-tile__price">{{ priceLabel }}</span>
  </button>
</template>

<style scoped>
.product-tile {
  display: grid;
  min-height: 112px;
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  box-shadow: 0 2px 8px rgb(23 32 42 / 4%);
  transition:
    border-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.product-tile:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-surface);
  transform: translateY(-1px);
}

.product-tile__category {
  color: var(--color-text-muted);
  font-size: 13px;
}

.product-tile__name {
  align-self: center;
  font-size: 17px;
}

.product-tile__price {
  align-self: end;
  color: var(--color-primary-hover);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
</style>
