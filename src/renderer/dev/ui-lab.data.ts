export interface UiLabProduct {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly priceLabel: string;
  readonly imageUrl?: string;
}

export const UI_LAB_PRODUCTS: readonly UiLabProduct[] = [
  {
    id: "preview-coffee",
    name: "กาแฟเย็น",
    category: "เครื่องดื่ม",
    priceLabel: "฿65.00",
  },
  {
    id: "preview-rice",
    name: "ข้าวกะเพรา",
    category: "อาหารจานเดียว",
    priceLabel: "฿75.00",
  },
  {
    id: "preview-cake",
    name: "เค้กช็อกโกแลต",
    category: "ของหวาน",
    priceLabel: "฿95.00",
  },
];
