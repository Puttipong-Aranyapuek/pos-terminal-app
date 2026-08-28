# POS Terminal App

Desktop POS สำหรับพนักงานหน้าร้าน ใช้เปิดโต๊ะ รับรายการ ชำระเงิน พิมพ์ใบเสร็จ และขายต่อได้เมื่อ internet หรือ Cloud ใช้งานไม่ได้ พัฒนาด้วย Electron, Vue 3, Vite และ TypeScript

## สถานะปัจจุบัน

**Foundation / UI Lab**

มี Electron shell ที่แยก `main`, `preload` และ `renderer`, POS Calm Design System, UI component ตัวอย่าง, money formatter และ Product Tile ที่รองรับรูปเมนูพร้อม fallback แล้ว ใน UI Lab สามารถเลือก JPG, PNG หรือ WebP เพื่อดู Preview บนการ์ดเมนูได้ แต่รูปอยู่เฉพาะใน memory และหายเมื่อปิดหรือ reload application ยังไม่มี SQLite schema, Order/Checkout flow, Catalog API, image storage, printer adapter หรือ Cloud sync ห้ามใช้กับร้านจริง

## Repository นี้รับผิดชอบ

- Touch UI และ interaction สำหรับพนักงานหน้าร้าน
- Electron main process และ OS/hardware integration
- Local SQLite migration และข้อมูลที่ต้องใช้ตอน offline
- Open Order, atomic checkout, Receipt และ durable Print Job
- Sync Outbox และ client ที่ติดต่อ `pos-api-service`
- Windows package/installer และ staged desktop release

## Repository นี้ไม่รับผิดชอบ

- Cloud PostgreSQL migration หรือ direct Cloud database access
- Server-side authentication, tenant isolation และ authorization decision
- Billing webhook, consolidated report หรือ Operations Web UI
- Business contract ชุดแยกของตัวเอง; ต้องใช้ version ที่ `pos-api-service` publish

## Runtime boundary

```text
Vue Renderer
  └─ typed preload Interface
       └─ Electron Main
            ├─ SQLite (planned)
            ├─ ESC/POS printer adapter (planned)
            ├─ filesystem / OS keystore (planned)
            └─ sync client → pos-api-service (planned)
```

Renderer ห้ามเข้าถึง Node.js, SQLite หรือ printer โดยตรง ปัจจุบัน preload เปิดให้ renderer อ่านเพียง `platform` ผ่าน `window.posDesktop`

## Data ownership

เมื่อเริ่ม Database Playground repo นี้จะเป็นเจ้าของ `pos_lab_terminal.sqlite3`, Local Order, Payment, Receipt, Print Job และ Sync Outbox โดยใช้เงินหน่วยสตางค์และ commit Checkout ทั้งชุดใน transaction เดียว

ตอนนี้ยังไม่มี database driver หรือ migration ใน repository

รูปเมนูจริงควรรับ URL/metadata จาก Catalog API และ cache file สำหรับ offline ผ่าน Electron main process; ตัวเลือกไฟล์ใน UI Lab มีไว้ทดสอบ UX เท่านั้น ไม่ใช่ flow จัดการสินค้า

## Requirements

- Node.js 24.20.0 LTS
- npm 11+
- Windows 10 หรือใหม่กว่า

## เริ่มใช้งาน

```powershell
npm install
npm run dev
```

`npm run dev` เปิด Electron development runtime พร้อม Vite hot reload

## Commands

| Command                    | หน้าที่                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `npm run dev`              | เปิด Electron development runtime                          |
| `npm run lint`             | ตรวจ ESLint                                                |
| `npm run typecheck`        | ตรวจ TypeScript/Vue type                                   |
| `npm test`                 | รัน Vitest ครั้งเดียว                                      |
| `npm run verify`           | รัน lint, typecheck และ test                               |
| `npm run package`          | Verify แล้วสร้าง unpacked Windows application              |
| `npm run make`             | Verify แล้วสร้าง distributable ผ่าน Electron Forge         |
| `npm run audit:production` | ตรวจ production dependency vulnerability ระดับ high ขึ้นไป |

## Structure

```text
src/main/                 Electron main process และ OS integration
src/preload/              Typed bridge สำหรับ renderer
src/renderer/dev/         UI Lab และ fixture สำหรับพัฒนา visual baseline
src/renderer/ui/          POS Calm tokens, primitive และ pattern
src/shared/               Type ที่ใช้ร่วมกันระหว่าง Electron processes
forge.config.ts           Packaging และ Electron security fuse
.github/workflows/ci.yml  Windows CI และ packaged artifact
```

## Verification และ CI

ก่อนส่งงานให้รัน:

```powershell
npm run verify
```

CI รันบน Windows, ตรวจ production dependency และสร้าง packaged application เก็บเป็น artifact 7 วัน

## ข้อควรระวัง

- ห้าม commit `.env`, SQLite file, WAL file, installer, build output หรือ secret
- เงินใช้ integer หน่วยสตางค์ ห้ามใช้ floating point
- Action ต้องรองรับ keyboard focus และ touch target ที่เหมาะกับหน้าร้าน
- อ่านกฎทั้งหมดใน `AGENTS.md` ก่อนแก้ไข code
