import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App.vue";

const createObjectURL = vi.fn(() => "blob:menu-preview");
const revokeObjectURL = vi.fn();

Object.defineProperty(URL, "createObjectURL", {
  configurable: true,
  value: createObjectURL,
});
Object.defineProperty(URL, "revokeObjectURL", {
  configurable: true,
  value: revokeObjectURL,
});

describe("App", () => {
  beforeEach(() => {
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
  });

  it("แสดง UI Lab และ action ชำระเงิน", () => {
    const wrapper = mount(App);

    expect(wrapper.text()).toContain("POS Calm · UI Preview");
    expect(wrapper.text()).toContain("ทดลองรูปเมนู");
    expect(wrapper.text()).toContain("ชำระเงิน");
  });

  it("ตรวจไฟล์และแสดงรูปเมนูที่เลือกใน Preview", async () => {
    const wrapper = mount(App);
    const input = wrapper.get("input[type='file']");

    Object.defineProperty(input.element, "files", {
      configurable: true,
      value: [new File(["text"], "menu.txt", { type: "text/plain" })],
    });
    await input.trigger("change");
    expect(wrapper.text()).toContain("เลือกไฟล์ JPG, PNG หรือ WebP เท่านั้น");

    Object.defineProperty(input.element, "files", {
      configurable: true,
      value: [new File(["image"], "menu.png", { type: "image/png" })],
    });
    await input.trigger("change");

    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(wrapper.get(".product-tile img").attributes("src")).toBe(
      "blob:menu-preview"
    );

    wrapper.unmount();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:menu-preview");
  });
});
