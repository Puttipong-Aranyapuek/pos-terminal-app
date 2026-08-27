import { describe, expect, it } from "vitest";

import { formatThaiBaht } from "./money";

describe("formatThaiBaht", () => {
  it("แสดงจำนวนเงินหน่วยสตางค์เป็นเงินบาทสองตำแหน่ง", () => {
    expect(formatThaiBaht(12_345)).toContain("123.45");
  });

  it("ปฏิเสธจำนวนเงินที่ไม่ใช่ safe integer", () => {
    expect(() => formatThaiBaht(10.5)).toThrow(TypeError);
  });
});
