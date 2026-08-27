<script setup lang="ts">
import UiButton from "../ui/components/UiButton.vue";
import UiStatus from "../ui/components/UiStatus.vue";
import MoneyDisplay from "../ui/patterns/MoneyDisplay.vue";
import ProductTile from "../ui/patterns/ProductTile.vue";
import { UI_LAB_PRODUCTS } from "./ui-lab.data";

const ORDER_TOTAL_IN_SATANG = 23_500;
</script>

<template>
  <main class="ui-lab">
    <header class="ui-lab__header">
      <div>
        <span class="ui-lab__eyebrow">POS Calm Design System</span>
        <h1>หน้าขายหลัก</h1>
      </div>
      <div class="ui-lab__statuses" aria-label="สถานะระบบ">
        <UiStatus label="พร้อมขาย" tone="success" />
        <UiStatus label="Printer พร้อมใช้งาน" tone="success" />
        <UiStatus label="รอ Sync 3 รายการ" tone="warning" />
      </div>
    </header>

    <section class="sales-layout" aria-label="ตัวอย่างหน้าขาย">
      <aside class="category-panel">
        <strong>หมวดหมู่</strong>
        <button class="category-panel__item category-panel__item--active">
          ทั้งหมด
        </button>
        <button class="category-panel__item">อาหารจานเดียว</button>
        <button class="category-panel__item">เครื่องดื่ม</button>
        <button class="category-panel__item">ของหวาน</button>
      </aside>

      <section class="product-panel">
        <label class="search-field">
          <span>ค้นหาสินค้า</span>
          <input type="search" placeholder="ชื่อสินค้า หรือรหัสสินค้า" />
        </label>
        <div class="product-grid">
          <ProductTile
            v-for="product in UI_LAB_PRODUCTS"
            :key="product.id"
            :name="product.name"
            :category="product.category"
            :price-label="product.priceLabel"
          />
        </div>
      </section>

      <aside class="order-panel">
        <div>
          <span class="ui-lab__eyebrow">รายการปัจจุบัน</span>
          <h2>โต๊ะ A03</h2>
        </div>
        <div class="order-line">
          <span>ข้าวกะเพรา × 2</span>
          <strong>฿150.00</strong>
        </div>
        <div class="order-line">
          <span>กาแฟเย็น × 1</span>
          <strong>฿65.00</strong>
        </div>
        <div class="order-panel__summary">
          <MoneyDisplay
            label="ยอดสุทธิ"
            :amount-in-satang="ORDER_TOTAL_IN_SATANG"
          />
          <UiButton>ชำระเงิน</UiButton>
          <UiButton variant="secondary">พักรายการ</UiButton>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.ui-lab {
  min-height: 100vh;
  padding: var(--space-6);
}

.ui-lab__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  gap: var(--space-6);
}

.ui-lab__header h1,
.order-panel h2 {
  margin: var(--space-1) 0 0;
  line-height: 1.2;
}

.ui-lab__eyebrow {
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.ui-lab__statuses {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-2);
}

.sales-layout {
  display: grid;
  grid-template-columns: 176px minmax(0, 1fr) 360px;
  min-height: 680px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-surface);
}

.category-panel,
.product-panel,
.order-panel {
  padding: var(--space-6);
}

.category-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  border-right: 1px solid var(--color-border);
  background: var(--color-surface-subtle);
}

.category-panel__item {
  min-height: 48px;
  padding: 0 var(--space-3);
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
}

.category-panel__item--active {
  background: var(--color-primary);
  color: var(--color-surface);
  font-weight: 700;
}

.product-panel {
  background: var(--color-background);
}

.search-field {
  display: grid;
  margin-bottom: var(--space-4);
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 650;
}

.search-field input {
  min-height: 52px;
  padding: 0 var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(112px, 1fr));
  gap: var(--space-3);
}

.order-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  border-left: 1px solid var(--color-border);
}

.order-line {
  display: flex;
  justify-content: space-between;
  min-height: 64px;
  padding: var(--space-4) 0;
  gap: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  font-variant-numeric: tabular-nums;
}

.order-panel__summary {
  display: grid;
  margin-top: auto;
  gap: var(--space-3);
}

.order-panel__summary :deep(.ui-button--primary) {
  min-height: 56px;
}
</style>
