# POS Terminal App

Offline-first Windows desktop application สำหรับงานขายหน้าร้าน พัฒนาด้วย Electron,
Vue 3, Vite และ TypeScript

## Requirements

- Node.js 24.20.0 LTS
- npm 11+
- Windows 10 หรือใหม่กว่า

## Commands

```bash
npm install
npm run dev
npm run verify
npm run package
```

## Structure

```text
src/main/       Electron main process และ OS integration
src/preload/    Interface ที่ renderer ใช้เรียกความสามารถของ desktop
src/renderer/   Vue application และ POS Calm Design System
src/shared/     Type ที่ใช้ร่วมกันระหว่าง Electron processes
```

อ่านกฎการพัฒนาใน `AGENTS.md` ก่อนแก้ไข code
