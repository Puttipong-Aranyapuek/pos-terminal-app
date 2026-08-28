import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import ProductTile from "./ProductTile.vue";

const product = {
  name: "กาแฟเย็น",
  category: "เครื่องดื่ม",
  priceLabel: "฿65.00",
};

describe("ProductTile", () => {
  it("แสดง placeholder เมื่อเมนูไม่มีรูป", () => {
    const wrapper = mount(ProductTile, { props: product });

    expect(wrapper.text()).toContain("ยังไม่มีรูปเมนู");
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("กลับไปใช้ placeholder เมื่อรูปโหลดไม่ได้", async () => {
    const wrapper = mount(ProductTile, {
      props: { ...product, imageUrl: "https://example.com/menu.png" },
    });

    await wrapper.get("img").trigger("error");

    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.text()).toContain("ยังไม่มีรูปเมนู");
  });
});
