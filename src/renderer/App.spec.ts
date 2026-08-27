import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import App from "./App.vue";

describe("App", () => {
  it("แสดง UI Lab และ action ชำระเงิน", () => {
    const wrapper = mount(App);

    expect(wrapper.text()).toContain("POS Calm Design System");
    expect(wrapper.text()).toContain("ชำระเงิน");
  });
});
