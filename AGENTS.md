# POS Terminal Coding Rules

## ภาษาและ Encoding

- บันทึก source code และเอกสารเป็น UTF-8 เท่านั้น
- เขียนคำอธิบาย, JSDoc และ code comment เป็นภาษาไทย โดยคงชื่อ class, function,
  type, library และ technical term เป็น English
- Function ที่ export หรือมี business rule ต้องมี JSDoc ภาษาไทยอธิบายหน้าที่, input,
  output, invariant และ error mode ที่สำคัญ
- ไม่เขียน comment ที่เล่าซ้ำสิ่งที่ code บอกอยู่แล้ว เพราะ comment แบบนั้นล้าสมัยง่าย

## การออกแบบ Code

- เปิด TypeScript strict mode และห้ามใช้ `any` เพื่อหลบ type error
- เขียน flow ให้เรียงอ่านจาก validation ไป business rule แล้วจึง side effect
- ใช้ early return เมื่อลด nesting และช่วยให้ failure path ชัดเจน
- ห้ามใช้ magic number, magic string, environment-specific URL หรือ secret ใน source code
- ค่าที่มีชื่อและความหมายทางธุรกิจให้ประกาศเป็น named constant หรือ validated config
- ค่าที่เป็นส่วนหนึ่งของมาตรฐานโดยตรงและใช้จุดเดียวเก็บใกล้จุดใช้งาน ไม่สร้าง config เผื่ออนาคต
- เงินใช้ integer หน่วยสตางค์ ห้ามคำนวณด้วย floating point

## Module และ Interface

- แบ่งตาม feature และ responsibility ไม่แบ่งเป็นโฟลเดอร์รวมตามชนิดไฟล์ทั้งระบบ
- ให้ Module ซ่อน Implementation ไว้หลัง Interface ขนาดเล็กและทดสอบผ่าน Interface เดียวกัน
- สร้าง seam เมื่อมี Adapter ที่แตกต่างกันจริง ห้ามสร้าง interface/factory เผื่อไว้ก่อน
- Renderer ห้ามเข้าถึง Node.js, SQLite หรือ printer โดยตรง ต้องผ่าน preload Interface
- Main process รับผิดชอบ filesystem, database, printer และ operating-system integration

## Frontend

- Vue component หนึ่งไฟล์รับผิดชอบงานหลักหนึ่งเรื่อง
- เมื่อ template หรือ script มีหลาย responsibility ให้แยก subcomponent หรือ composable
- ย้ายเป็น shared component เมื่อมีผู้ใช้จริงอย่างน้อยสองจุดและมี interaction เดียวกัน
- Primitive UI อยู่ใน `renderer/ui/components`; POS pattern อยู่ใน `renderer/ui/patterns`
- ห้ามใส่ business rule, money calculation หรือ database access ใน Vue component
- ทุก action ต้องรองรับ keyboard focus และ touch target ที่เหมาะกับหน้าร้าน

## Verification

- ก่อนส่งงานต้องรัน `npm run verify`
- Logic ที่มี branch, calculation หรือ state transition ต้องมี test อย่างน้อยหนึ่งกรณีที่จับ regression ได้
- ห้าม commit secret, `.env`, database file, build artifact หรือ installer
