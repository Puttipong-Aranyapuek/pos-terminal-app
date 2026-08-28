<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  name: string;
  priceLabel: string;
  category: string;
  imageUrl?: string;
}>();

const imageFailed = ref(false);
const showImage = computed(() => Boolean(props.imageUrl) && !imageFailed.value);

watch(
  () => props.imageUrl,
  () => {
    imageFailed.value = false;
  }
);
</script>

<template>
  <button class="product-tile" type="button">
    <span class="product-tile__image">
      <img
        v-if="showImage"
        :src="imageUrl"
        alt=""
        @error="imageFailed = true"
      />
      <span v-else class="product-tile__placeholder">
        <span class="product-tile__placeholder-icon" aria-hidden="true"></span>
        ยังไม่มีรูปเมนู
      </span>
    </span>
    <span class="product-tile__content">
      <span class="product-tile__category">{{ category }}</span>
      <strong class="product-tile__name">{{ name }}</strong>
      <span class="product-tile__price">{{ priceLabel }}</span>
    </span>
  </button>
</template>

<style scoped>
.product-tile {
  display: grid;
  grid-template-rows: 132px 1fr;
  min-height: 244px;
  padding: 0;
  overflow: hidden;
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

.product-tile__image {
  display: grid;
  min-width: 0;
  overflow: hidden;
  place-items: center;
  background: var(--color-surface-subtle);
}

.product-tile__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 220ms ease;
}

.product-tile:hover .product-tile__image img {
  transform: scale(1.025);
}

.product-tile__placeholder {
  display: grid;
  justify-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: 12px;
}

.product-tile__placeholder-icon {
  position: relative;
  width: 30px;
  height: 24px;
  border: 2px solid var(--color-border);
  border-radius: 6px;
}

.product-tile__placeholder-icon::before {
  position: absolute;
  top: 5px;
  left: 6px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-border);
  content: "";
}

.product-tile__placeholder-icon::after {
  position: absolute;
  right: 4px;
  bottom: 4px;
  left: 4px;
  height: 8px;
  background: var(--color-border);
  clip-path: polygon(0 100%, 34% 20%, 54% 66%, 70% 38%, 100% 100%);
  content: "";
}

.product-tile__content {
  display: grid;
  min-width: 0;
  padding: var(--space-3) var(--space-4) var(--space-4);
  gap: var(--space-1);
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
  overflow: hidden;
  font-size: 17px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-tile__price {
  align-self: end;
  color: var(--color-primary-hover);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
</style>
