const SATANG_PER_BAHT = 100;
const THAI_BAHT_FORMATTER = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * แปลงจำนวนเงินหน่วยสตางค์เป็นข้อความเงินบาทสำหรับแสดงผลเท่านั้น
 * โดยปฏิเสธค่าที่ไม่ใช่ safe integer เพื่อไม่ซ่อนความผิดพลาดของข้อมูลการเงิน
 */
export function formatThaiBaht(amountInSatang: number): string {
  if (!Number.isSafeInteger(amountInSatang)) {
    throw new TypeError("จำนวนเงินต้องเป็น safe integer หน่วยสตางค์");
  }

  return THAI_BAHT_FORMATTER.format(amountInSatang / SATANG_PER_BAHT);
}
