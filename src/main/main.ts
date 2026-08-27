import path from "node:path";

import { app, BrowserWindow } from "electron";

const MAIN_WINDOW_WIDTH = 1440;
const MAIN_WINDOW_HEIGHT = 900;
const MINIMUM_WINDOW_WIDTH = 1024;
const MINIMUM_WINDOW_HEIGHT = 720;

/**
 * สร้างหน้าต่างหลักโดยปิด Node.js integration ใน renderer และเปิด context isolation
 * เพื่อให้ทุกความสามารถของระบบปฏิบัติการผ่าน preload Interface ที่ตรวจสอบได้เท่านั้น
 */
function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: MAIN_WINDOW_WIDTH,
    height: MAIN_WINDOW_HEIGHT,
    minWidth: MINIMUM_WINDOW_WIDTH,
    minHeight: MINIMUM_WINDOW_HEIGHT,
    backgroundColor: "#f6f8fa",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    void mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    void mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  return mainWindow;
}

void app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
