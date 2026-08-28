<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

import UiButton from "../ui/components/UiButton.vue";
import UiStatus from "../ui/components/UiStatus.vue";
import MoneyDisplay from "../ui/patterns/MoneyDisplay.vue";
import ProductTile from "../ui/patterns/ProductTile.vue";
import { UI_LAB_PRODUCTS, type UiLabProduct } from "./ui-lab.data";

const ORDER_TOTAL_IN_SATANG = 23_500;
const MAX_MENU_IMAGE_SIZE = 5 * 1024 * 1024;
const MENU_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const products = ref<UiLabProduct[]>(
  UI_LAB_PRODUCTS.map((product) => ({ ...product }))
);
const selectedProductId = ref(products.value[0]?.id ?? "");
const uploadMessage = ref("");
const previewImageUrls = new Map<string, string>();

const selectedProduct = computed(() =>
  products.value.find((product) => product.id === selectedProductId.value)
);

function chooseMenuImage(event: globalThis.Event): void {
  const input = event.currentTarget as globalThis.HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  if (!MENU_IMAGE_TYPES.has(file.type)) {
    uploadMessage.value = "เลือกไฟล์ JPG, PNG หรือ WebP เท่านั้น";
    input.value = "";
    return;
  }

  if (file.size > MAX_MENU_IMAGE_SIZE) {
    uploadMessage.value = "รูปต้องมีขนาดไม่เกิน 5 MB";
    input.value = "";
    return;
  }

  const previousUrl = previewImageUrls.get(selectedProductId.value);
  if (previousUrl) globalThis.URL.revokeObjectURL(previousUrl);

  const imageUrl = globalThis.URL.createObjectURL(file);
  previewImageUrls.set(selectedProductId.value, imageUrl);
  products.value = products.value.map((product) =>
    product.id === selectedProductId.value ? { ...product, imageUrl } : product
  );
  uploadMessage.value = `เพิ่มรูปให้ ${selectedProduct.value?.name ?? "เมนู"} แล้ว · Preview เท่านั้น`;
  input.value = "";
}

function removeMenuImage(): void {
  const previousUrl = previewImageUrls.get(selectedProductId.value);
  if (previousUrl) globalThis.URL.revokeObjectURL(previousUrl);

  previewImageUrls.delete(selectedProductId.value);
  products.value = products.value.map((product) =>
    product.id === selectedProductId.value
      ? { ...product, imageUrl: undefined }
      : product
  );
  uploadMessage.value = `นำรูปของ ${selectedProduct.value?.name ?? "เมนู"} ออกจาก Preview แล้ว`;
}

onBeforeUnmount(() => {
  previewImageUrls.forEach((imageUrl) =>
    globalThis.URL.revokeObjectURL(imageUrl)
  );
});
</script>

<template>
  <main class="ui-lab">
    <header class="ui-lab__header">
      <div>
        <span class="ui-lab__eyebrow">POS Calm · UI Preview</span>
        <h1>ขายหน้าร้าน</h1>
        <p>เลือกเมนู ตรวจรายการ แล้วรับชำระเงินจากหน้าจอเดียว</p>
      </div>
      <div class="ui-lab__statuses" aria-label="สถานะระบบ">
        <UiStatus label="พร้อมขาย" tone="success" />
        <UiStatus label="เครื่องพิมพ์พร้อมใช้งาน" tone="success" />
        <UiStatus label="รอ Sync 3 รายการ" tone="warning" />
      </div>
    </header>

    <section class="preview-tools" aria-labelledby="preview-tools-title">
      <div>
        <span class="ui-lab__eyebrow">UI Lab controls</span>
        <strong id="preview-tools-title">ทดลองรูปเมนู</strong>
        <small>JPG, PNG หรือ WebP ไม่เกิน 5 MB · รูปยังไม่ถูกบันทึก</small>
      </div>
      <div class="preview-tools__controls">
        <label>
          <span>เลือกเมนู</span>
          <select v-model="selectedProductId" @change="uploadMessage = ''">
            <option
              v-for="product in products"
              :key="product.id"
              :value="product.id"
            >
              {{ product.name }}
            </option>
          </select>
        </label>
        <label class="preview-tools__upload">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            @change="chooseMenuImage"
          />
          เลือกรูป
        </label>
        <button
          v-if="selectedProduct?.imageUrl"
          type="button"
          @click="removeMenuImage"
        >
          นำรูปออก
        </button>
      </div>
      <p v-if="uploadMessage" role="status">{{ uploadMessage }}</p>
    </section>

    <section class="sales-layout" aria-label="ตัวอย่างหน้าขาย">
      <aside class="category-panel">
        <strong>หมวดหมู่</strong>
        <button
          class="category-panel__item category-panel__item--active"
          type="button"
        >
          ทั้งหมด
        </button>
        <button class="category-panel__item" type="button">
          อาหารจานเดียว
        </button>
        <button class="category-panel__item" type="button">เครื่องดื่ม</button>
        <button class="category-panel__item" type="button">ของหวาน</button>
      </aside>

      <section class="product-panel">
        <label class="search-field">
          <span>ค้นหาเมนู</span>
          <input type="search" placeholder="ชื่อเมนู หรือรหัสสินค้า" />
        </label>
        <div class="product-grid">
          <ProductTile
            v-for="product in products"
            :key="product.id"
            :name="product.name"
            :category="product.category"
            :price-label="product.priceLabel"
            :image-url="product.imageUrl"
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

.ui-lab__header p {
  margin: var(--space-1) 0 0;
  color: var(--color-text-muted);
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

.preview-tools {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) auto;
  align-items: center;
  margin-bottom: var(--space-4);
  padding: var(--space-4);
  gap: var(--space-4);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.preview-tools > div:first-child {
  display: grid;
  gap: 2px;
}

.preview-tools small,
.preview-tools p,
.preview-tools__controls label > span {
  color: var(--color-text-muted);
  font-size: 12px;
}

.preview-tools__controls {
  display: flex;
  align-items: end;
  gap: var(--space-2);
}

.preview-tools__controls label:not(.preview-tools__upload) {
  display: grid;
  gap: var(--space-1);
}

.preview-tools select,
.preview-tools button,
.preview-tools__upload {
  min-height: 42px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
}

.preview-tools select {
  min-width: 180px;
  padding: 0 var(--space-3);
}

.preview-tools button,
.preview-tools__upload {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-3);
  cursor: pointer;
  font-weight: 700;
}

.preview-tools__upload {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: var(--color-surface);
}

.preview-tools__upload input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

.preview-tools__upload:focus-within {
  outline: 3px solid color-mix(in srgb, var(--color-focus) 35%, transparent);
  outline-offset: 2px;
}

.preview-tools p {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--color-primary-hover);
  font-weight: 650;
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

@media (max-width: 1100px) {
  .preview-tools {
    grid-template-columns: 1fr;
  }

  .preview-tools__controls {
    flex-wrap: wrap;
  }

  .sales-layout {
    grid-template-columns: 152px minmax(0, 1fr) 320px;
  }

  .product-grid {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }
}
</style>
