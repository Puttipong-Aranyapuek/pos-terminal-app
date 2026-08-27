<script setup lang="ts">
import { computed } from "vue";

import { formatThaiBaht } from "../formatters/money";

const props = defineProps<{
  amountInSatang: number;
  label?: string;
}>();

const formattedAmount = computed(() => formatThaiBaht(props.amountInSatang));
</script>

<template>
  <div class="money-display">
    <span v-if="label" class="money-display__label">{{ label }}</span>
    <strong class="money-display__amount">{{ formattedAmount }}</strong>
  </div>
</template>

<style scoped>
.money-display {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
}

.money-display__label {
  color: var(--color-text-muted);
}

.money-display__amount {
  font-size: 32px;
  line-height: 40px;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
</style>
